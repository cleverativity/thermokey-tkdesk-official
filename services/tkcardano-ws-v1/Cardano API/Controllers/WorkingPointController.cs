using Cardano.Application.DTOs.Requests;
using Cardano.Application.Interfaces.Services;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace Cardano_API.Controllers
{
    [ApiController]
    public class WorkingPointController : ControllerBase
    {
        private readonly IWorkingPointService _service;
        private readonly IValidator<RatingWorkingPointRequest> _validator;

        public WorkingPointController(
            IWorkingPointService service,
            IValidator<RatingWorkingPointRequest> validator)
        {
            _service = service;
            _validator = validator;
        }

        //[Authorize]
        [HttpPost("WorkingPoint")]
        public async Task<IActionResult> Calculate([FromBody] RatingWorkingPointRequest request)
        {
            var validationResult = await _validator.ValidateAsync(request);
            if (!validationResult.IsValid)
            {
                return BadRequest(validationResult.Errors.Select(e => new { field = e.PropertyName, message = e.ErrorMessage }));
            }

            var result = await _service.CalculateAsync(request);
            if (result is null)
            {
                return NotFound(new { message = "Selected machine was not found." });
            }

            return Ok(result);
        }
    }
}
