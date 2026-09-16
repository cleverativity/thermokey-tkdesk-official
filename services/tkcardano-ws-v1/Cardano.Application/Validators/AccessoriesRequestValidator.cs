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
    public class AccessoriesRequestValidator: AbstractValidator<AccessoriesRequest>
    {
        public AccessoriesRequestValidator() 
        {
            RuleFor(e => e.Id)
                .GreaterThan(0)
                .WithMessage("Id must be greater than 0.");

            RuleFor(e => e.RemoteModel)
                .NotEmpty().WithMessage("RemoteModel is required.");
               
        }
    }
}
