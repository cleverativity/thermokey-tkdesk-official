using Cardano.Application.DTOs.Requests;
using Cardano.Application.DTOs.Responses;
using Cardano.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Cardano.Application.Interfaces.Repositories
{
    public interface IThermalCalcService
    {
        //Task CapacitySearch(List<Condenser> condensers, CondenserSearch search);
        Task<List<PerformanceResponse>> GeneratePerformanceAsync(PerformanceRequest dto);
        Task<PaginatedComputationResponse> ComputeCondenserAsync(RemoteCondenserRequest dto, int page, int pageSize, string? query = null);
        Task<ConvertUnitypeResponse> ConvertToUnitType(ConvertUnitypeRequest dto);

    }
}
