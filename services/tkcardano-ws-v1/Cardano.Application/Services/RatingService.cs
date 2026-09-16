using Cardano.Application.DTOs.Requests;
using Cardano.Application.DTOs.Responses;
using Cardano.Application.Interfaces.Computation;
using Cardano.Application.Interfaces.Services;
using Cardano.Domain.Interfaces;
using Cardano.Domain.Models;

namespace Cardano.Application.Services
{
    public class RatingService : IRatingService
    {
        public const double ContainerWidthMm = 2350;

        private readonly ICondenserRepository _condenserRepository;
        private readonly IThermalComputationEngine _engine;

        public RatingService(ICondenserRepository condenserRepository, IThermalComputationEngine engine)
        {
            _condenserRepository = condenserRepository;
            _engine = engine;
        }

        public async Task<PaginatedRatingResponse> RateAsync(RatingRequest request, int page, int pageSize)
        {
            if (page < 1)
            {
                page = 1;
            }

            if (pageSize < 1)
            {
                pageSize = 10;
            }

            var condensers = (await _condenserRepository.GetAllCondenser()).ToList();
            var search = CreateSearch(request);
            var matches = _engine.SelectRatedUnits(condensers, search);

            var totalCount = matches.Count;
            var totalPages = pageSize == 0 ? 0 : (int)Math.Ceiling(totalCount / (double)pageSize);
            var paged = matches
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(MapResult)
                .ToList();

            return new PaginatedRatingResponse
            {
                Results = paged,
                Air = MapAir(search),
                Refrigerant = MapRefrigerant(search),
                FanSpeed = MapFanSpeed(search),
                CurrentPage = page,
                PageSize = pageSize,
                TotalCount = totalCount,
                TotalPages = totalPages,
                HasNextPage = page < totalPages,
                HasPreviousPage = page > 1 && totalCount > 0
            };
        }

        private static RatingSearch CreateSearch(RatingRequest request)
        {
            var maxWidthMm = request.MaxWidth;

            if (request.UseContainerWidth)
            {
                maxWidthMm = maxWidthMm.HasValue
                    ? Math.Min(maxWidthMm.Value, ContainerWidthMm)
                    : ContainerWidthMm;
            }

            var fanSpeed = NormalizeFanSpeed(request.FanSpeed);

            return new RatingSearch
            {
                Series = NormalizeAll(request.Series),
                Subseries = NormalizeAll(request.Subseries),
                NumberOfModules = request.NumberOfModules,
                NumberOfFans = request.NumberOfFans,
                Assembly = NormalizeAll(request.Assembly),
                FanType = NormalizeAll(request.FanType),
                FanBrand = NormalizeAll(request.FanBrand),
                FanDiameter = request.FanDiameter,
                FanSpeedValue = fanSpeed.Value,
                FanSpeedUnit = fanSpeed.Unit,
                NoiseClass = NormalizeAll(request.NoiseClass),
                FluidPassages = NormalizeAll(request.FluidPassages),
                CoilGeometry = NormalizeAll(request.CoilGeometry),
                DryBulbC = request.DryBulb,
                RelHumidity = request.RelHumidity,
                AltitudeM = request.Altitude,
                RefrigerantType = NormalizeRefrigerant(request.RefrigerantType),
                CondensingC = request.Condensing,
                SubCoolingK = request.SubCooling,
                ThermalCapacityKw = request.ThermalCapacity,
                MaxLengthMm = request.MaxLength,
                MaxHeightMm = request.MaxHeight,
                MaxWidthMm = maxWidthMm,
                MaxWeightKg = request.MaxWeight,
                DistanceM = request.Distance is > 0 ? request.Distance : 10
            };
        }

