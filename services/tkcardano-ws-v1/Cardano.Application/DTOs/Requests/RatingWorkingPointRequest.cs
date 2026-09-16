namespace Cardano.Application.DTOs.Requests
{
    public class RatingWorkingPointRequest
    {
        public int Id { get; set; }
        public int? ModelId { get; set; }
        public string? Model { get; set; }
        public string? Mode { get; set; } = "FixedSpeed";
        public MeasuredValue? FanSpeed { get; set; }
        public double? RelHumidity { get; set; }
        public double? Altitude { get; set; }
        public string? RefrigerantType { get; set; }
        public double? Condensing { get; set; }
        public double? SubCooling { get; set; }
        public double? ThermalCapacity { get; set; }
        public double? Distance { get; set; }
        public double? InitialInletAir { get; set; }
        public double? FinalInletAir { get; set; }
        public double? TemperatureStep { get; set; } = 1;
    }
}
