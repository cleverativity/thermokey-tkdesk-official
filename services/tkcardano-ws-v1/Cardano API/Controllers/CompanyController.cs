using Cardano.Application.DTOs.Requests;
using Cardano.Application.Interfaces.Repositories;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Cardano_API.Controllers
{
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private readonly ICompanyService _service;
        private readonly IValidator<CompanyRequest> _validator;

        public CompanyController(ICompanyService service, IValidator<CompanyRequest> validator)
        {
            _service = service;
            _validator = validator;
        }

        [Authorize]
        [HttpGet("Company")] //GetCompany
        public async Task<IActionResult> GetAll() =>
           Ok(await _service.GetAllAsync());

        [Authorize]
        [HttpPost("Company")] //CreateCompany
        public async Task<IActionResult> Create([FromBody] CompanyRequest request)
        {
            var validationResult = await _validator.ValidateAsync(request);
            if (!validationResult.IsValid)
            {
                return BadRequest(validationResult.Errors.Select(e => new { field = e.PropertyName, message = e.ErrorMessage }));
            }

            var allEmployees = await _service.GetAllAsync();
            if (allEmployees.Any())
                return BadRequest(new { message = "Only one employee record is allowed." });

            var created = await _service.AddAsync(request);
            return Ok(created);
        }

        [Authorize]
        [HttpDelete("Company/{id}")] //DeleteCompany
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _service.DeleteAsync(id);
            if (!deleted)
                return NotFound(new { message = "Company not found." });

            return Ok(new { success = true, message = "Company deleted successfully." });
        }

        [Authorize]
        [HttpPut("Company/{id}")] //UpdateCompany
        public async Task<IActionResult> Update(int id, CompanyRequest comp)
        {
            var existing = await _service.GetByIdAsync(id);
            if (existing == null)
                return BadRequest(new { message = "Company not found." });

            var updated = await _service.UpdateAsync(id, comp);
            return Ok(updated);
        }
    }
}