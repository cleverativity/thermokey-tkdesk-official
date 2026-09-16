using Cardano.Domain.Interfaces;
using Cardano.Infrastructure.Repositories;
using Cardano.Infrastructure.Storage;

namespace Cardano_API.Extensions
{
    public static class RepositoryExtensions
    {
        /// <summary>
        /// Registers all repository interfaces with their implementations
        /// </summary>
        /// <param name="services">The service collection</param>
        /// <returns>The service collection for chaining</returns>
        public static IServiceCollection AddRepositories(this IServiceCollection services)
        {
            // Company domain repositories
            services.AddScoped<ICompanyRepository, CompanyRepository>();

            // Thermal domain repositories
            services.AddScoped<IThermalTypesRepository, ThermalRepository>();
            services.AddScoped<IThermalCalcRepository, ThermokeyCalculationRepository>();
            services.AddScoped<IThermalStepsRepository, ThermalStepsRepository>();
            services.AddScoped<ICondenserRepository, CondenserRepository>();

            // Accessories domain repositories
            services.AddScoped<IAccessoriesRepository, AccessoriesRepository>();

            // Unit conversion (used by ThermalCalcService, PdfReportService)
            services.AddScoped<IUnitTypeConverterRepository, UnitConversionRepository>();
            services.AddScoped<IUnitOfMeasureRepository, UnitOfMeasureRepository>();

            // MinIO — singleton; S3 client is created lazily inside MinioObjectStorage on first image fetch
            services.AddSingleton<IObjectStorage, MinioObjectStorage>();
            // Defer resolving IObjectStorage until PdfReportService actually attaches an image
            services.AddTransient(typeof(Lazy<>), typeof(LazyService<>));

            return services;
        }
    }

    /// <summary>Allows injecting Lazy&lt;T&gt; so heavy deps (MinIO) are not built during DB work.</summary>
    internal sealed class LazyService<T> : Lazy<T> where T : class
    {
        public LazyService(IServiceProvider provider)
            : base(() => provider.GetRequiredService<T>())
        {
        }
    }
}