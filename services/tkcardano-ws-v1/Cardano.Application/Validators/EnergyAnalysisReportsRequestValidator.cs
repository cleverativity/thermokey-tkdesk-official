using Cardano.Application.DTOs.Requests;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cardano.Application.Validators
{
    public class EnergyAnalysisReportsRequestValidator : AbstractValidator<EAnalysisReportsRequest>
    {
        public EnergyAnalysisReportsRequestValidator()
        {
            RuleFor(x => x.EAnalysisRequest)
                .NotNull()
                .WithMessage("EAnalysisRequest is required.")
                 .DependentRules(() =>
                 {
                     RuleFor(x => x.EAnalysisRequest!)
                         .SetValidator(new EnergyAnalysisRequestValidator());
                 });


            RuleFor(e => e.LanguageCode)
              .NotEmpty().WithMessage("LanguageCode is required.");
        }
    }
}
