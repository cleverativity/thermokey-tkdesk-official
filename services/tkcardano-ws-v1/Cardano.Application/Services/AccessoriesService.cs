using AutoMapper;
using Cardano.Application.Common.Utilities;
using Cardano.Application.DTOs.Requests;
using Cardano.Application.DTOs.Responses;
using Cardano.Application.Interfaces.Computation;
using Cardano.Application.Interfaces.Repositories;

using Cardano.Domain.Interfaces;
using System.Text.RegularExpressions;


namespace Cardano.Application.Services
{
    public class AccessoriesService : IAccessoriesService
    {
        private readonly IThermalComputationEngine _engine;
        private readonly IAccessoriesRepository _repository;
        private readonly ICondenserRepository _condenserRepository;
        private readonly IMapper _mapper;

        public AccessoriesService(
            IAccessoriesRepository repository,
            ICondenserRepository condenserRepository,
            IThermalComputationEngine engine,
            IMapper mapper)
        {
            _repository = repository;
            _condenserRepository = condenserRepository;
            _engine = engine;
            _mapper = mapper;
        }

        public async Task<List<AccessoriesGroupResponse>> GetAccessoriesItemPerModel(AccessoriesRequest dto)
        {
            var condensers = (await _condenserRepository.GetAllCondenser()).ToList();
            var accessoriesItems = (await _repository.GetAllAccessoriesItems()).ToList();

            var items = _engine.AccessoriesItems(condensers, accessoriesItems, dto.Id, dto.RemoteModel).OrderBy(x => x.Id);

            var grp = items.GroupBy(x => new { x.GrpId, x.Group_name })
                .OrderBy(g => g.Key.GrpId)
                .Select(g => new AccessoriesGroupResponse
                {
                    GroupId = g.Key.GrpId,
                    GroupName = g.Key.Group_name,
                    Items = _mapper.Map<List<AccessoriesResponse>>(g.OrderBy(i => i.Id).ToList())
                }).ToList();

            return grp;
        }

        //public async Task<List<AccessoriesWithPriceResponse>> GetAccessoriesWithPrice(AccessoriesSelectedRequest dto)
        //{
        //    var condensers = (await _condenserRepository.GetAllCondenser()).ToList();
        //    var accessoriesItems = (await _repository.GetAllAccessoriesItems()).ToList();
        //    var accessories = (await _repository.GetAllAccessories()).ToList();

        //    int condenserId = dto.Id;
        //    String? condenserModel = dto.RemoteModel;
        //    String? fansConnection = dto.FansConnection;
        //    String? refRigerantType = dto.RefRigerantType;
        //    String? flowDirection = dto.AirFlowDirection;
        //    Double accessoriesDiscount = dto.AccessoriesDiscount;
        //    Double unitDiscount = dto.UnitDiscount;
        //    //int[] selected = dto.SelectedItems?.ToArray() ?? Array.Empty<int>();

        //    var items = _engine.GenerateAccessoriesWithPrice(accessories, condensers, accessoriesItems, condenserId, condenserModel, refRigerantType, flowDirection, fansConnection, accessoriesDiscount, unitDiscount).OrderBy(x => x.Id);
        //    return _mapper.Map<List<AccessoriesWithPriceResponse>>(items);
        //}

        public async Task<List<AccessoriesSelectedResponse>> GetSelectedAccessoriesPerModel(AccessoriesSelectedRequest dto)
        {
            var condensers = (await _condenserRepository.GetAllCondenser()).ToList();
            var accessoriesItems = (await _repository.GetAllAccessoriesItems()).ToList();
            var accessories = (await _repository.GetAllAccessories()).ToList();

            int condenserId = dto.Id;
            String? condenserModel = dto.RemoteModel;
            String? fansConnection = dto.FansConnection;
            String? refRigerantType = RefrigerantTypeNormalizer.ToEngine(dto.RefRigerantType);
            String? flowDirection = dto.AirFlowDirection;
            Double accessoriesDiscount = dto.AccessoriesDiscount;
            Double unitDiscount = dto.UnitDiscount;
            int[] selected = dto.SelectedItems?.ToArray() ?? Array.Empty<int>();

            var items = _engine.GenerateAccessoriesPrice(accessories, condensers, accessoriesItems,condenserId,condenserModel,refRigerantType,flowDirection,fansConnection,accessoriesDiscount,unitDiscount,selected).OrderBy(x => x.Id);
            return _mapper.Map<List<AccessoriesSelectedResponse>>(items);
        }

     
    }
}
