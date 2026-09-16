using Cardano.Application.DTOs.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cardano.Application.DTOs.Requests
{
    public class RemoteCondenserRequest
    {
        public string? CondenserType { get; set; }
        public string? CondenserModel { get; set; } 
        public string? FansConnection { get; set; }
        public string? AirFlowDirection { get; set; }
        public string? UnitsType { get; set; }
        public double Condensing { get; set; }
        public string? RefrigerantType { get; set; }
        public double AtmosphericPress { get; set; }
        public double SplValue { get; set; }
        public double Distance { get; set; }
        public double ThermalCapacity { get; set; }
        public double? ToleranceMin { get; set; }
        public double? ToleranceMax { get; set; }
        public double Compressor { get; set; }
        public double SubCooling { get; set; }
        public double DryBulb { get; set; }
        public double Altitude { get; set; }
        public double RelHumidity { get; set; }
        public string? CurrentUnitType { get; set; }

        
    }

}
