using Cardano.Application.Common;
using Cardano.Application.Common.Utilities;
using Cardano.Application.DTOs.Responses;
using Cardano.Application.Interfaces.Repositories;
using Cardano.Domain.Entities;
using Cardano.Domain.Interfaces;


namespace Cardano.Application.Services
{
    public class ThermalTypesService : IThermalTypesService
    {

        private readonly IThermalTypesRepository _repository;
        private readonly ICondenserRepository _condenserRepository;

        public ThermalTypesService(IThermalTypesRepository repository, ICondenserRepository condenserRepository)
        {
            _repository = repository;
            _condenserRepository = condenserRepository;
        }

        public async Task<IEnumerable<CondenserResponse>> GetAllCondenser()
        {
            var con = await _condenserRepository.GetAllCondenser();
            return con.Select(c => new CondenserResponse { Id = c.Id, Model = c.Model });
        }

        public async Task<IEnumerable<CondenserRefType>> GetAllCondenserRefType()
        {
            var conRefType = await _repository.GetAllCondenserRefType();
            return conRefType
                .Select(r => new CondenserRefType
                {
                    Id = r.Id,
                    condenser_type = RefrigerantTypeNormalizer.ToDisplay(r.condenser_type)
                })
                .OrderBy(r => r.condenser_type, StringComparer.OrdinalIgnoreCase)
                .ToList();
        }

        public async Task<IEnumerable<CondenserType>> GetAllCondenserType()
        {
            var conType = await _repository.GetAllCondenserType();
            return conType;
        }

        public async Task<IEnumerable<FanConnection>> GetAllFanConnection()
        {
            var fan = await _repository.GetAllFanConnection();
            return fan;
        }

        public IReadOnlyList<string> GetCoilGeometries() => CoilGeometryCatalog.Values;
    }
}