        private static RatingResultResponse MapResult(RatingMatch match)
        {
            return new RatingResultResponse
            {
                Id = match.Id,
                ModelId = match.ModelId,
                Identification = new RatingIdentification
                {
                    ModelCode = match.ModelCode,
                    FanCode = match.FanCode,
                    CoilCode = match.CoilCode,
                    CoilGeometry = match.CoilGeometry,
                    FluidPassages = match.FluidPassages,
                    Series = match.Series,
                    Subseries = match.Subseries
                },
                Fans = new RatingFans
                {
                    Type = match.FanType,
                    FanType = match.FanDrive,
                    Brand = match.FanBrand,
                    Diameter = match.FanDiameter,
                    NoiseClass = match.NoiseClass,
                    Number = match.NumberOfFans,
                    Rpm = match.Rpm,
                    FanSpeedPercent = match.FanSpeedPercent,
                    FanSpeedRpm = match.FanSpeedRpm,
                    NumberOfModules = match.NumberOfModules,
                    Assembly = match.Assembly
                },
                Dimensions = new RatingDimensions
                {
                    Length = match.Length,
                    Height = match.Height,
                    Width = match.Width,
                    Weight = match.Weight,
                    Unit = "mm",
                    WeightUnit = "kg"
                },
                Air = new RatingAir
                {
                    DryBulb = match.DryBulb,
                    RelHumidity = match.RelHumidity,
                    Altitude = match.Altitude
                },
                Refrigerant = new RatingRefrigerant
                {
                    RefrigerantType = match.RefrigerantType,
                    Condensing = match.Condensing,
                    SubCooling = match.SubCooling,
                    ThermalCapacity = match.ThermalCapacity
                }
            };
        }

        public async Task<RatingCalculationResponse?> CalculateAsync(RatingCalculationRequest request)
        {
            var condensers = (await _condenserRepository.GetAllCondenser()).ToList();
            var search = CreateSearch(request);
            var match = _engine.CalculateRatedUnit(condensers, search, request.Id);

            if (match is null)
            {
                return null;
            }

            return new RatingCalculationResponse
            {
                Id = match.Id,
                ModelId = request.ModelId ?? match.ModelId,
                ModelCode = match.ModelCode,
                PerformanceData = new RatingPerformanceData
                {
                    Capacity = match.CalculatedCapacity,
                    CapacityUnit = "kW",
                    Mode = "Condensing",
                    Condition = "Air cooled"
                },
                AirData = new RatingAirData
                {
                    InletTemperature = match.DryBulb,
                    InletTemperatureUnit = "C",
                    InletRelativeHumidity = match.RelHumidity,
                    InletRelativeHumidityUnit = "%",
                    Altitude = match.Altitude,
                    AltitudeUnit = "m",
                    OutletTemperature = match.OutletAirC,
                    OutletTemperatureUnit = "C",
                    Flowrate = match.AirFlowM3h,
                    FlowrateUnit = "m3/h",
                    PressureDrop = match.AirPressureDropPa,
                    PressureDropUnit = "Pa"
                },
                RefrigerantData = new RatingRefrigerantData
                {
                    RefrigerantType = match.RefrigerantType,
                    Condensing = match.Condensing,
                    CondensingUnit = "C",
                    SubCooling = match.SubCooling,
                    SubCoolingUnit = "K",
                    LiquidLeaving = match.Condensing.HasValue && match.SubCooling.HasValue
                        ? Math.Round(match.Condensing.Value - match.SubCooling.Value, 1)
                        : null,
                    LiquidLeavingUnit = "C",
                    PressureDrop = match.RefrigerantPressureDropKpa,
                    PressureDropUnit = "kPa"
                },
                UnitData = new RatingUnitData
                {
                    Type = match.CondenserType,
                    Length = ToMeters(match.Length),
                    Width = ToMeters(match.Width),
                    Height = ToMeters(match.Height),
                    DimensionUnit = "m",
                    Weight = match.Weight,
                    WeightUnit = "kg",
                    InnerVolume = match.InnerVolume,
                    InnerVolumeUnit = "dm3",
                    ExchangeArea = match.ExchangeArea,
                    ExchangeAreaUnit = "m2",
                    InletConnection = match.InletConnection,
                    OutletConnection = match.OutletConnection
                },
                CoilData = new RatingCoilData
                {
                    CoilCode = match.CoilCode,
                    CoilGeometry = match.CoilGeometry,
                    FinMaterial = "Aluminum",
                    TubeMaterial = "Aluminium",
                    Passes = match.NumberOfPasses > 0 ? match.NumberOfPasses : null,
                    PassesLabel = match.FluidPassages,
                    NumberOfCoils = match.NumberOfCoils,
                    InnerVolume = match.InnerVolume,
                    InnerVolumeUnit = "dm3",
                    ExchangeArea = match.ExchangeArea,
                    ExchangeAreaUnit = "m2",
                    InletHeader = match.InletConnection,
                    OutletHeader = match.OutletConnection
                },
                NoiseData = new RatingNoiseData
                {
                    SoundPower = match.SoundPower,
                    SoundPowerUnit = "dB(A)",
                    SoundPressure = match.SoundPressure,
                    SoundPressureUnit = "dB(A)",
                    Distance = match.DistanceM,
                    DistanceUnit = "m"
                },
                VentilationData = MapVentilation(match)
            };
        }

