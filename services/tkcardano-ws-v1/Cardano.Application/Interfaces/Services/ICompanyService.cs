using Cardano.Application.DTOs.Requests;
using Cardano.Application.DTOs.Responses;
using Cardano.Domain.Entities;

namespace Cardano.Application.Interfaces.Repositories
{
    public interface ICompanyService
    {
        Task<IEnumerable<Company>> GetAllAsync();
        Task<CompanyResponse?> GetByIdAsync(Int32 id);
        Task<CompanyResponse> AddAsync(CompanyRequest dto);
        Task<CompanyResponse?> UpdateAsync(int id, CompanyRequest dto);
        Task<bool> DeleteAsync(Int32 id);
    }
}
