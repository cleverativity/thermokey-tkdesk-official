using AutoMapper;
using Cardano.Application.DTOs.Requests;
using Cardano.Application.DTOs.Responses;
using Cardano.Application.Interfaces.Repositories;
using Cardano.Domain.Entities;
using Cardano.Domain.Interfaces;

namespace Cardano.Application.Services
{
    public class CompanyService : ICompanyService
    {
        private readonly ICompanyRepository _repository;
        private readonly IMapper _mapper;

        public CompanyService(ICompanyRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<CompanyResponse> AddAsync(CompanyRequest dto)
        {
            var emp = _mapper.Map<Company>(dto);
            var created = await _repository.AddAsync(emp);
            return _mapper.Map<CompanyResponse>(created);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                return await _repository.DeleteAsync(id);
            }
            catch
            {
                return false;
            }
        }

        public async Task<IEnumerable<Company>> GetAllAsync()
        {
            var comp = await _repository.GetAllAsync();
            return comp;
        }

        public async Task<CompanyResponse?> GetByIdAsync(int id)
        {
            var company = await _repository.GetByIdAsync(id);
            return company != null ? _mapper.Map<CompanyResponse>(company) : null;
        }

        public async Task<CompanyResponse?> UpdateAsync(int id, CompanyRequest dto)
        {
            var existing = await _repository.GetByIdAsync(id);

            if (existing == null)
                return null;

            _mapper.Map(dto, existing);

            await _repository.UpdateAsync(existing);
            return _mapper.Map<CompanyResponse>(existing);
        }

    }
}
