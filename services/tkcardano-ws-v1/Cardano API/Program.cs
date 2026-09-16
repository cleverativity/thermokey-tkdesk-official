using Amazon;
using Amazon.CognitoIdentityProvider;
using Cardano.Infrastructure.Configuration;
using Cardano.Infrastructure.Data;
using Cardano_API.Extensions;
using Cardano_API.Filters;
using Cardano_API.Helpers;
using Cardano_API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Mvc.ApplicationParts;
using System.Diagnostics.CodeAnalysis;
using System.Text.Json.Serialization;
using System.Text.Json.Serialization.Metadata;

internal class Program
{
    [Obsolete]
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddHttpContextAccessor();
        builder.Services.Configure<ForwardedHeadersOptions>(options =>
        {
            options.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto | ForwardedHeaders.XForwardedHost;
            options.KnownNetworks.Clear();
            options.KnownProxies.Clear();
        });

        builder.Services.AddSingleton<IAmazonCognitoIdentityProvider>(sp =>
        {
            var config = sp.GetRequiredService<IConfiguration>();
            var region = config["AWS:Region"] ?? "us-east-1";
            return new AmazonCognitoIdentityProviderClient(RegionEndpoint.GetBySystemName(region));
        });

        builder.Services.AddJwtBearerAuthentication(builder.Configuration);

        // Add services to the container.

