using Cardano.Application.Common.Utilities;
using Cardano.Application.DTOs.Requests;
using FluentValidation;

namespace Cardano.Application.Validators
{
    public class RemoteCondenserRequestValidator : AbstractValidator<RemoteCondenserRequest>
    {
        public RemoteCondenserRequestValidator()
        {
            RuleFor(e => e.CondenserType)
                .NotEmpty().WithMessage("Condenser type is required.")
                .MaximumLength(100).WithMessage("Condenser type cannot exceed 100 characters.");

            RuleFor(e => e.FansConnection)
                .NotEmpty().WithMessage("Fans connection is required.")
                .MaximumLength(50).WithMessage("Fans connection cannot exceed 50 characters.");

            RuleFor(e => e.AirFlowDirection)
                .NotEmpty().WithMessage("Air flow direction is required.")
                .MaximumLength(50).WithMessage("Air flow direction cannot exceed 50 characters.");

            RuleFor(e => e.UnitsType)
                .NotEmpty().WithMessage("Units type is required.")
                .MaximumLength(50).WithMessage("Units type cannot exceed 50 characters.");

            RuleFor(e => e.Condensing)
                .NotNull().WithMessage("Condensing value is required.");

            RuleFor(e => e.CondensingReference)
                .Must(CondensingReferenceConverter.IsAllowed)
                .WithMessage("Condensing reference must be ave, dew, or bubble.");

            RuleFor(e => e.RefrigerantType)
                .NotEmpty().WithMessage("Refrigerant type is required.")
                .MaximumLength(50).WithMessage("Refrigerant type cannot exceed 50 characters.");

            RuleFor(e => e.AtmosphericPress)
                .NotNull().WithMessage("Atmospheric pressure is required.");

            RuleFor(e => e.MaxSoundPressure)
                .NotNull().WithMessage("Max sound pressure is required.");

            RuleFor(e => e.MaxSoundPower)
                .GreaterThanOrEqualTo(0)
                .WithMessage("Max sound power cannot be negative.");

            RuleFor(e => e.NoiseTolerance)
                .GreaterThanOrEqualTo(0)
                .WithMessage("Noise tolerance cannot be negative.");

            RuleFor(e => e.Distance)
                .NotNull().WithMessage("Distance is required.");

            RuleFor(e => e.ThermalCapacity)
                .NotNull().WithMessage("Thermal capacity is required.");

            RuleFor(e => e.ToleranceMin)
                .NotNull().WithMessage("Tolerance min and max must both be provided.")
                .When(e => e.ToleranceMin.HasValue || e.ToleranceMax.HasValue);

            RuleFor(e => e.ToleranceMax)
                .NotNull().WithMessage("Tolerance min and max must both be provided.")
                .When(e => e.ToleranceMin.HasValue || e.ToleranceMax.HasValue);

            RuleFor(e => e)
                .Must(e => !e.ToleranceMin.HasValue || !e.ToleranceMax.HasValue || e.ToleranceMin <= e.ToleranceMax)
                .WithMessage("Tolerance min cannot be greater than tolerance max.")
                .When(e => e.ToleranceMin.HasValue && e.ToleranceMax.HasValue);

            RuleFor(e => e.Compressor)
                .NotNull().WithMessage("Compressor value is required.");

            RuleFor(e => e.SubCooling)
                .NotNull().WithMessage("Sub-cooling value is required.");

            RuleFor(e => e.DryBulb)
                .NotNull().WithMessage("Dry bulb temperature is required.");

            RuleFor(e => e.MaxLength)
                .GreaterThan(0)
                .When(e => e.MaxLength.HasValue);

            RuleFor(e => e.MaxHeight)
                .GreaterThan(0)
                .When(e => e.MaxHeight.HasValue);

            RuleFor(e => e.MaxWidth)
                .GreaterThan(0)
                .When(e => e.MaxWidth.HasValue);

            RuleFor(e => e.Esp)
                .GreaterThanOrEqualTo(0)
                .WithMessage("ESP cannot be negative.");
        }
    }
}
