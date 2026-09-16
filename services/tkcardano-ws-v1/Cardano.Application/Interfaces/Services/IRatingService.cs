using Cardano.Application.DTOs.Requests;
using Cardano.Application.DTOs.Responses;

namespace Cardano.Application.Interfaces.Services
{
    public interface IRatingService
    {
        Task<PaginatedRatingResponse> RateAsync(RatingRequest request, int page, int pageSize);
        Task<RatingCalculationResponse?> CalculateAsync(RatingCalculationRequest request);
    }
}
