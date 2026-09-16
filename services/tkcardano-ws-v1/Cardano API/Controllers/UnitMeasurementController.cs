using Cardano.Application.DTOs.Requests;
using Cardano.Application.Interfaces.Repositories;
using Cardano.Application.Interfaces.Services;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Cardano_API.Controllers
{
    public class UnitMeasurementController : Controller
    {
        private readonly IUnitOfMeasureService _service;
        public UnitMeasurementController(IUnitOfMeasureService service)
        {
            _service = service;
        }

        [HttpGet("Units")]
        public async Task<IActionResult> GetUnitsForVariable(
            [FromQuery] string step,
            [FromQuery] string section,
            [FromQuery] string variable)
        {
            if (string.IsNullOrWhiteSpace(step)
                || string.IsNullOrWhiteSpace(section)
                || string.IsNullOrWhiteSpace(variable))
            {
                return BadRequest(new { message = "step, section, and variable are required." });
            }
            var result = await _service.GetUnitsForVariableAsync(step, section, variable);
            return Ok(result);
        }
    }
}
