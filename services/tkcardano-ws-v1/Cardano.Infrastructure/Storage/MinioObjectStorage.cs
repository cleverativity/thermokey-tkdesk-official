using Amazon.S3;
using Amazon.S3.Model;
using Cardano.Domain.Interfaces;
using Cardano.Infrastructure.Configuration;
using Microsoft.Extensions.Logging;
using System.Net.Http;
using System.Text;

namespace Cardano.Infrastructure.Storage
{
    /// <summary>
    /// MinIO via AWS S3 SDK (ForcePathStyle + region).
    /// Downloads use a short-lived pre-signed URL + HttpClient because GetObjectAsync
    /// often hangs against this custom MinIO gateway.
    /// </summary>
    public class MinioObjectStorage : IObjectStorage, IDisposable
    {
        private readonly MinioSettings _settings;
        private readonly ILogger<MinioObjectStorage> _logger;
        private readonly Lazy<IAmazonS3?> _s3;
        private readonly HttpClient _http;
        private readonly object _disposeLock = new();
        private bool _disposed;

        public MinioObjectStorage(MinioSettings settings, ILogger<MinioObjectStorage> logger)
        {
            _settings = settings;
            _logger = logger;
            _s3 = new Lazy<IAmazonS3?>(CreateClient);
            _http = new HttpClient
            {
                Timeout = settings.RequestTimeout
            };
        }

        private IAmazonS3? CreateClient()
        {
            if (!_settings.IsConfigured)
            {
                _logger.LogWarning("MinIO is not configured; report images will be skipped.");
                return null;
            }

            var serviceUrl = _settings.Endpoint.TrimEnd('/');
            if (!serviceUrl.StartsWith("http://", StringComparison.OrdinalIgnoreCase)
                && !serviceUrl.StartsWith("https://", StringComparison.OrdinalIgnoreCase))
            {
                serviceUrl = (_settings.UseSSL ? "https://" : "http://") + serviceUrl;
            }

            var config = new AmazonS3Config
            {
                ServiceURL = serviceUrl,
                ForcePathStyle = true,
                AuthenticationRegion = _settings.Region,
                UseHttp = serviceUrl.StartsWith("http://", StringComparison.OrdinalIgnoreCase),
                Timeout = _settings.RequestTimeout,
                MaxErrorRetry = 1
            };

            return new AmazonS3Client(_settings.AccessKey, _settings.SecretKey, config);
        }

        public async Task<byte[]?> GetObjectBytesAsync(string objectKey, CancellationToken cancellationToken = default)
        {
            var s3 = _s3.Value;
            if (s3 is null)
                return null;

            try
            {
                using var timeoutCts = CancellationTokenSource.CreateLinkedTokenSource(cancellationToken);
                timeoutCts.CancelAfter(_settings.RequestTimeout);

                // Pre-signed GET avoids hanging GetObjectAsync streams on this gateway.
                var url = s3.GetPreSignedURL(new GetPreSignedUrlRequest
                {
                    BucketName = _settings.BucketName,
                    Key = objectKey,
                    Verb = HttpVerb.GET,
                    Expires = DateTime.UtcNow.AddMinutes(5)
                });

                using var response = await _http.GetAsync(url, HttpCompletionOption.ResponseHeadersRead, timeoutCts.Token)
                    .ConfigureAwait(false);

                if (response.StatusCode == System.Net.HttpStatusCode.NotFound)
                    return null;

                if (!response.IsSuccessStatusCode)
                {
                    _logger.LogDebug(
                        "MinIO HTTP GET failed for {ObjectKey}: {StatusCode}",
                        objectKey, (int)response.StatusCode);
                    return null;
                }

                var bytes = await response.Content.ReadAsByteArrayAsync(timeoutCts.Token).ConfigureAwait(false);
                if (bytes.Length == 0)
                    return null;

                if (LooksLikeXml(bytes))
                {
                    var preview = Encoding.UTF8.GetString(bytes, 0, Math.Min(bytes.Length, 300));
                    _logger.LogWarning("MinIO returned XML for {ObjectKey}: {Preview}", objectKey, preview);
                    return null;
                }

                return bytes;
            }
            catch (OperationCanceledException)
            {
                _logger.LogWarning("MinIO GetObject timed out for {ObjectKey}", objectKey);
                return null;
            }
            catch (Exception ex)
            {
                _logger.LogDebug(ex, "MinIO GetObject failed for {ObjectKey}", objectKey);
                return null;
            }
        }

        public async Task<IReadOnlyList<string>> ListObjectKeysAsync(string prefix, CancellationToken cancellationToken = default)
        {
            var keys = new List<string>();
            var s3 = _s3.Value;
            if (s3 is null)
                return keys;

            try
            {
                using var timeoutCts = CancellationTokenSource.CreateLinkedTokenSource(cancellationToken);
                timeoutCts.CancelAfter(_settings.RequestTimeout);

                string? continuationToken = null;
                do
                {
                    var response = await s3.ListObjectsV2Async(
                        new ListObjectsV2Request
                        {
                            BucketName = _settings.BucketName,
                            Prefix = prefix,
                            ContinuationToken = continuationToken
                        },
                        timeoutCts.Token).ConfigureAwait(false);

                    // Some MinIO/S3 gateways return null S3Objects instead of an empty list.
                    if (response.S3Objects is { } objects)
                    {
                        foreach (var obj in objects)
                        {
                            if (!string.IsNullOrWhiteSpace(obj.Key) && !obj.Key.EndsWith('/'))
                                keys.Add(obj.Key);
                        }
                    }

                    continuationToken = response.IsTruncated == true ? response.NextContinuationToken : null;
                }
                while (continuationToken != null);
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Failed to list MinIO objects for prefix {Prefix}", prefix);
            }

            return keys;
        }

        private static bool LooksLikeXml(byte[] bytes) =>
            bytes.Length >= 5
            && bytes[0] == (byte)'<'
            && bytes[1] == (byte)'?'
            && bytes[2] == (byte)'x'
            && bytes[3] == (byte)'m'
            && bytes[4] == (byte)'l';

        public void Dispose()
        {
            lock (_disposeLock)
            {
                if (_disposed)
                    return;
                _disposed = true;
                _http.Dispose();
                if (_s3.IsValueCreated)
                    _s3.Value?.Dispose();
            }
        }
    }
}
