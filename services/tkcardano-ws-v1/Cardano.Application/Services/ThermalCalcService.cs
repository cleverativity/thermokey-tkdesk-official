using AutoMapper;
using Cardano.Application.Common.Utilities;
using Cardano.Application.DTOs.Requests;
using Cardano.Application.DTOs.Responses;
using Cardano.Application.Interfaces.Computation;
using Cardano.Application.Interfaces.Repositories;
using Cardano.Application.Interfaces.Services;
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
        private readonly ICondenserImageService _condenserImageService;
        private readonly IMapper _mapper;

        //private readonly ConvertUnitType _unitConvert = new ConvertUnitType();

        public ThermalCalcService(
            IUnitTypeConverterRepository unitConvert,
            IThermalStepsRepository steps,
            IThermalCalcRepository repository,
            ICondenserRepository condenserRepository,
            IThermalComputationEngine engine,
            ICondenserImageService condenserImageService,
            IMapper mapper)
        {
            //_thermokeyCondensers = new ThermokeyCondensers();
            _unitConvert = unitConvert;
            _steps = steps;
            _engine = engine;
            _repository = repository;
            _condenserRepository = condenserRepository;
            _condenserImageService = condenserImageService;
            _mapper = mapper;
        }

        public async Task<List<PerformanceResponse>> GeneratePerformanceAsync(PerformanceRequest dto)
        {
            var con = (await _condenserRepository.GetAllCondenser()).ToList();
            var acc = (await _repository.GetAllAccessories()).ToList();

            ApplyBackupEngineInputs(dto);

            int condenserId = dto.ModelId;
            int selectedModelId = dto.Id;
            string? remoteModel = dto.RemoteModel;
            string? condenserType = dto.CondenserType;
            string? fansConnection = dto.FansConnection;
            string? unitsType = dto.UnitsType;
            Double condensing = dto.Condensing;
            string? refRigerantType = dto.RefrigerantType;
            Double atmPressureInMetric = dto.AtmosphericPress;
            Double distance = dto.Distance;
            string? flowDirection = dto.AirFlowDirection;
            Double thermalCapacity = dto.ThermalCapacity;
            Double tolerance = dto.Tolerance;
            Double subCooling = dto.SubCooling;
            Double compressor = dto.Compressor;
            Double dryBulb = _unitConvert.DegFfromDegDryBulb(dto.DryBulb); //_thermokeyCondensers.DegFfromDegDryBulb(dto.DryBulb);
            Double altitude = dto.Altitude;
            Double relHumidity = dto.RelHumidity;
            Double capacityAdjustment = dto.CapacityAdjustment;
            Double newAirFlow = dto.NewAirFlow;

            dto.Condensing = CondensingReferenceConverter.ToEngineCondensing(
                dto.Condensing,
                dto.RefrigerantType,
                dto.CondensingReference);
            dto.DryBulb = _unitConvert.DegFfromDegDryBulb(dto.DryBulb);
            dto.Condensing = _unitConvert.DegFfromDegDryBulb(dto.Condensing);

            var selected = con.FirstOrDefault(unit => unit.Id == condenserId);
            if (selected is not null
                && !CondenserSizeFilter.Fits(
                    selected,
                    CondenserSizeFilter.ToMillimetres(dto.MaxLength, dto.UnitsType),
                    CondenserSizeFilter.ToMillimetres(dto.MaxHeight, dto.UnitsType),
                    CondenserSizeFilter.ToMillimetres(dto.MaxWidth, dto.UnitsType),
                    dto.CondenserType,
                    dto.AirFlowDirection))
            {
                return [];
            }

            var condenserSearch = CreateCondenserSearch(dto);

            _engine.CapacitySearch(con, condenserSearch);
            var performances = _engine.GeneratePerformance(acc, selectedModelId, condenserId, remoteModel, fansConnection, unitsType, flowDirection, refRigerantType, distance, dto.Condensing, thermalCapacity, dryBulb, altitude, compressor, subCooling, atmPressureInMetric, relHumidity, capacityAdjustment, newAirFlow);

            var response = _mapper.Map<List<PerformanceResponse>>(performances);
            await AttachCondenserImageAsync(response, dto);
            return response;
        }

        private async Task AttachCondenserImageAsync(List<PerformanceResponse> response, PerformanceRequest dto)
        {
            if (response.Count == 0)
                return;

            var modelName = response[0].ModelName ?? dto.RemoteModel;
            var image = await _condenserImageService.TryGetImageAsync(
                modelName,
                dto.AirFlowDirection,
                dto.CondenserType);

            if (image is null)
                return;

            var base64 = Convert.ToBase64String(image.Bytes);
            foreach (var item in response)
            {
                item.ImageObjectKey = image.ObjectKey;
                item.ImageContentType = image.ContentType;
                item.ImageBase64 = base64;
            }
        }

        public CondenserSearch CreateCondenserSearch(PerformanceRequest dto)
        {
            var (toleranceMin, toleranceMax) = ToleranceBounds.Resolve(dto.Tolerance, dto.ToleranceMin, dto.ToleranceMax);

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
                SplValue = dto.MaxSoundPressure,
                MaxSoundPower = Math.Max(0, dto.MaxSoundPower),
                NoiseTolerance = Math.Max(0, dto.NoiseTolerance),
                Distance = dto.Distance,
                FlowDirection = dto.AirFlowDirection,
                ThermalCapacity = dto.ThermalCapacity,
                Tolerance = Math.Max(Math.Abs(toleranceMin), Math.Abs(toleranceMax)),
                ToleranceMin = toleranceMin,
                ToleranceMax = toleranceMax,
                SubCooling = dto.SubCooling,
                Compressor = dto.Compressor,
                DryBulb = dto.DryBulb,
                Altitude = dto.Altitude,
                RelHumidity = dto.RelHumidity,
                CapacityAdjustment = dto.CapacityAdjustment,
                NewAirFlow = dto.NewAirFlow,
                Esp = Math.Max(0, dto.Esp)
            };
        }

        public async Task<PaginatedComputationResponse> ComputeCondenserAsync(RemoteCondenserRequest dto, int page, int pageSize, string? query = null)
        {
            var con = (await _condenserRepository.GetAllCondenser()).ToList();
            var acc = (await _repository.GetAllAccessories()).ToList();
            //var step = (await _steps.GetCurrentStepsAsync(dto.Selection_id)).ToList();

            ApplyBackupEngineInputs(dto);

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

            dto.Condensing = CondensingReferenceConverter.ToEngineCondensing(
                dto.Condensing,
                dto.RefrigerantType,
                dto.CondensingReference);

            if (!isImperial)
            {
                dto.Condensing = _unitConvert.DegFfromDegDryBulb(dto.Condensing);
                dto.DryBulb = _unitConvert.DegFfromDegDryBulb(dto.DryBulb);
            }

            con = CondenserSizeFilter.Apply(
                con,
                CondenserSizeFilter.ToMillimetres(dto.MaxLength, dto.CurrentUnitType ?? dto.UnitsType),
                CondenserSizeFilter.ToMillimetres(dto.MaxHeight, dto.CurrentUnitType ?? dto.UnitsType),
                CondenserSizeFilter.ToMillimetres(dto.MaxWidth, dto.CurrentUnitType ?? dto.UnitsType),
                dto.CondenserType,
                dto.AirFlowDirection);

            if (con.Count == 0)
            {
                return new PaginatedComputationResponse
                {
                    Results = [],
                    CurrentPage = page,
                    PageSize = pageSize,
                    TotalCount = 0,
                    TotalPages = 0,
                    HasNextPage = false,
                    HasPreviousPage = false
                };
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
            var (toleranceMin, toleranceMax) = ToleranceBounds.Resolve(dto.Tolerance, dto.ToleranceMin, dto.ToleranceMax);

            return new CondenserSearch
            {
                CondenserType = dto.CondenserType,
                CondenserModel = "All",
                FansConnection = dto.FansConnection,
                UnitsType = dto.UnitsType,
                Condensing = dto.Condensing,
                RefrigerantType = dto.RefrigerantType,
                AtmPressureInMetric = dto.AtmosphericPress,
                SplValue = dto.MaxSoundPressure,
                MaxSoundPower = Math.Max(0, dto.MaxSoundPower),
                NoiseTolerance = Math.Max(0, dto.NoiseTolerance),
                Distance = dto.Distance,
                FlowDirection = dto.AirFlowDirection,
                ThermalCapacity = dto.ThermalCapacity,
                Tolerance = Math.Max(Math.Abs(toleranceMin), Math.Abs(toleranceMax)),
                ToleranceMin = toleranceMin,
                ToleranceMax = toleranceMax,
                SubCooling = dto.SubCooling,
                Compressor = dto.Compressor,
                DryBulb = dto.DryBulb,
                Altitude = dto.Altitude,
                Esp = Math.Max(0, dto.Esp)
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

        private static void ApplyBackupEngineInputs(RemoteCondenserRequest dto)
        {
            dto.RefrigerantType = RefrigerantTypeNormalizer.ToEngine(dto.RefrigerantType);
            dto.AtmosphericPress = NormalizeAtmosphericPressureKpa(dto.AtmosphericPress);
            dto.MaxSoundPressure = NormalizeMaxSoundPressure(dto.MaxSoundPressure);
            dto.Compressor = NormalizeCompressor(dto.Compressor);
        }

        private static void ApplyBackupEngineInputs(PerformanceRequest dto)
        {
            dto.RefrigerantType = RefrigerantTypeNormalizer.ToEngine(dto.RefrigerantType);
            dto.AtmosphericPress = NormalizeAtmosphericPressureKpa(dto.AtmosphericPress);
            dto.MaxSoundPressure = NormalizeMaxSoundPressure(dto.MaxSoundPressure);
            dto.Compressor = NormalizeCompressor(dto.Compressor);
        }

        private static double NormalizeAtmosphericPressureKpa(double atmosphericPress)
        {
            // Backup engine uses kPa (101.325). UI/curl sometimes send Pa (101325).
            return atmosphericPress > 2000 ? atmosphericPress / 1000.0 : atmosphericPress;
        }

        private static double NormalizeMaxSoundPressure(double maxSoundPressure)
        {
            // Thermokey default in the backup engine comments is 65 dB.
            return maxSoundPressure <= 0 ? 65 : maxSoundPressure;
        }

        private static double NormalizeCompressor(double compressor)
        {
            // Thermokey default desuperheat is 25 K.
            return compressor <= 0 ? 25 : compressor;
        }
    }
}
