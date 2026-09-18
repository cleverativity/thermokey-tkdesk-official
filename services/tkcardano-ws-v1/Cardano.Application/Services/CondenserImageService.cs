using Cardano.Application.Common.Utilities;
using Cardano.Application.Interfaces.Services;
using Cardano.Domain.Interfaces;
using Microsoft.Extensions.Logging;

namespace Cardano.Application.Services
{
    /// <summary>
    /// Shared MinIO lookup used by /Performance and Remote Condenser PDF reports.
    /// Size + airflow (+ series) → one drawing. Failures never throw to callers.
    /// </summary>
    public sealed class CondenserImageService : ICondenserImageService
    {
        private readonly Lazy<IObjectStorage> _objectStorage;
        private readonly ILogger<CondenserImageService> _logger;

        public CondenserImageService(
            Lazy<IObjectStorage> objectStorage,
            ILogger<CondenserImageService> logger)
        {
            _objectStorage = objectStorage;
            _logger = logger;
        }

        public async Task<CondenserImageResult?> TryGetImageAsync(
            string? modelName,
            string? airFlowDirection,
            string? condenserType,
            CancellationToken cancellationToken = default)
        {
            try
            {
                if (!CondenserImageKeyResolver.TryParse(modelName, airFlowDirection, condenserType, out var parsed)
                    || parsed is null)
                {
                    _logger.LogWarning(
                        "Could not parse condenser model for image: {ModelName}", modelName);
                    return null;
                }

                _logger.LogInformation(
                    "Resolving condenser image for {ModelName} → root={Root}, series={Series}, size={Size}, airflow={AirFlow}",
                    modelName, parsed.RootFolder, parsed.Series, parsed.Size, airFlowDirection);

                var storage = _objectStorage.Value;
                byte[]? imageBytes = null;
                string? matchedKey = null;
                var attemptedKeys = new List<string>();

                var prefix = $"{parsed.RootFolder}/{parsed.Series}/";
                var listedKeys = await storage.ListObjectKeysAsync(prefix, cancellationToken);
                matchedKey = CondenserImageKeyResolver.PickBestKey(listedKeys, parsed, airFlowDirection);

                if (matchedKey != null)
                {
                    attemptedKeys.Add(matchedKey);
                    imageBytes = await storage.GetObjectBytesAsync(matchedKey, cancellationToken);
                }

                if (imageBytes is null || imageBytes.Length == 0)
                {
                    foreach (var key in CondenserImageKeyResolver.BuildCandidateKeys(parsed, airFlowDirection))
                    {
                        if (attemptedKeys.Contains(key, StringComparer.OrdinalIgnoreCase))
                            continue;

                        attemptedKeys.Add(key);
                        imageBytes = await storage.GetObjectBytesAsync(key, cancellationToken);
                        if (imageBytes is { Length: > 0 })
                        {
                            matchedKey = key;
                            break;
                        }
                    }
                }

                if (imageBytes is null || imageBytes.Length == 0 || matchedKey is null)
                {
                    _logger.LogWarning(
                        "No MinIO condenser image found for model {ModelName} (series {Series}, size {Size}). Tried: {Keys}",
                        modelName, parsed.Series, parsed.Size, string.Join(", ", attemptedKeys.Take(12)));
                    return null;
                }

                var contentType = ResolveContentType(imageBytes);
                if (contentType is null)
                {
                    _logger.LogWarning(
                        "MinIO object {ObjectKey} for model {ModelName} is not a recognizable image ({Length} bytes, header={Header})",
                        matchedKey,
                        modelName,
                        imageBytes.Length,
                        BitConverter.ToString(imageBytes.Take(16).ToArray()));
                    return null;
                }

                _logger.LogInformation(
                    "Resolved condenser image {ObjectKey} for model {ModelName}", matchedKey, modelName);

                return new CondenserImageResult
                {
                    Bytes = imageBytes,
                    ObjectKey = matchedKey,
                    ContentType = contentType
                };
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Failed to resolve condenser image for model {ModelName}", modelName);
                return null;
            }
        }

        private static string? ResolveContentType(byte[] bytes)
        {
            if (bytes.Length < 4)
                return null;

            if (bytes[0] == 0xFF && bytes[1] == 0xD8 && bytes[2] == 0xFF)
                return "image/jpeg";

            if (bytes[0] == 0x89 && bytes[1] == 0x50 && bytes[2] == 0x4E && bytes[3] == 0x47)
                return "image/png";

            if (bytes[0] == 0x47 && bytes[1] == 0x49 && bytes[2] == 0x46)
                return "image/gif";

            if (bytes[0] == 0x42 && bytes[1] == 0x4D)
                return "image/bmp";

            return null;
        }
    }
}
