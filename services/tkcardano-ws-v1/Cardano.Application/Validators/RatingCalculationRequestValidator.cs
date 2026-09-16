using Cardano.Application.DTOs.Requests;
using FluentValidation;

namespace Cardano.Application.Validators
{
    public class RatingCalculationRequestValidator : AbstractValidator<RatingCalculationRequest>
    {
        public RatingCalculationRequestValidator()
        {
            Include(new RatingRequestValidator());

            RuleFor(x => x.Id)
                .GreaterThan(0)
                .WithMessage("Id of the selected machine is required.");

            RuleFor(x => x.DryBulb)
                .NotNull()
                .WithMessage("Dry bulb is required.");

            RuleFor(x => x.Condensing)
                .NotNull()
                .WithMessage("Condensing is required.");

            RuleFor(x => x.RefrigerantType)
                .NotEmpty()
                .WithMessage("Refrigerant type is required.");
        }
    }
}