        private static RatingVentilationData MapVentilation(RatingMatch match)
        {
            var fanCount = match.NumberOfFans > 0 ? match.NumberOfFans : Math.Max(match.FanRows * match.FansPerRow, 1);
            return new RatingVentilationData
            {
                FanName = match.FanName ?? match.FanCode,
                FanType = match.FanDrive,
                Link = match.FanLink,
                SpeedPercent = match.FanSpeedPercent,
                RpmWp = match.RpmWp,
                RpmMax = match.RpmMax,
                Diameter = match.FanDiameter,
                FanRows = match.FanRows,
                FansPerRow = match.FansPerRow,
                NumberOfFans = fanCount,
                Phases = match.Phases,
                Voltage = match.Voltage,
                Frequency = match.Frequency,
                SinglePowerWp = match.SinglePowerWp,
                SinglePowerMax = match.SinglePowerMax,
                TotalPowerWp = ScaleByFans(match.SinglePowerWp, fanCount),
                TotalPowerMax = ScaleByFans(match.SinglePowerMax, fanCount),
                SingleCurrentWp = match.SingleCurrentWp,
                SingleCurrentMax = match.SingleCurrentMax,
                TotalCurrentWp = ScaleByFans(match.SingleCurrentWp, fanCount),
                TotalCurrentMax = ScaleByFans(match.SingleCurrentMax, fanCount)
            };
        }

        private static double? ScaleByFans(double? singleValue, int fanCount)
        {
            if (!singleValue.HasValue || fanCount <= 0)
            {
                return null;
            }

            return Math.Round(singleValue.Value * fanCount, 2);
        }

        private static RatingAir MapAir(RatingSearch search)
        {
            return new RatingAir
            {
                DryBulb = search.DryBulbC,
                RelHumidity = search.RelHumidity,
                Altitude = search.AltitudeM
            };
        }

        private static RatingRefrigerant MapRefrigerant(RatingSearch search)
        {
            return new RatingRefrigerant
            {
                RefrigerantType = search.RefrigerantType,
                Condensing = search.CondensingC,
                SubCooling = search.SubCoolingK,
                ThermalCapacity = search.ThermalCapacityKw
            };
        }

        private static RatingFanSpeed MapFanSpeed(RatingSearch search)
        {
            var isPercent = IsPercentUnit(search.FanSpeedUnit);
            return new RatingFanSpeed
            {
                Value = search.FanSpeedValue,
                Unit = isPercent ? "%" : "rpm",
                Percent = isPercent ? search.FanSpeedValue : null,
                Rpm = isPercent ? null : search.FanSpeedValue
            };
        }

        private static (double Value, string Unit) NormalizeFanSpeed(MeasuredValue? measured)
        {
            var isPercent = IsPercentUnit(measured?.Unit);
            if (measured?.Value is null)
            {
                return (100, "%");
            }

            return (measured.Value.Value, isPercent ? "%" : "rpm");
        }

        private static bool IsPercentUnit(string? unit) =>
            string.IsNullOrWhiteSpace(unit)
            || unit.Trim().Equals("%", StringComparison.OrdinalIgnoreCase)
            || unit.Trim().Equals("percent", StringComparison.OrdinalIgnoreCase)
            || unit.Trim().Equals("pct", StringComparison.OrdinalIgnoreCase);

        private static string? NormalizeAll(string? value)
        {
            if (string.IsNullOrWhiteSpace(value) || value.Equals("All", StringComparison.OrdinalIgnoreCase))
            {
                return "All";
            }

            return value.Trim();
        }

        private static string? NormalizeRefrigerant(string? value)
        {
            if (string.IsNullOrWhiteSpace(value) || value.Equals("All", StringComparison.OrdinalIgnoreCase))
            {
                return null;
            }

            return value.Trim();
        }

        private static double? ToMeters(double millimeters)
        {
            if (millimeters <= 0)
            {
                return null;
            }

            return Math.Round(millimeters / 1000.0, 3);
        }
    }
}
