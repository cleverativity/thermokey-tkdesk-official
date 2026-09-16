using Cardano.Application.DTOs.Requests;
using FluentValidation;

namespace Cardano.Application.Validators
{
    public class CreateStepsRequestValidator : AbstractValidator<CreateStepsRequest>
    {
        public CreateStepsRequestValidator()
        {

            RuleFor(e => e.Data)
                .NotEmpty().WithMessage("Data cannot be empty string or zero if provided.");

            RuleFor(e => e.Status)
                .NotEmpty().WithMessage("Status is required.");

            RuleFor(x => x.User_id)
              .GreaterThan(0)
              .WithMessage("User_id must be greater than 0 and cannot be zero.");

            RuleFor(x => x.Selection_id)
                .GreaterThan(0)
                .WithMessage("Selection_id must be greater than 0 and cannot be zero.");


            RuleFor(x => x.Macro_serie)
                .MaximumLength(100)
                .When(x => !string.IsNullOrWhiteSpace(x.Macro_serie))
                .WithMessage("MacroSerie cannot exceed 100 characters.");
        }
    }
}