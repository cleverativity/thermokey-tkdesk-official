using Cardano.Application.DTOs.Requests;
using Cardano.Application.Interfaces.Repositories;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Cardano_API.Controllers
{
    [ApiController]
    public class ThermalReportController : ControllerBase
    {
        private readonly IPdfReportService _pdfService;
        private readonly IValidator<PerformanceReportsRequest> _performanceReportValidator;
        private readonly IValidator<EAnalysisReportsRequest> _eanalysisReportValidator;

        public ThermalReportController(
            IPdfReportService pdfService,
            IValidator<PerformanceReportsRequest> performanceReportValidator,
            IValidator<EAnalysisReportsRequest> eanalysisReportValidator)
        {
            _pdfService = pdfService;
            _performanceReportValidator = performanceReportValidator;
            _eanalysisReportValidator = eanalysisReportValidator;
        }

        //[Authorize]
        [HttpPost("RemoteCondenserReport")] //RemoteCondenser
        public async Task<IActionResult> GenerateRemoteCondenser([FromBody] PerformanceReportsRequest? request)
        {
            if (request == null)
            {
                return BadRequest(new { message = "Request body is required. Send a JSON body with PerfRequest, AccessPriceRequest, and Language." });
            }

            var validationResult = await _performanceReportValidator.ValidateAsync(request);
            if (!validationResult.IsValid)
            {
                return BadRequest(validationResult.Errors.Select(e => new { field = e.PropertyName, message = e.ErrorMessage }));
            }

            byte[] pdfBytes = await _pdfService.GenerateRemoteCondenserPdf(request);

            string fileName = $"RemotePerformance_{Guid.NewGuid()}_{request.LanguageCode}.pdf";
            return File(pdfBytes, "application/pdf", fileName);
        }

        [Authorize]
        [HttpPost("EnergyAnalysisReport")] //EnergyAnalysisReport
        public async Task<IActionResult> GenerateEnergyAnalysisReport([FromBody] EAnalysisReportsRequest? request)
        {
            if (request == null)
            {
                return BadRequest(new { message = "Request body is required. Send a JSON body with the report parameters." });
            }

            var validationResult = await _eanalysisReportValidator.ValidateAsync(request);
            if (!validationResult.IsValid)
            {
                return BadRequest(validationResult.Errors.Select(e => new { field = e.PropertyName, message = e.ErrorMessage }));
            }

            byte[] pdfBytes = await _pdfService.GenerateEnergyAnalysisPdf(request);

            string fileName = $"EnergyAnalysisReport_{Guid.NewGuid()}_{request.LanguageCode}.pdf";
            return File(pdfBytes, "application/pdf", fileName);
        }
    }
}