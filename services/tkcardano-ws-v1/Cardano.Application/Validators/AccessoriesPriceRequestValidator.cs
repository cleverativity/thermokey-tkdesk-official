using Cardano.Application.DTOs.Requests;
using FluentValidation;
using FluentValidation.Validators;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cardano.Application.Validators
{
    public class AccessoriesPriceRequestValidator : AbstractValidator<AccessoriesSelectedRequest>
    {
        public AccessoriesPriceRequestValidator() 
        {
            RuleFor(e => e.Id)
               .GreaterThan(0)
               .WithMessage("Id must be greater than 0.");

            RuleFor(e => e.RemoteModel)
                .NotEmpty().WithMessage("RemoteModel is required.");

            RuleFor(e => e.RefRigerantType)
                .NotEmpty().WithMessage("RefRigerantType is required.");

            RuleFor(e => e.AirFlowDirection)
                .NotEmpty().WithMessage("AirFlowDirection is required.");

            RuleFor(e => e.AccessoriesDiscount)
                 .NotNull().WithMessage("AccessoriesDiscount is required.")
                 .InclusiveBetween(0, double.MaxValue).WithMessage("AccessoriesDiscount must be 0 or greater.");

            RuleFor(e => e.UnitDiscount)
                .NotNull().WithMessage("UnitDiscount is required.")
                .InclusiveBetween(0, 100).WithMessage("UnitDiscount must be between 0 and 100.");

            RuleFor(e => e.SelectedItems)
                .NotNull().WithMessage("SelectedItems is required.");

            RuleFor(e => e.FansConnection)
                .NotEmpty().WithMessage("FansConnection is required.");

        }
    }
}
