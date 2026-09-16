using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cardano.Application.DTOs.Requests
{
    public class ThermalAdjustmentRequest
    {
        public int? ModelId { get; set; }

        public string? RemoteModel { get; set; }

        public string? RefrigerantType { get; set; }

        public string? UnitsType { get; set; }

        public double Condensing { get; set; }

        public int PercentAdjustment { get; set; }

        public double Compressor { get; set; }

        public double SubCooling { get; set; }

        public double DryBulb { get; set; }

        public double AtmosphericPress { get; set; }
    }
}
