using Cardano_API.Filters;
using Cardano_API.Helpers;
using Cardano_API.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace Cardano_API.Extensions
{
    public static class AuthenticationExtensions
    {
        /// <summary>
        /// Adds JWT Bearer authentication using AWS Cognito config (issuer + audience) from configuration.
        /// Expects configuration keys: AWS:CognitoAuthority, AWS:CognitoClientId.
        /// </summary>
        public static IServiceCollection AddJwtBearerAuthentication(this IServiceCollection services, IConfiguration configuration)
        {
            var authByEnvironment = BuildAuthByEnvironment();
            if (authByEnvironment.Count == 0)
            {
                var searched = string.Join(", ", AppSettingsPathHelper.GetSearchDirectories());
                throw new InvalidOperationException(
                    $"No valid AWS auth configuration found in appsettings files. Searched: {searched}");
            }

            const string dynamicScheme = "DynamicJwt";
            var schemeMap = authByEnvironment.ToDictionary(
                pair => pair.Key,
                pair => $"Bearer-{pair.Key}",
                StringComparer.OrdinalIgnoreCase);
            var defaultEnvironment = authByEnvironment.ContainsKey("Development")
                ? "Development"
                : authByEnvironment.Keys.First();

            var authBuilder = services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = dynamicScheme;
                options.DefaultChallengeScheme = dynamicScheme;
            });

            authBuilder.AddPolicyScheme(dynamicScheme, "Dynamic JWT scheme per host/path environment", options =>
            {
                options.ForwardDefaultSelector = context =>
                {
                    var explicitEnvironment =
                        (context.Items[RuntimeEnvironmentHelper.EnvironmentItemKey] as string)
                        ?? context.Request.Headers[RuntimeEnvironmentHelper.EnvironmentHeaderName].FirstOrDefault();

                    var resolvedEnvironment = RuntimeEnvironmentHelper.ResolveEnvironment(
                        context.Request.Host.Host,
                        context.Request.Path.Value,
                        context.Request.Host.Port,
                        defaultEnvironment,
                        explicitEnvironment);

                    if (schemeMap.TryGetValue(resolvedEnvironment, out var scheme))
                    {
                        return scheme;
                    }

                    return schemeMap[defaultEnvironment];
                };
            });

            foreach (var environmentConfig in authByEnvironment)
            {
                var scheme = schemeMap[environmentConfig.Key];
                authBuilder.AddJwtBearer(scheme, options =>
                {
                    options.Authority = environmentConfig.Value.Authority;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidIssuer = environmentConfig.Value.Authority,
                        ValidateAudience = true,
                        ValidAudiences = environmentConfig.Value.Audiences,
                        ValidateLifetime = true,
                        ClockSkew = TimeSpan.FromMinutes(2)
                    };
                    options.Events = new JwtBearerEvents
                    {
                        OnMessageReceived = context =>
                        {
                            var authHeader =
                                context.Request.Headers.Authorization.FirstOrDefault()
                                ?? context.Request.Headers["X-Forwarded-Authorization"].FirstOrDefault()
                                ?? context.Request.Headers["X-Original-Authorization"].FirstOrDefault();
                            if (string.IsNullOrEmpty(authHeader)) return Task.CompletedTask;
                            if (authHeader.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase))
                                context.Token = authHeader["Bearer ".Length..].Trim();
                            else
                                context.Token = authHeader.Trim();
                            return Task.CompletedTask;
                        },
                        OnAuthenticationFailed = context =>
                        {
                            // Do not write the response here. Let OnChallenge produce the single 401 payload.
                            // Writing here can start the response, then JwtBearer challenge throws when setting status code.
                            context.NoResult();
                            return Task.CompletedTask;
                        },
                        OnChallenge = context =>
                        {
                            if (context.Response.HasStarted) return Task.CompletedTask;
                            context.HandleResponse();

                            var hasAuthorizationHeader =
                                !string.IsNullOrWhiteSpace(context.Request.Headers.Authorization.FirstOrDefault())
                                || !string.IsNullOrWhiteSpace(context.Request.Headers["X-Forwarded-Authorization"].FirstOrDefault())
                                || !string.IsNullOrWhiteSpace(context.Request.Headers["X-Original-Authorization"].FirstOrDefault());

                            context.Response.StatusCode = 401;
                            context.Response.ContentType = "application/json";
                            var message = !hasAuthorizationHeader
                                ? "Missing Authorization header. Use: Authorization: Bearer"
                                : "Invalid or expired token.";
                            return context.Response.WriteAsJsonAsync(
                                new ErrorResponse(message),
                                ErrorResponseJsonContext.Default.ErrorResponse);
                        }
                    };
                });
            }

            services.AddAuthorization();
            services.AddScoped<RequireCognitoIssuerFilter>();

            return services;
        }

        private static Dictionary<string, AuthEnvironmentConfig> BuildAuthByEnvironment()
        {
            var result = new Dictionary<string, AuthEnvironmentConfig>(StringComparer.OrdinalIgnoreCase);
            var environments = new[] { "Development", "Staging", "Production" };

            foreach (var env in environments)
            {
                var envConfiguration = AppSettingsPathHelper.BuildEnvironmentConfiguration(env);

                var aws = envConfiguration.GetSection("AWS");
                var authority = aws["CognitoAuthority"];
                var configuredClientId = aws["CognitoClientId"];
                var configuredClientIds = aws.GetSection("CognitoClientIds").Get<string[]>() ?? Array.Empty<string>();

                var audiences = configuredClientIds
                    .Concat(new[] { configuredClientId })
                    .Where(v => !string.IsNullOrWhiteSpace(v))
                    .Select(v => v!.Trim())
                    .Distinct(StringComparer.Ordinal)
                    .ToArray();

                if (!string.IsNullOrWhiteSpace(authority) && audiences.Length > 0)
                {
                    result[env] = new AuthEnvironmentConfig
                    {
                        Authority = authority.Trim(),
                        Audiences = audiences
                    };
                }
            }

            return result;
        }

        private sealed class AuthEnvironmentConfig
        {
            public string Authority { get; set; } = string.Empty;
            public string[] Audiences { get; set; } = Array.Empty<string>();
        }
    }
}
