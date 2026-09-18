using Cardano.Application.Common.Utilities;
using Cardano.Application.DTOs.Responses;
using System.Text.Json.Serialization;

namespace Cardano.Application.DTOs.Requests
{
    public class RemoteCondenserRequest
    {
        public string? CondenserType { get; set; }
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
        public string? CurrentUnitType { get; set; }
        public double? MaxLength { get; set; }
        public double? MaxHeight { get; set; }
        public double? MaxWidth { get; set; }
        public double Esp { get; set; }
    }

}
