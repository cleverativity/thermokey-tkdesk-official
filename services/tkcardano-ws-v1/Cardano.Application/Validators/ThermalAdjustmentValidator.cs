using Cardano.Application.DTOs.Requests;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cardano.Application.Validators
{
    public class ThermalAdjustmentValidator : AbstractValidator<ThermalAdjustmentRequest>
    {
        public ThermalAdjustmentValidator()
        {

            RuleFor(e => e.ModelId)
               .GreaterThan(0)
               .WithMessage("Id must be greater than 0.");

            RuleFor(e => e.RemoteModel)
                .NotEmpty().WithMessage("RemoteModel is required.");

            RuleFor(x => x.RefrigerantType)
               .NotEmpty().WithMessage("RefrigerantType is required.");

            RuleFor(x => x.UnitsType)
                .NotEmpty().WithMessage("UnitsType is required.");

            RuleFor(x => x.Condensing)
                .NotNull().WithMessage("Condensing is required.");

            RuleFor(x => x.PercentAdjustment)
                .NotNull().WithMessage("PercentAdjustment is required.");
               
            RuleFor(x => x.Compressor)
               .NotNull().WithMessage("Compressor is required.");

            RuleFor(x => x.SubCooling)
               .NotNull().WithMessage("Compressor is required.");

            RuleFor(x => x.DryBulb)
               .NotNull().WithMessage("Compressor is required.");

            RuleFor(x => x.AtmosphericPress)
               .NotNull().WithMessage("Compressor is required.");

        }
    }
}
