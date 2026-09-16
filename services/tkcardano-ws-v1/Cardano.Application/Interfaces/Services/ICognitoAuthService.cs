using Cardano.Application.DTOs.Responses;
using System.Threading.Tasks;

namespace Cardano.Application.Interfaces.Repositories
{
    public interface ICognitoAuthService
    {
        Task<CaradanoBearerResponse> GetBearerDetails();
    }
}