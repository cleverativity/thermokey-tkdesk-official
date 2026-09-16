using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Cardano_API.Helpers;

namespace Cardano_API.Filters
{
    /// <summary>
    /// Ensures the Bearer token's "iss" claim matches the configured Cognito authority URL.
    /// </summary>
    public class RequireCognitoIssuerFilter : IAsyncAuthorizationFilter
    {
        private readonly Dictionary<string, string> _issuerByEnvironment;
        private readonly string _defaultEnvironment;

        public RequireCognitoIssuerFilter(IConfiguration config)
        {
            _issuerByEnvironment = BuildIssuerByEnvironment();
            if (_issuerByEnvironment.Count == 0)
            {
                var searched = string.Join(", ", AppSettingsPathHelper.GetSearchDirectories());
                throw new InvalidOperationException(
                    $"AWS:CognitoAuthority is not configured in appsettings files. Searched: {searched}");
            }

            _defaultEnvironment = _issuerByEnvironment.ContainsKey("Development")
                ? "Development"
                : _issuerByEnvironment.Keys.First();
        }

        public Task OnAuthorizationAsync(AuthorizationFilterContext context)
        {
            if (context.HttpContext.User.Identity?.IsAuthenticated != true)
                return Task.CompletedTask;

            var explicitEnvironment =
                (context.HttpContext.Items[RuntimeEnvironmentHelper.EnvironmentItemKey] as string)
                ?? context.HttpContext.Request.Headers[RuntimeEnvironmentHelper.EnvironmentHeaderName].FirstOrDefault();

            var resolvedEnvironment = RuntimeEnvironmentHelper.ResolveEnvironment(
                context.HttpContext.Request.Host.Host,
                context.HttpContext.Request.Path.Value,
                context.HttpContext.Request.Host.Port,
                _defaultEnvironment,
                explicitEnvironment);
            if (!_issuerByEnvironment.TryGetValue(resolvedEnvironment, out var expectedIssuer))
            {
                expectedIssuer = _issuerByEnvironment[_defaultEnvironment];
            }

            var iss = context.HttpContext.User.FindFirst("iss")?.Value;
            if (string.IsNullOrEmpty(iss) || !string.Equals(iss.Trim(), expectedIssuer.Trim(), StringComparison.Ordinal))
            {
                context.Result = new UnauthorizedObjectResult(new { error = "Token issuer is not authorized." });
            }

            return Task.CompletedTask;
        }

        private static Dictionary<string, string> BuildIssuerByEnvironment()
        {
            var environments = new[] { "Development", "Staging", "Production" };
            var issuers = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);

            foreach (var env in environments)
            {
                var envConfiguration = AppSettingsPathHelper.BuildEnvironmentConfiguration(env);

                var issuer = envConfiguration["AWS:CognitoAuthority"];
                if (!string.IsNullOrWhiteSpace(issuer))
                {
                    issuers[env] = issuer.Trim();
                }
            }

            return issuers;
        }
    }
}
