using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Cardano.Application.Common.Utilities;
using Cardano.Domain.Entities;

namespace Cardano.Application.DTOs.Requests
{
    public class PerformanceRequest
    {
        public int Id { get; set; }

        public int ModelId { get; set; }
        public string? CondenserType { get; set; }

        public string? RemoteModel { get; set; }

        public string? FansConnection { get; set; }

        public string? AirFlowDirection { get; set; }

        public string? UnitsType { get; set; }

        public double Condensing { get; set; }

        [JsonConverter(typeof(CondensingReferenceJsonConverter))]
        public string? CondensingReference { get; set; }

        public string? RefrigerantType { get; set; }

        public double AtmosphericPress { get; set; }

        public double MaxSoundPressure { get; set; }

        public double MaxSoundPower { get; set; }

        public double NoiseTolerance { get; set; }

        public double Distance { get; set; }

        public double ThermalCapacity { get; set; }

        public double Tolerance { get; set; }

        public double? ToleranceMin { get; set; }

        public double? ToleranceMax { get; set; }

        public double Compressor { get; set; }

        public double SubCooling { get; set; }

        public double DryBulb { get; set; }

        public double Altitude { get; set; }

        public double RelHumidity { get; set; }
        public double CapacityAdjustment { get; set; }
        public double NewAirFlow { get; set; }
        public double? MaxLength { get; set; }
        public double? MaxHeight { get; set; }
        public double? MaxWidth { get; set; }
        public double Esp { get; set; }
    }
}
