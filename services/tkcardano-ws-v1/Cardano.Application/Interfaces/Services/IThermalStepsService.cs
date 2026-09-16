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
    public interface IThermalStepsService
    {
        Task<GetCurrentStepsResponse> GetCurrentStepsAsync(Int32 selection_id);
        Task<List<GetCondenserAndAccessoriesStepsResponse>> GetCondenserAndAccessoriesAsync(Int32 selection_id, String status);
        Task<bool> DeleteAsync(Int32 id);
        Task<GetCurrentStepsResponse> AddAsync(CreateStepsRequest dto);
    }
}
