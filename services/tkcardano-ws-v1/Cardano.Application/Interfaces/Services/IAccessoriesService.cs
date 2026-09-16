using Cardano.Application.DTOs.Requests;
using Cardano.Application.DTOs.Responses;
using Cardano.Domain.Entities;

namespace Cardano.Application.Interfaces.Repositories
{
    public interface IAccessoriesService
    {
        Task<List<AccessoriesGroupResponse>> GetAccessoriesItemPerModel(AccessoriesRequest dto);
        Task<List<AccessoriesSelectedResponse>> GetSelectedAccessoriesPerModel(AccessoriesSelectedRequest dto);
        //Task<List<AccessoriesWithPriceResponse>> GetAccessoriesWithPrice(AccessoriesSelectedRequest dto);
    }
}