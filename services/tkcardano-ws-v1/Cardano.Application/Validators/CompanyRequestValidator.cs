using Cardano.Application.DTOs.Requests;
using FluentValidation;

namespace Cardano.Application.Validators
{
    public class CompanyRequestValidator : AbstractValidator<CompanyRequest>
    {
        public CompanyRequestValidator()
        {
            RuleFor(e => e.company)
                .NotEmpty().WithMessage("Company name is required.")
                .MaximumLength(100).WithMessage("Company name cannot exceed 100 characters.");

            RuleFor(e => e.attention_of)
                .NotEmpty().WithMessage("Attention is required.")
                .MaximumLength(100).WithMessage("Attention cannot exceed 100 characters.");

            RuleFor(e => e.city)
                .NotEmpty().WithMessage("City is required.")
                .MaximumLength(100).WithMessage("City cannot exceed 100 characters.");

            RuleFor(e => e.telephone)
                .NotEmpty().WithMessage("Telephone is required.")
                .MaximumLength(20).WithMessage("Telephone cannot exceed 20 characters.");

            RuleFor(e => e.fax)
                 .NotEmpty().WithMessage("Fax is required.")
                .MaximumLength(20).WithMessage("Fax cannot exceed 20 characters.");

            RuleFor(e => e.AppDate)
                .NotEmpty().WithMessage("Application date is required.")
                .Must(d => d.HasValue && d.Value > System.DateTime.MinValue).WithMessage("Application date is required.");

            RuleFor(e => e.software_version)
                 .NotEmpty().WithMessage("Software version is required.")
                .MaximumLength(50).WithMessage("Software version cannot exceed 50 characters.");

            RuleFor(e => e.offer_no)
                 .NotEmpty().WithMessage("Offer is required.")
                .MaximumLength(50).WithMessage("Offer number cannot exceed 50 characters.");

            RuleFor(e => e.reference)
                 .NotEmpty().WithMessage("Reference is required.")
                .MaximumLength(200).WithMessage("Reference cannot exceed 200 characters.");
        }
    }
}
