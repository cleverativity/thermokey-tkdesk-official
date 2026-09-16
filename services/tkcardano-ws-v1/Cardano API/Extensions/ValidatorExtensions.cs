using Cardano.Application.DTOs.Requests;
using Cardano.Application.Validators;
using FluentValidation;

namespace Cardano_API.Extensions
{
    /// <summary>
    /// Extension methods for registering all validators in the dependency injection container
    /// </summary>
    public static class ValidatorExtensions
    {
        /// <summary>
        /// Adds all FluentValidation validators to the service collection
        /// </summary>
        public static IServiceCollection AddValidators(this IServiceCollection services)
        {
            services.AddTransient<IValidator<CompanyRequest>, CompanyRequestValidator>();
            services.AddTransient<IValidator<PerformanceRequest>, PerformanceRequestValidator>();
            services.AddTransient<IValidator<AccessoriesRequest>, AccessoriesRequestValidator>();
            services.AddTransient<IValidator<AccessoriesSelectedRequest>, AccessoriesPriceRequestValidator>();

            services.AddTransient<IValidator<RemoteCondenserRequest>, RemoteCondenserRequestValidator>();
            services.AddTransient<IValidator<RatingRequest>, RatingRequestValidator>();
            services.AddTransient<IValidator<RatingCalculationRequest>, RatingCalculationRequestValidator>();
            services.AddTransient<IValidator<RatingWorkingPointRequest>, RatingWorkingPointRequestValidator>();
            services.AddTransient<IValidator<PerformanceRequest>, PerformanceRequestValidator>();
            services.AddTransient<IValidator<CreateStepsRequest>, CreateStepsRequestValidator>();
            services.AddTransient<IValidator<ThermalAdjustmentRequest>, ThermalAdjustmentValidator>();
            services.AddTransient<IValidator<EAnalysisRequest>, EnergyAnalysisRequestValidator>();
            services.AddTransient<IValidator<AccessoriesSelectedRequest>, AccessoriesSelectedRequestValidator>();
            services.AddTransient<IValidator<ConvertUnitypeRequest>, ConvertUnitTypeValidator>();


            //Report
            services.AddTransient<IValidator<EAnalysisReportsRequest>, EnergyAnalysisReportsRequestValidator>();
            services.AddTransient<IValidator<PerformanceReportsRequest>, PerformanceReportsRequestValidator>();

            return services;
        }
    }
}
