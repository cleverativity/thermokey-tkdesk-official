using Cardano.Application.Interfaces.Computation;
using Cardano.Application.Interfaces.Repositories;
using Cardano.Application.Interfaces.Services;
using Cardano.Application.Services;
using Cardano.Infrastructure.Computation;

namespace Cardano_API.Extensions
{
    public static class ServiceExtensions
    {
        /// <summary>
        /// Registers all application service interfaces with their implementations
        /// </summary>
        /// <param name="services">The service collection</param>
        /// <returns>The service collection for chaining</returns>
        public static IServiceCollection AddServices(this IServiceCollection services)
        {
            // Company domain services
            services.AddScoped<ICompanyService, CompanyService>();

            // Thermal domain services
            services.AddScoped<IThermalTypesService, ThermalTypesService>();
            services.AddScoped<IThermalCalcService, ThermalCalcService>();
            services.AddScoped<IThermalStepsService, ThermalStepsService>();
            services.AddScoped<IRatingService, RatingService>();
            services.AddScoped<IWorkingPointService, WorkingPointService>();

            // Accessories domain services
            services.AddScoped<IAccessoriesService, AccessoriesService>();

            // Thermal Calculation
            services.AddScoped<IThermalComputationEngine, ThermokeyComputationEngine>();

            // Adjustment Calculation
            services.AddScoped<IThermalAdjustmentService, ThermalAdjustmentService>();

            // Condenser drawing (MinIO) — shared by /Performance and PDF reports
            services.AddScoped<ICondenserImageService, CondenserImageService>();

            // Thermal Report
            services.AddScoped<IPdfReportService, PdfReportService>();

            // Cognito authentication helpers
            services.AddScoped<ICognitoAuthService, CognitoAuthService>();

            //Unit of measures
            services.AddScoped<IUnitOfMeasureService, UnitOfMeasureService>();

            return services;
        }
    }
}