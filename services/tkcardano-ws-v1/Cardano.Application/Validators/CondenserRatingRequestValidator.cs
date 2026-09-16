using Cardano.Application.DTOs.Requests;
using FluentValidation;

namespace Cardano.Application.Validators
{
    public class CondenserRatingRequestValidator : AbstractValidator<CondenserRatingRequest>
    {
        public CondenserRatingRequestValidator()
        {
            RuleFor(e => e.CondenserModel)
                .NotEmpty().WithMessage("Condenser model is required.")
                .MaximumLength(100).WithMessage("Condenser model cannot exceed 100 characters.");

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

            RuleFor(e => e.RefrigerantType)
                .NotEmpty().WithMessage("Refrigerant type is required.")
                .MaximumLength(50).WithMessage("Refrigerant type cannot exceed 50 characters.");

            RuleFor(e => e.AtmosphericPress)
                .NotNull().WithMessage("Atmospheric pressure is required.");

            RuleFor(e => e.Distance)
                .NotNull().WithMessage("Distance is required.")
                .GreaterThan(0).WithMessage("Distance must be greater than 0.");

            RuleFor(e => e.Compressor)
                .NotNull().WithMessage("Compressor value is required.");

            RuleFor(e => e.SubCooling)
                .NotNull().WithMessage("Sub-cooling value is required.");

            RuleFor(e => e.DryBulb)
                .NotNull().WithMessage("Dry bulb temperature is required.");

            RuleFor(e => e.RelHumidity)
                .InclusiveBetween(0, 100).WithMessage("Relative humidity must be between 0 and 100.");
        }
    }
}
