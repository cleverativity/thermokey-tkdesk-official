using Microsoft.Extensions.Configuration;

namespace Cardano.Infrastructure.Configuration
{
    public class MinioSettings
    {
        public string Endpoint { get; }
        public string AccessKey { get; }
        public string SecretKey { get; }
        public string BucketName { get; }
        public string Region { get; }
        public bool UseSSL { get; }
        public bool IsConfigured { get; }

        /// <summary>HTTP timeout for MinIO/S3 calls only (does not affect Postgres).</summary>
        public TimeSpan RequestTimeout { get; }

        public MinioSettings(IConfiguration configuration)
        {
            var section = configuration.GetSection("MinIO");

            Endpoint = section["Endpoint"] ?? string.Empty;
            AccessKey = section["AccessKey"] ?? string.Empty;
            SecretKey = section["SecretKey"] ?? string.Empty;
            BucketName = section["BucketName"] ?? "remote-condenser";
            Region = string.IsNullOrWhiteSpace(section["Region"]) ? "eu-east-1" : section["Region"]!;

            if (Endpoint.StartsWith("https://", StringComparison.OrdinalIgnoreCase))
                UseSSL = true;
            else if (Endpoint.StartsWith("http://", StringComparison.OrdinalIgnoreCase))
                UseSSL = false;
            else
                UseSSL = bool.TryParse(section["UseSSL"], out var useSsl) && useSsl;

            RequestTimeout = TimeSpan.FromSeconds(
                int.TryParse(section["RequestTimeoutSeconds"], out var seconds) && seconds > 0
                    ? seconds
                    : 30);

            IsConfigured = !string.IsNullOrWhiteSpace(Endpoint)
                           && !string.IsNullOrWhiteSpace(AccessKey)
                           && !string.IsNullOrWhiteSpace(SecretKey)
                           && !string.IsNullOrWhiteSpace(BucketName);
        }

        public string Host =>
            Endpoint
                .Replace("https://", "", StringComparison.OrdinalIgnoreCase)
                .Replace("http://", "", StringComparison.OrdinalIgnoreCase)
                .TrimEnd('/');
    }
}
