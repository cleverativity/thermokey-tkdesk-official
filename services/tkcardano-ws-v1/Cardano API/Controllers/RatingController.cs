using Cardano.Application.DTOs.Requests;
using Cardano.Application.Interfaces.Services;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace Cardano_API.Controllers
{
    [ApiController]
    public class RatingController : ControllerBase
    {
        private readonly IRatingService _service;
        private readonly IValidator<RatingRequest> _validator;
        private readonly IValidator<RatingCalculationRequest> _calculationValidator;

        public RatingController(
            IRatingService service,
            IValidator<RatingRequest> validator,
            IValidator<RatingCalculationRequest> calculationValidator)
        {
            _service = service;
            _validator = validator;
            _calculationValidator = calculationValidator;
        }

        //[Authorize]
        [HttpPost("Rating")]
        public async Task<IActionResult> Rate(
            [FromBody] RatingRequest request,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10)
        {
            var validationResult = await _validator.ValidateAsync(request);
            if (!validationResult.IsValid)
            {
                return BadRequest(validationResult.Errors.Select(e => new { field = e.PropertyName, message = e.ErrorMessage }));
            }

            var result = await _service.RateAsync(request, page, pageSize);
            return Ok(result);
        }

        //[Authorize]
        [HttpPost("Rating/Calculation")]
        public async Task<IActionResult> Calculate([FromBody] RatingCalculationRequest request)
        {
            var validationResult = await _calculationValidator.ValidateAsync(request);
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
