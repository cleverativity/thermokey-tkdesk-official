using Cardano.Application.Common;
using Cardano.Application.Common.Utilities;
using Cardano.Application.DTOs.Requests;
using FluentValidation;

namespace Cardano.Application.Validators
{
    public class RatingRequestValidator : AbstractValidator<RatingRequest>
    {
        private static readonly string[] AllowedSubseries =
            ["All", "HLL", "HUU", "HNU", "HTN", "HTT", "HTX"];
        private static readonly string[] AllowedAssembly = ["All", "Single", "Assembled"];
        private static readonly string[] AllowedFanBrand =
        [
            "All",
            "EbmPapst",
            "EBM Papst",
            "EBM",
            "Ziehl-Abegg",
            "ZiehlAbegg",
            "Ziehl Abegg",
            "Ziehl",
            "VIP",
            "VIP (AC e AC ATEX)",
            "VIP (EC)",
            "CiEsse",
            "CiEsse Ventilatori"
        ];
        private static readonly string[] AllowedNoiseClass =
        [
            "All",
            "Low",
            "High",
            "Quiet",
            "Residential",
            "H",
            "L",
            "Q",
            "R"
        ];
        private static readonly string[] AllowedFluidPassages =
        [
            "All",
            "Single",
            "Double",
            "Quad",
            "1",
            "2",
            "4"
        ];
        private static readonly string[] AllowedCoilGeometry =
            ["All", .. CoilGeometryCatalog.Values];
        private static readonly string[] FanSpeedUnits = ["%", "percent", "pct", "rpm"];
        private static readonly string[] DryCoolerFluids =
        [
            "Water",
            "Ethylene Glycol",
            "Propylene Glycol",
            "EthyleneGlycol",
            "PropyleneGlycol"
        ];

        public RatingRequestValidator()
        {
            RuleFor(x => x.Series)
                .MaximumLength(50)
                .When(x => !string.IsNullOrWhiteSpace(x.Series));

            RuleFor(x => x.Subseries)
                .Must(value => IsAllowed(value, AllowedSubseries))
                .WithMessage("Subseries must be All, HLL, HUU, HNU, HTN, HTT, or HTX.")
                .When(x => !string.IsNullOrWhiteSpace(x.Subseries));

            RuleFor(x => x.Assembly)
                .Must(value => IsAllowed(value, AllowedAssembly))
                .WithMessage("Assembly must be All, Single, or Assembled.")
                .When(x => !string.IsNullOrWhiteSpace(x.Assembly));

            RuleFor(x => x.NumberOfModules)
                .InclusiveBetween(1, 3)
                .When(x => x.NumberOfModules.HasValue);

            RuleFor(x => x.NumberOfFans)
                .GreaterThan(0)
                .When(x => x.NumberOfFans.HasValue);

            RuleFor(x => x.FansConnection)
                .Must(FansConnectionMapper.IsAllowed)
                .WithMessage("Fans connection is not supported. Use GET /FanConnections.")
                .When(x => !string.IsNullOrWhiteSpace(x.FansConnection));

            RuleFor(x => x.FanBrand)
                .Must(value => IsAllowed(value, AllowedFanBrand))
                .WithMessage("Fan brand is not supported.")
                .When(x => !string.IsNullOrWhiteSpace(x.FanBrand));

            RuleFor(x => x.FanDiameter)
                .GreaterThan(0)
                .When(x => x.FanDiameter.HasValue);

            RuleFor(x => x.FanSpeed!.Unit)
                .Must(value => IsAllowed(value, FanSpeedUnits))
                .WithMessage("Fan speed unit must be % or rpm.")
                .When(x => x.FanSpeed != null && !string.IsNullOrWhiteSpace(x.FanSpeed.Unit));

            RuleFor(x => x.FanSpeed!.Value)
                .InclusiveBetween(0, 100)
                .WithMessage("Fan speed percent must be between 0 and 100.")
                .When(x => x.FanSpeed?.Value is not null && IsPercentUnit(x.FanSpeed.Unit));

            RuleFor(x => x.FanSpeed!.Value)
                .GreaterThan(0)
                .WithMessage("Fan speed rpm must be greater than 0.")
                .When(x => x.FanSpeed?.Value is not null && !IsPercentUnit(x.FanSpeed.Unit));

            RuleFor(x => x.NoiseClass)
                .Must(value => IsAllowed(value, AllowedNoiseClass))
                .WithMessage("Noise class must be All, Low, High, Quiet, or Residential.")
                .When(x => !string.IsNullOrWhiteSpace(x.NoiseClass));

            RuleFor(x => x.FluidPassages)
                .Must(value => IsAllowed(value, AllowedFluidPassages))
                .WithMessage("Fluid passages must be All, Single, Double, or Quad.")
                .When(x => !string.IsNullOrWhiteSpace(x.FluidPassages));

            RuleFor(x => x.CoilGeometry)
                .Must(value => IsAllowed(value, AllowedCoilGeometry))
                .WithMessage("Coil geometry must be All, TkMicro25, or TkMicro32.")
                .When(x => !string.IsNullOrWhiteSpace(x.CoilGeometry));

            RuleFor(x => x.RelHumidity)
                .InclusiveBetween(0, 100)
                .When(x => x.RelHumidity.HasValue);

            RuleFor(x => x.Distance)
                .GreaterThan(0)
                .WithMessage("Distance must be greater than 0.")
                .When(x => x.Distance.HasValue);

            RuleFor(x => x.RefrigerantType)
                .MaximumLength(50)
                .Must(value => !IsDryCoolerFluid(value))
                .WithMessage("Refrigerant type cannot be Water or glycol. Use GET /RefTypes.")
                .When(x => !string.IsNullOrWhiteSpace(x.RefrigerantType));

            RuleFor(x => x.SubCooling)
                .GreaterThanOrEqualTo(0)
                .When(x => x.SubCooling.HasValue);

            RuleFor(x => x.ThermalCapacity)
                .GreaterThan(0)
                .When(x => x.ThermalCapacity.HasValue);

            RuleFor(x => x.MaxLength)
                .GreaterThan(0)
                .When(x => x.MaxLength.HasValue);

            RuleFor(x => x.MaxHeight)
                .GreaterThan(0)
                .When(x => x.MaxHeight.HasValue);

            RuleFor(x => x.MaxWidth)
                .GreaterThan(0)
                .When(x => x.MaxWidth.HasValue);

            RuleFor(x => x.MaxWeight)
                .GreaterThan(0)
                .When(x => x.MaxWeight.HasValue);
        }

        private static bool IsAllowed(string? value, string[] allowed) =>
            string.IsNullOrWhiteSpace(value)
            || allowed.Contains(value.Trim(), StringComparer.OrdinalIgnoreCase);

        private static bool IsDryCoolerFluid(string? value) =>
            !string.IsNullOrWhiteSpace(value)
            && DryCoolerFluids.Contains(value.Trim(), StringComparer.OrdinalIgnoreCase);

        private static bool IsPercentUnit(string? unit) =>
            string.IsNullOrWhiteSpace(unit)
            || unit.Trim().Equals("%", StringComparison.OrdinalIgnoreCase)
            || unit.Trim().Equals("percent", StringComparison.OrdinalIgnoreCase)
            || unit.Trim().Equals("pct", StringComparison.OrdinalIgnoreCase);
    }
}
