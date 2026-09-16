using Cardano.Application.DTOs.Requests;
using Cardano.Application.DTOs.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cardano.Application.Interfaces.Repositories
{


    public interface IPdfReportService
    {
        Task<byte[]> GenerateRemoteCondenserPdf(PerformanceReportsRequest dto);
        Task<byte[]> GenerateEnergyAnalysisPdf(EAnalysisReportsRequest dto);
    }

}
  
