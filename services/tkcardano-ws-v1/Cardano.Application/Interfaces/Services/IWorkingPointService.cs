using Cardano.Application.DTOs.Requests;
using Cardano.Application.DTOs.Responses;

namespace Cardano.Application.Interfaces.Services
{
    public interface IWorkingPointService
    {
        Task<RatingWorkingPointResponse?> CalculateAsync(RatingWorkingPointRequest request);
    }
}
