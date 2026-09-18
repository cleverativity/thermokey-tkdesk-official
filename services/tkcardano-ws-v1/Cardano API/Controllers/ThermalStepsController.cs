using Cardano.Application.DTOs.Requests;
using Cardano.Application.Interfaces.Repositories;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Cardano_API.Controllers
{
    [ApiController]
    public class ThermalStepsController : ControllerBase
    {
        private readonly IThermalStepsService _service;
        private readonly IValidator<CreateStepsRequest> _validator;

        public ThermalStepsController(IThermalStepsService service, IValidator<CreateStepsRequest> validator)
        {
            _service = service;
            _validator = validator;
        }

        [Authorize]
        [HttpGet("CondenserAccessories")] //GetCondenserAndAccessories
        public async Task<IActionResult> GetCondenserAndAccessories(Int32 selection_id, String status)
        {
            var result = await _service.GetCondenserAndAccessoriesAsync(selection_id, status);
            return Ok(result);
        }

        [Authorize]
        [HttpDelete("CondenserSteps")] //DeleteCondenserSteps
        public async Task<IActionResult> DeleteCondenserSteps(Int32 thermal_id)
        {
            bool value = await _service.DeleteAsync(thermal_id);

            if (!value)
            {
                return NotFound("Steps not exists.");
            }
            else
            {
                return Ok("Successfully deleted thermal_id " + thermal_id);
            }
        }

        [Authorize]
        [HttpGet("CurrentSteps")] //GetCurrentSteps
        public async Task<IActionResult> GetCurrentSteps(Int32 selection_id)
        {
            var result = await _service.GetCurrentStepsAsync(selection_id);
            return Ok(result);
        }

        [Authorize]
        [HttpPost("CondenserSteps")] //CreateCondenserSteps
        public async Task<IActionResult> CreateCondenserSteps([FromBody] CreateStepsRequest request)
        {
            var validationResult = await _validator.ValidateAsync(request);
            if (!validationResult.IsValid)
            {
                return BadRequest(validationResult.Errors.Select(e => new { field = e.PropertyName, message = e.ErrorMessage }));
            }

            var created = await _service.AddAsync(request);
            return Ok(created);
        }
    }
}
