using Cardano.Application.DTOs.Requests;
using Cardano.Application.DTOs.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cardano.Application.Interfaces.Repositories
{
    public interface IThermalAdjustmentService
    {
        Task<List<ThermalAdjustCapacityResponse>> GetCapacityAdjustmentAsync(ThermalAdjustmentRequest dto);
        Task<List<ThermalAdjustFanResponse>> GetFanAdjustmentAsync(ThermalAdjustmentRequest dto);
        Task<List<EAnalysisResponse>> GetEAnalysisAsync(EAnalysisRequest dto);
    }
}
