using AutoMapper;
using Cardano.Application.DTOs.Responses;
using Cardano.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cardano.Application.Common.Mapping
{
    public class AdjustmentMappingProfile : Profile
    {
        public AdjustmentMappingProfile() 
        {
            // Used by: ThermalAdjustmentService.GetCapacityAdjustmentAsync
            CreateMap<AdjustCapacityResult, ThermalAdjustCapacityResponse>();

            // Used by: ThermalAdjustmentService.GetFanFlowAdjustment
            CreateMap<AdjustFanResult, ThermalAdjustFanResponse>();

            // Used by: ThermalAdjustmentService.GetFanFlowAdjustment
            CreateMap<EAResult, EAnalysisResponse>();
        }
    }
}
