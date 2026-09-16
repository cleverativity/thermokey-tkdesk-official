using Cardano.Application.DTOs.Requests;
using Cardano.Application.Interfaces.Repositories;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Cardano_API.Controllers
{
    [ApiController]
    public class AccessoriesController : ControllerBase
    {
        private readonly IAccessoriesService _service;
        private readonly Dictionary<string, object> _validators;

        public AccessoriesController(IAccessoriesService service, IValidator<AccessoriesRequest> accessoriesValidator, IValidator<AccessoriesSelectedRequest> accessoriesSelectedValidator)
        {
            _service = service;
            _validators = new Dictionary<string, object>
            {
                { "accessories", accessoriesValidator },
                { "accessoriesSelected", accessoriesSelectedValidator }
            };
        }

        [Authorize]
        [HttpPost("Accessories")] //GetAccessories
        public async Task<IActionResult> GetAccessories([FromBody] AccessoriesRequest request)
        {
            var validator = (IValidator<AccessoriesRequest>)_validators["accessories"];
            var validationResult = await validator.ValidateAsync(request);
            if (!validationResult.IsValid)
            {
                return BadRequest(validationResult.Errors.Select(e => new { field = e.PropertyName, message = e.ErrorMessage }));
            }

            var result = await _service.GetAccessoriesItemPerModel(request);
            return Ok(result);
        }

        [Authorize]
        [HttpPost("AccessoriesPrices")] //GetAccessoriesPrice
        public async Task<IActionResult> GetAccessoriesPrice([FromBody] AccessoriesSelectedRequest request)
        {
            var validator = (IValidator<AccessoriesSelectedRequest>)_validators["accessoriesSelected"];
            var validationResult = await validator.ValidateAsync(request);
            if (!validationResult.IsValid)
            {
                return BadRequest(validationResult.Errors.Select(e => new { field = e.PropertyName, message = e.ErrorMessage }));
            }

            var result = await _service.GetSelectedAccessoriesPerModel(request);
            return Ok(result);
        }

       
    }
}