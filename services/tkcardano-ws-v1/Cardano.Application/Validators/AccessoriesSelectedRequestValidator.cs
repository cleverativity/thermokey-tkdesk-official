using Cardano.Application.DTOs.Requests;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cardano.Application.Validators
{
    public class AccessoriesSelectedRequestValidator : AbstractValidator<AccessoriesSelectedRequest>
    {
        public AccessoriesSelectedRequestValidator() {

            RuleFor(e => e.Id)
                .NotNull().WithMessage("Id is required.")
                .GreaterThan(0).WithMessage("CondenserId must be greater than 0.");

            RuleFor(e => e.RemoteModel)
                .NotEmpty().WithMessage("RemoteModel is required.");

            RuleFor(e => e.RefRigerantType)
                .NotNull().WithMessage("RefRigerantType is required.");

            RuleFor(e => e.AirFlowDirection)
                .NotNull().WithMessage("AirFlowDirection is required.");

            RuleFor(e => e.AccessoriesDiscount)
                .NotNull().WithMessage("AccessoriesDiscount is required.");

            RuleFor(e => e.UnitDiscount)
                  .NotNull().WithMessage("UnitDiscount is required.");
         
            RuleFor(e => e.SelectedItems)
                  .NotNull().WithMessage("SelectedItems is required.");

            RuleFor(e => e.FansConnection)
                  .NotNull().WithMessage("FansConnection is required.");

        }
    }
}
