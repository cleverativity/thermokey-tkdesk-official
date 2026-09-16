using Cardano.Application.DTOs.Requests;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cardano.Application.Validators
{
    public class PerformanceReportsRequestValidator : AbstractValidator<PerformanceReportsRequest>
    {
        public PerformanceReportsRequestValidator()
        {
            RuleFor(x => x.PerfRequest)
                .NotNull()
                .WithMessage("PerfRequest is required.")
                 .DependentRules(() =>
                 {
                     RuleFor(x => x.PerfRequest!)
                         .SetValidator(new PerformanceRequestValidator());
                 });

            RuleFor(x => x.AccessPriceRequest)
                .NotNull()
                .WithMessage("PerfRequest is required.")
                 .DependentRules(() =>
                 {
                     RuleFor(x => x.AccessPriceRequest!)
                         .SetValidator(new AccessoriesSelectedRequestValidator());
                 });

            RuleFor(e => e.LanguageCode)
              .NotEmpty().WithMessage("LanguageCode is required.");
        }
    }
}
