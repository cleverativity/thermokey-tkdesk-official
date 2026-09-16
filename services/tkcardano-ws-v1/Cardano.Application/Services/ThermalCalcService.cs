using AutoMapper;
using Cardano.Application.Common.Utilities;
using Cardano.Application.DTOs.Requests;
using Cardano.Application.DTOs.Responses;
using Cardano.Application.Interfaces.Computation;
using Cardano.Application.Interfaces.Repositories;
using Cardano.Computation;
using Cardano.Domain.Interfaces;
using Cardano.Domain.Models;
using Cardano.Domain.ValueObjects;
using static InstinctCodeII.Units;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Cardano.Application.Services
{
    public class ThermalCalcService : IThermalCalcService
    {
        private readonly IUnitTypeConverterRepository _unitConvert;
        private readonly IThermalStepsRepository _steps;
        private readonly IThermalComputationEngine _engine;
        private readonly IThermalCalcRepository _repository;
        private readonly ICondenserRepository _condenserRepository;
        private readonly IMapper _mapper;

        //private readonly ConvertUnitType _unitConvert = new ConvertUnitType();

        public ThermalCalcService(
            IUnitTypeConverterRepository unitConvert,
            IThermalStepsRepository steps,
            IThermalCalcRepository repository,
            ICondenserRepository condenserRepository,
            IThermalComputationEngine engine,
            IMapper mapper)
        {
            //_thermokeyCondensers = new ThermokeyCondensers();
            _unitConvert = unitConvert;
            _steps = steps;
            _engine = engine;
            _repository = repository;
            _condenserRepository = condenserRepository;
            _mapper = mapper;
        }

        public async Task<List<PerformanceResponse>> GeneratePerformanceAsync(PerformanceRequest dto)
        {
            var con = (await _condenserRepository.GetAllCondenser()).ToList();
            var acc = (await _repository.GetAllAccessories()).ToList();

            int condenserId = dto.ModelId;
            int selectedModelId = dto.Id;
            string? remoteModel = dto.RemoteModel;
            string? condenserType = dto.CondenserType;
            string? fansConnection = dto.FansConnection;
            string? unitsType = dto.UnitsType;
            Double condensing = dto.Condensing;
            string? refRigerantType = dto.RefrigerantType;
            Double atmPressureInMetric = dto.AtmosphericPress;
            Double splValue = dto.SplValue;
            Double distance = dto.Distance;
            string? flowDirection = dto.AirFlowDirection;
            Double thermalCapacity = dto.ThermalCapacity;
            Double subCooling = dto.SubCooling;
            Double compressor = dto.Compressor;
            Double dryBulb = _unitConvert.DegFfromDegDryBulb(dto.DryBulb); //_thermokeyCondensers.DegFfromDegDryBulb(dto.DryBulb);
            Double altitude = dto.Altitude;
            Double relHumidity = dto.RelHumidity;
            Double capacityAdjustment = dto.CapacityAdjustment;
            Double newAirFlow = dto.NewAirFlow;

            dto.DryBulb = _unitConvert.DegFfromDegDryBulb(dto.DryBulb);
            dto.Condensing = _unitConvert.DegFfromDegDryBulb(dto.Condensing);
            var condenserSearch = CreateCondenserSearch(dto);

            _engine.CapacitySearch(con, condenserSearch);
            var performances = _engine.GeneratePerformance(acc, selectedModelId, condenserId, remoteModel, fansConnection, unitsType, flowDirection, refRigerantType, distance, dto.Condensing, thermalCapacity, dryBulb, altitude, compressor, subCooling, atmPressureInMetric, relHumidity, capacityAdjustment, newAirFlow);

            return _mapper.Map<List<PerformanceResponse>>(performances);
        }

        public CondenserSearch CreateCondenserSearch(PerformanceRequest dto)
        {
            var (toleranceMin, toleranceMax) = ToleranceBounds.Resolve(dto.ToleranceMin, dto.ToleranceMax);

            return new CondenserSearch
            {
                Id = dto.ModelId,
                SelectedModelId = dto.Id,
                CondenserType = dto.CondenserType,
                RemoteModel = dto.RemoteModel,
                FansConnection = dto.FansConnection,
                UnitsType = dto.UnitsType,
                Condensing = dto.Condensing,
                RefrigerantType = dto.RefrigerantType,
                AtmPressureInMetric = dto.AtmosphericPress,
                SplValue = dto.SplValue,
                Distance = dto.Distance,
                FlowDirection = dto.AirFlowDirection,
                ThermalCapacity = dto.ThermalCapacity,
                ToleranceMin = toleranceMin,
                ToleranceMax = toleranceMax,
                SubCooling = dto.SubCooling,
                Compressor = dto.Compressor,
                DryBulb = dto.DryBulb,
                Altitude = dto.Altitude,
                RelHumidity = dto.RelHumidity,
                CapacityAdjustment = dto.CapacityAdjustment,
                NewAirFlow = dto.NewAirFlow
            };
        }

        public async Task<PaginatedComputationResponse> ComputeCondenserAsync(RemoteCondenserRequest dto, int page, int pageSize, string? query = null)
        {
            var con = (await _condenserRepository.GetAllCondenser()).ToList();
            var acc = (await _repository.GetAllAccessories()).ToList();
            //var step = (await _steps.GetCurrentStepsAsync(dto.Selection_id)).ToList();

            var isImperial = string.Equals(dto.CurrentUnitType, "imp", StringComparison.OrdinalIgnoreCase)
                || string.Equals(dto.CurrentUnitType, "english", StringComparison.OrdinalIgnoreCase)
                || string.Equals(dto.CurrentUnitType, "i-p", StringComparison.OrdinalIgnoreCase)
                || string.Equals(dto.CurrentUnitType, "i-p (english)", StringComparison.OrdinalIgnoreCase)
                || string.Equals(dto.CurrentUnitType, "ip", StringComparison.OrdinalIgnoreCase);

            if (isImperial)
            {
                dto.ThermalCapacity = _unitConvert.ThermalCapacity("si", dto.ThermalCapacity);
                dto.Altitude = _unitConvert.ThermalAltitude("si", dto.Altitude);
                dto.DryBulb = _unitConvert.ThermalDryBulb("si", dto.DryBulb);
                dto.Compressor = _unitConvert.ThermalCompressor("si", dto.Compressor);
                dto.Condensing = _unitConvert.ThermalCondensing("si", dto.Condensing);
                dto.SubCooling = _unitConvert.ThermalSubCooling("si", dto.SubCooling);
                dto.Distance = _unitConvert.ThermalDistance("si", dto.Distance);
                dto.AtmosphericPress = _unitConvert.ThermalAtmosphericPress("si", dto.RelHumidity, dto.Altitude);
            }
            else
            {
                dto.Condensing = _unitConvert.DegFfromDegDryBulb(dto.Condensing);
                dto.DryBulb = _unitConvert.DegFfromDegDryBulb(dto.DryBulb);
            }

            var condenserSearch = CreateCondenserSearch(dto);
            var domainResult = _engine.Computation(con, acc, condenserSearch, page, pageSize, query ?? "");

            // Map from domain model to response DTO
            var responseResult = new PaginatedComputationResponse
            {
                Results = _mapper.Map<List<RemoteCondenserResponse>>(domainResult.Results),
                CurrentPage = domainResult.CurrentPage,
                PageSize = domainResult.PageSize,
                TotalCount = domainResult.TotalCount,
                TotalPages = domainResult.TotalPages,
                HasNextPage = domainResult.HasNextPage,
                HasPreviousPage = domainResult.HasPreviousPage
            };

            return responseResult;
        }

        public CondenserSearch CreateCondenserSearch(RemoteCondenserRequest dto)
        {
            var (toleranceMin, toleranceMax) = ToleranceBounds.Resolve(dto.ToleranceMin, dto.ToleranceMax);

            return new CondenserSearch
            {
                CondenserType = dto.CondenserType,
                CondenserModel = dto.CondenserModel,
                FansConnection = dto.FansConnection,
                UnitsType = dto.UnitsType,
                Condensing = dto.Condensing,
                RefrigerantType = dto.RefrigerantType,
                AtmPressureInMetric = dto.AtmosphericPress,
                SplValue = dto.SplValue,
                Distance = dto.Distance,
                FlowDirection = dto.AirFlowDirection,
                ThermalCapacity = dto.ThermalCapacity,
                ToleranceMin = toleranceMin,
                ToleranceMax = toleranceMax,
                SubCooling = dto.SubCooling,
                Compressor = dto.Compressor,
                DryBulb = dto.DryBulb,
                Altitude = dto.Altitude,
            };
        }

        public Task<ConvertUnitypeResponse> ConvertToUnitType(ConvertUnitypeRequest dto)
        {
            var convertedAltitude = _unitConvert.ThermalAltitude(dto.UnitTypes, dto.Altitude);

            return Task.FromResult(new ConvertUnitypeResponse
            {
                Capacity = _unitConvert.ThermalCapacity(dto.UnitTypes, dto.Capacity),
                Altitude = convertedAltitude,
                Drybulb = _unitConvert.ThermalDryBulb(dto.UnitTypes, dto.Drybulb),
                Compressor = _unitConvert.ThermalCompressor(dto.UnitTypes, dto.Compressor),
                Condensing = _unitConvert.ThermalCondensing(dto.UnitTypes, dto.Condensing),
                SubCooling = _unitConvert.ThermalSubCooling(dto.UnitTypes, dto.SubCooling),
                Distance = _unitConvert.ThermalDistance(dto.UnitTypes, dto.Distance),
                AtmosphericPress = _unitConvert.ThermalAtmosphericPress(
                    dto.UnitTypes,
                    dto.Relhumidity,
                    convertedAltitude),
            });
        }
    }
}