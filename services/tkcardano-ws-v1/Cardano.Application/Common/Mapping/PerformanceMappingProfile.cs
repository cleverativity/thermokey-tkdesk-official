using AutoMapper;
using Cardano.Application.DTOs.Responses;
using Cardano.Domain.Entities;
using Cardano.Domain.Models;

namespace Cardano.Application.Common.Mapping
{
    public class PerformanceMappingProfile : Profile
    {
        public PerformanceMappingProfile()
        {
            // Used by: ThermalCalcService.GetPerformancesAsync (as List<PerformanceResponse>)
            CreateMap<Performance, PerformanceResponse>();

            // Used by: ThermalCalcService for mapping computation results to remote condenser response
            CreateMap<ComputationResults, RemoteCondenserResponse>()
                .ForMember(dest => dest.No_Fans, opt => opt.MapFrom(src => (int)src.No_fans))
                .ForMember(dest => dest.Rpm, opt => opt.MapFrom(src => (int)src.Rpm))
                .ForMember(dest => dest.Current_a, opt => opt.MapFrom(src => src.Current_a))
                .ForMember(dest => dest.Internal_Volume, opt => opt.MapFrom(src => src.Internal_volume))
                .ForMember(dest => dest.Inlet_Connection, opt => opt.MapFrom(src => src.Inlet_connection))
                .ForMember(dest => dest.Outlet_Connection, opt => opt.MapFrom(src => src.Outlet_connection));
        }
    }
}