namespace Cardano_API.Helpers
{
    public static class RuntimeEnvironmentHelper
    {
        public const string EnvironmentHeaderName = "X-Environment";
        public const string EnvironmentItemKey = "ResolvedEnvironment";
        public const string EnvironmentPathPrefixItemKey = "ResolvedEnvironmentPathPrefix";
        public const string ApiVersionPrefix = "/api/v1";

        public static string ResolveEnvironment(string? host, string? path, int? port, string fallbackEnvironment, string? explicitEnvironment = null)
        {
            if (TryMapEnvironmentAlias(explicitEnvironment, out var mappedEnvironment))
            {
                return mappedEnvironment;
            }

            var normalizedHost = (host ?? string.Empty).ToLowerInvariant();
            var normalizedPath = (path ?? string.Empty).ToLowerInvariant();

            if (normalizedPath.StartsWith("/stag")
                || normalizedPath.StartsWith("/stg")
                || normalizedHost.Contains("stag")
                || normalizedHost.Contains("stg")
                || normalizedHost.Contains("stage"))
            {
                return "Staging";
            }

            if (normalizedPath.StartsWith("/prod") || normalizedHost.Contains("prod"))
            {
                return "Production";
            }

            if (normalizedPath.StartsWith("/dev")
                || normalizedHost.Contains("dev"))
            {
                return "Development";
            }

            // Local multi-port routing support:
            // 5003/5103 => Development, 5004/5104 => Staging, 5005/5105 => Production
            if (port == 5004 || port == 5104)
            {
                return "Staging";
            }

            if (port == 5005 || port == 5105)
            {
                return "Production";
            }

            if (port == 5003 || port == 5103)
            {
                return "Development";
            }

            return string.IsNullOrWhiteSpace(fallbackEnvironment) ? "Development" : fallbackEnvironment;
        }

        public static bool TryResolveEnvironmentFromPathPrefix(string? path, out string environment, out string rewrittenPath, out string matchedPrefix)
        {
            environment = string.Empty;
            rewrittenPath = path ?? string.Empty;
            matchedPrefix = string.Empty;

            if (string.IsNullOrWhiteSpace(path) || path == "/")
            {
                return false;
            }

            var normalizedPath = path.Trim();
            if (!normalizedPath.StartsWith('/'))
            {
                normalizedPath = "/" + normalizedPath;
            }

            var trimmed = normalizedPath.Trim('/');
            if (string.IsNullOrWhiteSpace(trimmed))
            {
                return false;
            }

            var slashIndex = trimmed.IndexOf('/');
            var firstSegment = slashIndex >= 0 ? trimmed[..slashIndex] : trimmed;
            var remainingPath = slashIndex >= 0 ? trimmed[(slashIndex + 1)..] : string.Empty;

            if (!TryMapEnvironmentAlias(firstSegment, out var mappedEnvironment))
            {
                return false;
            }

            environment = mappedEnvironment;
            matchedPrefix = "/" + firstSegment.ToLowerInvariant();
            rewrittenPath = string.IsNullOrWhiteSpace(remainingPath) ? "/" : "/" + remainingPath;
            return true;
        }

        public static bool TryMapEnvironmentAlias(string? value, out string environment)
        {
            environment = string.Empty;
            if (string.IsNullOrWhiteSpace(value))
            {
                return false;
            }

            var normalized = value.Trim().ToLowerInvariant();

            if (normalized is "stag" or "stg" or "stage" or "staging")
            {
                environment = "Staging";
                return true;
            }

            if (normalized is "prod" or "production")
            {
                environment = "Production";
                return true;
            }

            if (normalized is "dev" or "development")
            {
                environment = "Development";
                return true;
            }

            return false;
        }

        /// <summary>
        /// All accepted public URL prefixes that can appear before /api/v1 in direct local calls.
        /// </summary>
        public static IReadOnlyCollection<string> GetSupportedEnvironmentPathPrefixes()
        {
            return new[]
            {
                "/dev",
                "/development",
                "/stag",
                "/stg",
                "/stage",
                "/staging",
                "/prod",
                "/production"
            };
        }

        /// <summary>
        /// Public URL prefix for an environment name (e.g. Staging -> /stag).
        /// Used when CapRover rewrites /stag/api/v1/* to /* and sends X-Environment instead.
        /// </summary>
        public static string? GetPathPrefixForEnvironment(string? environment)
        {
            if (string.IsNullOrWhiteSpace(environment))
            {
                return null;
            }

            if (TryMapEnvironmentAlias(environment, out var mappedFromAlias))
            {
                environment = mappedFromAlias;
            }

            return environment.Trim() switch
            {
                "Development" => "/dev",
                "Staging" => "/stag",
                "Production" => "/prod",
                _ => null
            };
        }

        /// <summary>
        /// Resolves the public path prefix (/stag, /dev, /prod) from middleware Items or X-Environment header.
        /// </summary>
        public static string? ResolvePublicPathPrefix(Microsoft.AspNetCore.Http.HttpContext? context)
        {
            if (context == null)
            {
                return null;
            }

            if (context.Items[EnvironmentPathPrefixItemKey] is string prefixFromPath
                && !string.IsNullOrWhiteSpace(prefixFromPath))
            {
                return prefixFromPath;
            }

            var explicitEnvironment =
                (context.Items[EnvironmentItemKey] as string)
                ?? context.Request.Headers[EnvironmentHeaderName].FirstOrDefault();

            return GetPathPrefixForEnvironment(explicitEnvironment);
        }

        public static bool TryStripApiVersionPrefix(string? path, out string rewrittenPath)
        {
            rewrittenPath = path ?? string.Empty;

            if (string.IsNullOrWhiteSpace(path))
            {
                return false;
            }

            var normalizedPath = path.Trim();
            if (!normalizedPath.StartsWith('/'))
            {
                normalizedPath = "/" + normalizedPath;
            }

            // Be tolerant of proxy-generated multiple leading slashes.
            while (normalizedPath.StartsWith("//", StringComparison.Ordinal))
            {
                normalizedPath = normalizedPath[1..];
            }

            var apiPrefix = ApiVersionPrefix;
            if (!normalizedPath.StartsWith(apiPrefix, StringComparison.OrdinalIgnoreCase))
            {
                return false;
            }

            // Match only "/api/v1" or "/api/v1/...".
            if (normalizedPath.Length > apiPrefix.Length
                && normalizedPath[apiPrefix.Length] != '/')
            {
                return false;
            }

            var remaining = normalizedPath[apiPrefix.Length..];
            rewrittenPath = string.IsNullOrWhiteSpace(remaining) ? "/" : remaining;
            return true;
        }
    }
}
