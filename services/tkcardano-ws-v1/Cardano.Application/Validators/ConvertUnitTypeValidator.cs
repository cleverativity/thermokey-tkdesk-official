using Cardano.Application.DTOs.Requests;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cardano.Application.Validators
{
    public class ConvertUnitTypeValidator : AbstractValidator<ConvertUnitypeRequest>
    {
        public ConvertUnitTypeValidator()
        {
            RuleFor(e => e.UnitTypes)
         .NotEmpty().WithMessage("UnitTypes is required.");
            
            RuleFor(e => e.Capacity)
        .NotNull().WithMessage("Capacity is required.");

            RuleFor(e => e.Altitude)
        .NotNull().WithMessage("Altitude is required.");

            RuleFor(e => e.Drybulb)
        .NotNull().WithMessage("Drybulb is required.");

            RuleFor(e => e.Compressor)
        .NotNull().WithMessage("Compressor is required.");
             
            RuleFor(e => e.Condensing)
        .NotNull().WithMessage("Condensing is required.");

            RuleFor(e => e.SubCooling)
        .NotNull().WithMessage("SubCooling is required.");

            RuleFor(e => e.Distance)
        .NotNull().WithMessage("Distance is required.");

            RuleFor(e => e.Relhumidity)
        .NotNull().WithMessage("Relhumidity is required.");

        }
    }
}