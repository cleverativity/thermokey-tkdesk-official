using Cardano.Application.DTOs.Requests;
using Cardano.Application.Interfaces.Repositories;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Cardano_API.Controllers
{
    [ApiController]
    public class CondenserResultController : ControllerBase
    {
        private readonly IThermalCalcService _service;
        private readonly IValidator<PerformanceRequest> _performanceValidator;
        private readonly IValidator<RemoteCondenserRequest> _condenserValidator;
        private readonly IValidator<ConvertUnitypeRequest> _convertUnitypeRequest;

        public CondenserResultController(
            IThermalCalcService service,
            IValidator<PerformanceRequest> performanceValidator,
            IValidator<RemoteCondenserRequest> condenserValidator,
            IValidator<ConvertUnitypeRequest> convertUnitypeRequest)
        {
            _service = service;
            _performanceValidator = performanceValidator;
            _condenserValidator = condenserValidator;
            _convertUnitypeRequest = convertUnitypeRequest;
        }

        [Authorize]
        [HttpPost("Performance")] //GetPerformance
        public async Task<IActionResult> GetPerformance([FromBody] PerformanceRequest request)
        {
            var validationResult = await _performanceValidator.ValidateAsync(request);
            if (!validationResult.IsValid)
            {
                return BadRequest(validationResult.Errors.Select(e => new { field = e.PropertyName, message = e.ErrorMessage }));
            }

            var result = await _service.GeneratePerformanceAsync(request);
            return Ok(result);
        }

        [Authorize]
        [HttpPost("Computation")] //GetComputation
        public async Task<IActionResult> GetComputation([FromBody] RemoteCondenserRequest request, [FromQuery] int page = 1, [FromQuery] int pageSize = 10, [FromQuery] string query = "")
        {
            var validationResult = await _condenserValidator.ValidateAsync(request);
            if (!validationResult.IsValid)
            {
                return BadRequest(validationResult.Errors.Select(e => new { field = e.PropertyName, message = e.ErrorMessage }));
            }

            var result = await _service.ComputeCondenserAsync(request, page, pageSize, query);
            return Ok(result);
        }

        [Authorize]
        [HttpPost("ConvertUnitType")] //GetConvertUnitType
        public async Task<IActionResult> GetConvertUnitType([FromBody] ConvertUnitypeRequest request)
        {
            var validationResult = await _convertUnitypeRequest.ValidateAsync(request);
            if (!validationResult.IsValid)
            {
                return BadRequest(validationResult.Errors.Select(e => new { field = e.PropertyName, message = e.ErrorMessage }));
            }

            var result = await _service.ConvertToUnitType(request);
            return Ok(result);
        }
    }
}