        builder.Services.AddControllers(options => options.Filters.AddService<RequireCognitoIssuerFilter>())
            .AddApplicationPart(typeof(Program).Assembly)
            .AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.NumberHandling = JsonNumberHandling.AllowNamedFloatingPointLiterals;
                EnsureReflectionTypeInfoResolver(options.JsonSerializerOptions);
            });

        builder.Services.ConfigureHttpJsonOptions(options =>
        {
            EnsureReflectionTypeInfoResolver(options.SerializerOptions);
        });

        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen(options =>
        {
            options.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
            {
                Title = "Cardano API",
                Version = "1.0"
            });
            options.DocInclusionPredicate((_, _) => true);
            options.ResolveConflictingActions(apiDescriptions => apiDescriptions.First());
            options.CustomOperationIds(apiDesc =>
            {
                var path = apiDesc.RelativePath ?? apiDesc.ActionDescriptor.DisplayName ?? "operation";
                var method = apiDesc.HttpMethod ?? "GET";
                return $"{method}_{path}".Replace('/', '_').Replace('{', '_').Replace('}', '_');
            });
            options.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
            {
                Name = "Authorization",
                Type = Microsoft.OpenApi.Models.SecuritySchemeType.Http,
                Scheme = "Bearer",
                In = Microsoft.OpenApi.Models.ParameterLocation.Header,
                Description = "Paste your Cognito idToken (JWT). Example: eyJraWQi..."
            });
            options.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
            {
                {
                    new Microsoft.OpenApi.Models.OpenApiSecurityScheme { Reference = new Microsoft.OpenApi.Models.OpenApiReference { Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme, Id = "Bearer" } },
                    Array.Empty<string>()
                }
            });
        });

        // Register database / MinIO configuration (MinIO does not alter Npgsql)
        builder.Services.AddSingleton<DatabaseSettings>();
        builder.Services.AddSingleton<MinioSettings>();

        // Configure AutoMapper with domain-specific profiles
        builder.Services.AddAutoMapperProfiles();

        // Dependency Injection
        builder.Services.AddRepositories();
        builder.Services.AddServices();
        builder.Services.AddValidators();

        // CORS: allow frontend to call the API from a different origin/port
        builder.Services.AddCors(options =>
        {
            options.AddDefaultPolicy(policy =>
            {
                policy.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
            });
        });

        var connectionStringsByEnvironment = BuildConnectionStringsByEnvironment();

        builder.Services.AddDbContext<AppDbContext>((serviceProvider, options) =>
        {
            var httpContextAccessor = serviceProvider.GetRequiredService<IHttpContextAccessor>();
            var httpContext = httpContextAccessor.HttpContext;
            var request = httpContext?.Request;
            var explicitEnvironment =
                (httpContext?.Items[RuntimeEnvironmentHelper.EnvironmentItemKey] as string)
                ?? request?.Headers[RuntimeEnvironmentHelper.EnvironmentHeaderName].FirstOrDefault();

            var resolvedEnvironment = RuntimeEnvironmentHelper.ResolveEnvironment(
                request?.Host.Host,
                request?.Path.Value,
                request?.Host.Port,
                builder.Environment.EnvironmentName,
                explicitEnvironment);

            if (connectionStringsByEnvironment.TryGetValue(resolvedEnvironment, out var connectionString)
                && !string.IsNullOrWhiteSpace(connectionString))
            {
                // Remote DB can be slow to stream large condenser/accessories result sets.
                options.UseNpgsql(
                    ResolveDeployedConnectionString(connectionString, request),
                    npgsql => npgsql.CommandTimeout(300));
                return;
            }

            var dbSettings = serviceProvider.GetRequiredService<DatabaseSettings>();
            options.UseNpgsql(
                ResolveDeployedConnectionString(dbSettings.ConnectionString, request),
                npgsql => npgsql.CommandTimeout(300));
        });

        // Configure listening URL before Build() only for containerized runtime.
        // For local runs, launchSettings.json applicationUrl should drive the port per profile.
        if (string.Equals(builder.Configuration["DOTNET_RUNNING_IN_CONTAINER"], "true", StringComparison.OrdinalIgnoreCase))
        {
            builder.WebHost.UseUrls("http://0.0.0.0:5001");
        }

        var app = builder.Build();

        // Respect reverse-proxy forwarded headers (scheme/host) so generated URLs use https in CapRover.
        app.UseForwardedHeaders();

        app.Use(async (context, next) =>
        {
            if (RuntimeEnvironmentHelper.TryResolveEnvironmentFromPathPrefix(
                context.Request.Path.Value,
                out var resolvedEnvironment,
                out var rewrittenPath,
                out var matchedPrefix))
            {
                context.Items[RuntimeEnvironmentHelper.EnvironmentItemKey] = resolvedEnvironment;
                context.Items[RuntimeEnvironmentHelper.EnvironmentPathPrefixItemKey] = matchedPrefix;
                context.Request.Headers[RuntimeEnvironmentHelper.EnvironmentHeaderName] = resolvedEnvironment;
                context.Request.Path = rewrittenPath;
            }
            else
            {
                // CapRover rewrites /stag/api/v1/* -> /* and sends X-Environment: Staging.
                // Restore env + public prefix so Swagger generates .../stag/api/v1/ URLs.
                var envFromHeader = context.Request.Headers[RuntimeEnvironmentHelper.EnvironmentHeaderName].FirstOrDefault();
                if (!string.IsNullOrWhiteSpace(envFromHeader))
                {
                    context.Items[RuntimeEnvironmentHelper.EnvironmentItemKey] = envFromHeader.Trim();
                    var prefixFromEnv = RuntimeEnvironmentHelper.GetPathPrefixForEnvironment(envFromHeader);
                    if (!string.IsNullOrWhiteSpace(prefixFromEnv))
                    {
                        context.Items[RuntimeEnvironmentHelper.EnvironmentPathPrefixItemKey] = prefixFromEnv;
                    }
                }
            }

            if (RuntimeEnvironmentHelper.TryStripApiVersionPrefix(
                context.Request.Path.Value,
                out var versionRewrittenPath))
            {
                context.Request.Path = versionRewrittenPath;
            }

            await next();
        });

        if (!app.Environment.IsDevelopment())
        {
            app.Use(async (context, next) =>
            {
                var hasResolvedEnvironment =
                    context.Items[RuntimeEnvironmentHelper.EnvironmentItemKey] is string resolvedEnvironment
                    && RuntimeEnvironmentHelper.TryMapEnvironmentAlias(resolvedEnvironment, out _);

                var hasEnvironmentHeader =
                    RuntimeEnvironmentHelper.TryMapEnvironmentAlias(
                        context.Request.Headers[RuntimeEnvironmentHelper.EnvironmentHeaderName].FirstOrDefault(),
                        out _);

                if (!hasResolvedEnvironment && !hasEnvironmentHeader)
                {
                    context.Response.StatusCode = StatusCodes.Status404NotFound;
                    await context.Response.WriteAsJsonAsync(
                        new ErrorResponse("Environment prefix is required. Use /dev, /stg, or /prod."),
                        ErrorResponseJsonContext.Default.ErrorResponse);
                    return;
                }

                await next();
            });
        }

        // Configure the HTTP request pipeline - enable Swagger in all environments
        app.UseSwagger(options =>
        {
            options.PreSerializeFilters.Add((swaggerDoc, httpRequest) =>
            {
                var prefix = RuntimeEnvironmentHelper.ResolvePublicPathPrefix(httpRequest.HttpContext);
                var forwardedProto = GetForwardedHeaderValue(httpRequest, "X-Forwarded-Proto");
                var forwardedHost = GetForwardedHeaderValue(httpRequest, "X-Forwarded-Host");
                var scheme = string.IsNullOrWhiteSpace(forwardedProto) ? httpRequest.Scheme : forwardedProto;
                var host = string.IsNullOrWhiteSpace(forwardedHost) ? httpRequest.Host.Value : forwardedHost;
                var serverUrl = string.IsNullOrWhiteSpace(prefix)
                    ? $"{scheme}://{host}{RuntimeEnvironmentHelper.ApiVersionPrefix}"
                    : $"{scheme}://{host}{prefix}{RuntimeEnvironmentHelper.ApiVersionPrefix}";

                swaggerDoc.Servers = new List<Microsoft.OpenApi.Models.OpenApiServer>
                {
                    new() { Url = serverUrl }
                };
            });
        });
        app.UseSwaggerUI(options =>
        {
            // Relative path keeps Swagger working under /stag/swagger, /dev/swagger, etc.
            options.SwaggerEndpoint("v1/swagger.json", "Cardano API v1");
            options.RoutePrefix = "swagger";
        });

        // Only redirect HTTP→HTTPS when HTTPS is configured (e.g. in Development); skip in container
        if (!app.Environment.IsProduction())
        {
            app.UseHttpsRedirection();
        }

        app.UseExceptionHandler(appError =>
        {
            appError.Run(async context =>
            {
                context.Response.StatusCode = 500;
                context.Response.ContentType = "application/json";
                var ex = context.Features.Get<Microsoft.AspNetCore.Diagnostics.IExceptionHandlerFeature>()?.Error;
                var message = GetPublicErrorMessage(ex);
                await context.Response.WriteAsJsonAsync(
                    new ErrorResponse(message),
                    ErrorResponseJsonContext.Default.ErrorResponse);
            });
        });

        app.UseCors();

        app.UseAuthentication();
        app.UseAuthorization();

        app.MapControllers();

        // Prefixed copies stay routable, but are hidden from Swagger so duplicate
        // operation IDs do not wipe the spec. Middleware already strips /dev and /api/v1.
        if (app.Environment.IsDevelopment())
        {
            app.MapGroup(RuntimeEnvironmentHelper.ApiVersionPrefix)
                .ExcludeFromDescription()
                .MapControllers();
        }

        foreach (var environmentPathPrefix in RuntimeEnvironmentHelper.GetSupportedEnvironmentPathPrefixes())
        {
            app.MapGroup($"{environmentPathPrefix}{RuntimeEnvironmentHelper.ApiVersionPrefix}")
                .ExcludeFromDescription()
                .MapControllers();
        }

        app.Run();
    }

    private static string ResolveDeployedConnectionString(string connectionString, HttpRequest? request)
    {
        if (string.IsNullOrWhiteSpace(connectionString)
            || !connectionString.Contains("Host=localhost", StringComparison.OrdinalIgnoreCase))
        {
            return connectionString;
        }

        var inContainer = string.Equals(
            Environment.GetEnvironmentVariable("DOTNET_RUNNING_IN_CONTAINER"),
            "true",
            StringComparison.OrdinalIgnoreCase);

        var requestHost = request?.Host.Host ?? string.Empty;
        var isRemoteRequestHost =
            requestHost.Contains("cleverativity", StringComparison.OrdinalIgnoreCase)
            || requestHost.Contains("testing", StringComparison.OrdinalIgnoreCase)
            || requestHost.Contains("srvnve", StringComparison.OrdinalIgnoreCase);

        if (!inContainer && !isRemoteRequestHost)
        {
            return connectionString;
        }

        var dbHost = Environment.GetEnvironmentVariable("DB_HOST");
        if (string.IsNullOrWhiteSpace(dbHost) || dbHost.Equals("localhost", StringComparison.OrdinalIgnoreCase))
        {
            dbHost = "199.241.137.109";
        }

        var resolved = connectionString.Replace("Host=localhost", $"Host={dbHost}", StringComparison.OrdinalIgnoreCase);

        var dbName = Environment.GetEnvironmentVariable("DB_NAME");
        if (!string.IsNullOrWhiteSpace(dbName))
        {
            resolved = System.Text.RegularExpressions.Regex.Replace(
                resolved,
                @"Database=[^;]+",
                $"Database={dbName}",
                System.Text.RegularExpressions.RegexOptions.IgnoreCase);
        }
        else if (resolved.Contains("Database=cardano_test", StringComparison.OrdinalIgnoreCase))
        {
            resolved = resolved.Replace("Database=cardano_test", "Database=cardanodb", StringComparison.OrdinalIgnoreCase);
        }

        return resolved;
    }

    private static string GetPublicErrorMessage(Exception? ex)
    {
        if (ex is null)
        {
            return "An error occurred while processing your request.";
        }

        var innermost = ex;
        while (innermost.InnerException is not null)
        {
            innermost = innermost.InnerException;
        }

        if (innermost != ex && !string.IsNullOrWhiteSpace(innermost.Message))
        {
            return $"{ex.Message} {innermost.Message}";
        }

        return ex.Message;
    }

    private static Dictionary<string, string> BuildConnectionStringsByEnvironment()
    {
        var result = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
        var environments = new[] { "Development", "Staging", "Production" };

        foreach (var env in environments)
        {
            var envConfig = AppSettingsPathHelper.BuildEnvironmentConfiguration(env);

            var conn = envConfig.GetConnectionString("DefaultConnection");
            if (!string.IsNullOrWhiteSpace(conn))
            {
                result[env] = conn;
            }
        }

        return result;
    }

    [UnconditionalSuppressMessage("Trimming", "IL2026", Justification = "This API uses reflection-based System.Text.Json; JsonSerializerIsReflectionEnabledByDefault is true.")]
    [UnconditionalSuppressMessage("AOT", "IL3050", Justification = "This API uses reflection-based System.Text.Json; JsonSerializerIsReflectionEnabledByDefault is true.")]
    private static void EnsureReflectionTypeInfoResolver(System.Text.Json.JsonSerializerOptions options)
    {
        if (options.TypeInfoResolverChain.OfType<DefaultJsonTypeInfoResolver>().Any())
        {
            return;
        }

        options.TypeInfoResolverChain.Insert(0, new DefaultJsonTypeInfoResolver());
    }

    private static string? GetForwardedHeaderValue(HttpRequest request, string headerName)
    {
        var value = request.Headers[headerName].FirstOrDefault();
        if (string.IsNullOrWhiteSpace(value))
        {
            return null;
        }

        var firstValue = value.Split(',')[0].Trim();
        return string.IsNullOrWhiteSpace(firstValue) ? null : firstValue;
    }
}