using Cardano.Application.DTOs.Requests;
using Cardano.Application.Interfaces.Repositories;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Cardano_API.Controllers
{
    [ApiController]
    public class ThermalAdjustmentController : ControllerBase
    {
        private readonly IThermalAdjustmentService _service;
        private readonly IValidator<ThermalAdjustmentRequest> _adjustmentValidator;
        private readonly IValidator<EAnalysisRequest> _eAnalysisValidator;

        public ThermalAdjustmentController(
            IThermalAdjustmentService service,
            IValidator<ThermalAdjustmentRequest> adjustmentValidator,
            IValidator<EAnalysisRequest> eAnalysisValidator)
        {
            _service = service;
            _adjustmentValidator = adjustmentValidator;
            _eAnalysisValidator = eAnalysisValidator;
        }

        [Authorize]
        [HttpPost("CapacityAdjustments")] //GetCapacityAdjustment
        public async Task<IActionResult> GetCapacityAdjustment([FromBody] ThermalAdjustmentRequest request)
        {
            var validationResult = await _adjustmentValidator.ValidateAsync(request);
            if (!validationResult.IsValid)
            {
                return BadRequest(validationResult.Errors.Select(e => new { field = e.PropertyName, message = e.ErrorMessage }));
            }

            var result = await _service.GetCapacityAdjustmentAsync(request);
            return Ok(result);
        }

        [Authorize]
        [HttpPost("FanAdjustments")] //GetFanAdjustment
        public async Task<IActionResult> GetFanAdjustment([FromBody] ThermalAdjustmentRequest request)
        {
            var validationResult = await _adjustmentValidator.ValidateAsync(request);
            if (!validationResult.IsValid)
            {
                return BadRequest(validationResult.Errors.Select(e => new { field = e.PropertyName, message = e.ErrorMessage }));
            }

            var result = await _service.GetFanAdjustmentAsync(request);
            return Ok(result);
        }

        [Authorize]
        [HttpPost("EnergyAnalysis")] //GetEnergyAnalysis
        public async Task<IActionResult> GetEnergyAnalysis([FromBody] EAnalysisRequest request)
        {
            var validationResult = await _eAnalysisValidator.ValidateAsync(request);
            if (!validationResult.IsValid)
            {
                return BadRequest(validationResult.Errors.Select(e => new { field = e.PropertyName, message = e.ErrorMessage }));
            }

            var result = await _service.GetEAnalysisAsync(request);
            return Ok(result);
        }
    }
}