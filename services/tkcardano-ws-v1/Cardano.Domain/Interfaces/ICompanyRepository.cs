


using Cardano.Domain.Entities;

namespace Cardano.Domain.Interfaces
{
    public interface ICompanyRepository
    {
        Task<IEnumerable<Company>> GetAllAsync();
        Task<Company?> GetByIdAsync(Int32 id);
        Task<Company> AddAsync(Company comp);
        Task<Company> UpdateAsync(Company comp);
        Task<bool> DeleteAsync(Int32 id);
    }
}
