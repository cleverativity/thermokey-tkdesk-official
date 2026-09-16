using Cardano.Application.Common.Mapping;

namespace Cardano_API.Extensions
{
    public static class AutoMapperExtensions
    {
        public static IServiceCollection AddAutoMapperProfiles(this IServiceCollection services)
        {
            services.AddAutoMapper(
                typeof(CompanyMappingProfile),
                typeof(PerformanceMappingProfile),
                typeof(ThermalStepsMappingProfile),
                typeof(AccessoriesMappingProfile),
                typeof(AdjustmentMappingProfile)
            );

            return services;
        }
    }
}