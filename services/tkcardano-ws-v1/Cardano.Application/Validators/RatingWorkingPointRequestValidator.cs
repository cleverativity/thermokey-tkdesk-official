using Cardano.Application.DTOs.Requests;
using FluentValidation;

namespace Cardano.Application.Validators
{
    public class RatingWorkingPointRequestValidator : AbstractValidator<RatingWorkingPointRequest>
    {
        private static readonly string[] AllowedModes = ["FixedSpeed", "FixedCapacity"];
        private static readonly string[] DryCoolerFluids =
        [
            "Water",
            "Ethylene Glycol",
            "Propylene Glycol",
            "EthyleneGlycol",
            "PropyleneGlycol"
        ];

        public RatingWorkingPointRequestValidator()
        {
            RuleFor(x => x.Id)
                .GreaterThan(0)
                .WithMessage("Id of the selected machine is required.");

            RuleFor(x => x.Model)
                .NotEmpty()
                .WithMessage("Condenser model is required.");

            RuleFor(x => x.Mode)
                .Must(value => IsAllowedMode(value))
                .WithMessage("Mode must be FixedSpeed or FixedCapacity.")
                .When(x => !string.IsNullOrWhiteSpace(x.Mode));

            RuleFor(x => x.RefrigerantType)
                .NotEmpty()
                .WithMessage("Refrigerant type is required.")
                .Must(value => !IsDryCoolerFluid(value))
                .WithMessage("Refrigerant type cannot be Water or glycol. Use GET /RefTypes.");

            RuleFor(x => x.Condensing)
                .NotNull()
                .WithMessage("Condensing is required.");

            RuleFor(x => x.InitialInletAir)
                .NotNull()
                .WithMessage("Initial inlet air temperature is required.");

            RuleFor(x => x.FinalInletAir)
                .NotNull()
                .WithMessage("Final inlet air temperature is required.");

            RuleFor(x => x.TemperatureStep)
                .GreaterThan(0)
                .WithMessage("Temperature step must be greater than 0.")
                .When(x => x.TemperatureStep.HasValue);

            RuleFor(x => x)
                .Must(x => x.InitialInletAir < x.Condensing && x.FinalInletAir < x.Condensing)
                .WithMessage("Inlet air temperatures must be below condensing so ITD stays greater than 0.")
                .When(x => x.InitialInletAir.HasValue && x.FinalInletAir.HasValue && x.Condensing.HasValue);

            RuleFor(x => x.RelHumidity)
                .InclusiveBetween(0, 100)
                .When(x => x.RelHumidity.HasValue);

            RuleFor(x => x.Distance)
                .GreaterThan(0)
                .WithMessage("Distance must be greater than 0.")
                .When(x => x.Distance.HasValue);

            RuleFor(x => x.SubCooling)
                .GreaterThanOrEqualTo(0)
                .When(x => x.SubCooling.HasValue);

            RuleFor(x => x.ThermalCapacity)
                .NotNull()
                .GreaterThan(0)
                .WithMessage("Thermal capacity is required for FixedCapacity mode.")
                .When(x => IsFixedCapacity(x.Mode));

            RuleFor(x => x.FanSpeed!.Value)
                .GreaterThan(0)
                .When(x => x.FanSpeed?.Value is not null);

            RuleFor(x => x.FanSpeed!.Unit)
                .Must(IsPercentOrRpmUnit)
                .When(x => !string.IsNullOrWhiteSpace(x.FanSpeed?.Unit));
        }

        private static bool IsAllowedMode(string? value) =>
            string.IsNullOrWhiteSpace(value)
            || AllowedModes.Contains(NormalizeMode(value), StringComparer.OrdinalIgnoreCase);

        public static string NormalizeMode(string? value)
        {
            var compact = (value ?? string.Empty).Replace(" ", "", StringComparison.OrdinalIgnoreCase);
            if (compact.Equals("FixedCapacity", StringComparison.OrdinalIgnoreCase))
            {
                return "FixedCapacity";
            }

            return "FixedSpeed";
        }

        private static bool IsFixedCapacity(string? value) =>
            NormalizeMode(value) == "FixedCapacity";

        private static bool IsDryCoolerFluid(string? value) =>
            !string.IsNullOrWhiteSpace(value)
            && DryCoolerFluids.Contains(value.Trim(), StringComparer.OrdinalIgnoreCase);

        private static bool IsPercentOrRpmUnit(string? unit) =>
            string.IsNullOrWhiteSpace(unit)
            || unit.Trim().Equals("%", StringComparison.OrdinalIgnoreCase)
            || unit.Trim().Equals("percent", StringComparison.OrdinalIgnoreCase)
            || unit.Trim().Equals("pct", StringComparison.OrdinalIgnoreCase)
            || unit.Trim().Equals("rpm", StringComparison.OrdinalIgnoreCase);
    }
}
