using Cardano.Application.Common.Utilities;
using Cardano.Application.DTOs.Requests;
using Cardano.Application.DTOs.Responses;
using Cardano.Application.Interfaces.Computation;
using Cardano.Application.Interfaces.Services;
using Cardano.Domain.Interfaces;
using Cardano.Domain.Models;

namespace Cardano.Application.Services
{
    public class WorkingPointService : IWorkingPointService
    {
        private readonly ICondenserRepository _condenserRepository;
        private readonly IThermalComputationEngine _engine;

        public WorkingPointService(ICondenserRepository condenserRepository, IThermalComputationEngine engine)
        {
            _condenserRepository = condenserRepository;
            _engine = engine;
        }

        public async Task<RatingWorkingPointResponse?> CalculateAsync(RatingWorkingPointRequest request)
        {
            var condensers = (await _condenserRepository.GetAllCondenser()).ToList();
            var search = CreateSearch(request);
            var probe = _engine.CalculateRatedUnit(condensers, search, request.Id);
            if (probe is null)
            {
                return null;
            }

            var mode = NormalizeMode(request.Mode);
            var isFixedCapacity = mode == "FixedCapacity";
            var targetCapacity = request.ThermalCapacity;
            var step = request.TemperatureStep is > 0 ? request.TemperatureStep.Value : 1;
            var temperatures = BuildAirSweep(
                request.InitialInletAir!.Value,
                request.FinalInletAir!.Value,
                step,
                request.Condensing!.Value);

            var rows = new List<RatingWorkingPointRow>();
            foreach (var inletAir in temperatures)
            {
                search.DryBulbC = inletAir;
                if (isFixedCapacity && targetCapacity is > 0)
                {
                    search.FanSpeedValue = 100;
                    search.FanSpeedUnit = "%";
                    var atFullSpeed = _engine.CalculateRatedUnit(condensers, search, request.Id);
                    if (atFullSpeed?.CalculatedCapacity is > 0)
                    {
                        var percent = 100.0 * targetCapacity.Value / atFullSpeed.CalculatedCapacity.Value;
                        search.FanSpeedValue = Math.Round(Math.Clamp(percent, 1, 100), 1);
                    }
                }

                var match = _engine.CalculateRatedUnit(condensers, search, request.Id);
                if (match is not null)
                {
                    rows.Add(MapRow(match));
                }
            }

            return new RatingWorkingPointResponse
            {
                Id = probe.Id,
                ModelId = request.ModelId ?? probe.ModelId,
                ModelCode = request.Model ?? probe.ModelCode,
                Mode = mode,
                RefrigerantType = probe.RefrigerantType,
                Condensing = request.Condensing,
                SubCooling = probe.SubCooling,
                RelHumidity = probe.RelHumidity,
                Distance = probe.DistanceM ?? 10,
                Results = rows
            };
        }

        private static RatingSearch CreateSearch(RatingWorkingPointRequest request)
        {
            var fan = ResolveFanFromModel(request.Model);
            var fanSpeed = NormalizeFanSpeed(request.FanSpeed);

            return new RatingSearch
            {
                FanType = fan.FanType,
                FanBrand = fan.FanBrand,
                FanSpeedValue = fanSpeed.Value,
                FanSpeedUnit = fanSpeed.Unit,
                DryBulbC = request.InitialInletAir,
                RelHumidity = request.RelHumidity,
                AltitudeM = request.Altitude,
                RefrigerantType = NormalizeRefrigerant(request.RefrigerantType),
                CondensingC = request.Condensing,
                SubCoolingK = request.SubCooling,
                ThermalCapacityKw = request.ThermalCapacity,
                DistanceM = request.Distance is > 0 ? request.Distance : 10
            };
        }

        private static (string FanType, string? FanBrand) ResolveFanFromModel(string? model)
        {
            if (string.IsNullOrWhiteSpace(model))
            {
                return ("AC", null);
            }

            var trimmed = model.Trim();
            if (trimmed.EndsWith("B2", StringComparison.OrdinalIgnoreCase))
            {
                return ("EC", "Ziehl-Abegg");
            }

            if (trimmed.EndsWith("B1", StringComparison.OrdinalIgnoreCase))
            {
                return ("EC", "EBM Papst");
            }

            return ("AC", null);
        }

        private static RatingWorkingPointRow MapRow(RatingMatch match)
        {
            var fanCount = match.NumberOfFans > 0 ? match.NumberOfFans : Math.Max(match.FanRows * match.FansPerRow, 1);
            return new RatingWorkingPointRow
            {
                InletAirTemp = match.DryBulb,
                InletRelativeHumidity = match.RelHumidity,
                Condensing = match.Condensing,
                Capacity = match.CalculatedCapacity,
                RefrigerantPressureDrop = match.RefrigerantPressureDropKpa,
                AirFlow = match.AirFlowM3h,
                OutletAirTemp = match.OutletAirC,
                AirPressureDrop = match.AirPressureDropPa,
                FanSpeedRpm = match.RpmWp ?? match.FanSpeedRpm,
                FanSpeedPercent = match.FanSpeedPercent,
                TotalPower = ScaleByFans(match.SinglePowerWp, fanCount),
                TotalCurrent = ScaleByFans(match.SingleCurrentWp, fanCount),
                SoundPower = match.SoundPower,
                SoundPressure = match.SoundPressure
            };
        }

        private static List<double> BuildAirSweep(double initial, double final, double step, double condensing)
        {
            const int maxPoints = 51;
            var points = new List<double>();
            var ascending = final >= initial;
            var current = initial;
            var guard = 0;

            while (guard < maxPoints)
            {
                var rounded = Math.Round(current, 1);
                var pastEnd = ascending
                    ? rounded > final + 0.0001
                    : rounded < final - 0.0001;

                if (pastEnd)
                {
                    break;
                }

                if (rounded < condensing && (points.Count == 0 || Math.Abs(points[^1] - rounded) > 0.0001))
                {
                    points.Add(rounded);
                }

                if (ascending && current >= final - 0.0001)
                {
                    break;
                }

                if (!ascending && current <= final + 0.0001)
                {
                    break;
                }

                current = ascending ? current + step : current - step;
                guard++;
            }

            var end = Math.Round(final, 1);
            if (end < condensing && (points.Count == 0 || Math.Abs(points[^1] - end) > 0.0001))
            {
                points.Add(end);
            }

            return points;
        }

        private static string NormalizeMode(string? value)
        {
            var compact = (value ?? string.Empty).Replace(" ", "", StringComparison.OrdinalIgnoreCase);
            if (compact.Equals("FixedCapacity", StringComparison.OrdinalIgnoreCase))
            {
                return "FixedCapacity";
            }

            return "FixedSpeed";
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

        private static string? NormalizeRefrigerant(string? value)
        {
            if (string.IsNullOrWhiteSpace(value) || value.Equals("All", StringComparison.OrdinalIgnoreCase))
            {
                return null;
            }

            return RefrigerantTypeNormalizer.ToEngine(value.Trim());
        }

        private static double? ScaleByFans(double? singleValue, int fanCount)
        {
            if (!singleValue.HasValue || fanCount <= 0)
            {
                return null;
            }

            return Math.Round(singleValue.Value * fanCount, 2);
        }
    }
}
