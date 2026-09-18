namespace Cardano.Application.DTOs.Requests
{
    public class MeasuredValue
    {
        public double? Value { get; set; }
        public string? Unit { get; set; }
    }

    public class RatingRequest
    {
        public string? Series { get; set; }
        public string? Subseries { get; set; }
        public int? NumberOfModules { get; set; }
        public int? NumberOfFans { get; set; }
        public string? Assembly { get; set; }
        public string? FansConnection { get; set; }
        public string? FanBrand { get; set; }
        public int? FanDiameter { get; set; }
        public MeasuredValue? FanSpeed { get; set; }
        public string? NoiseClass { get; set; }
        public string? FluidPassages { get; set; }
        public string? CoilGeometry { get; set; }
        public double? DryBulb { get; set; }
        public double? RelHumidity { get; set; }
        public double? Altitude { get; set; }
        public string? RefrigerantType { get; set; }
        public double? Condensing { get; set; }
        public double? SubCooling { get; set; }
        public double? ThermalCapacity { get; set; }
        public double? MaxLength { get; set; }
        public double? MaxHeight { get; set; }
        public double? MaxWidth { get; set; }
        public double? MaxWeight { get; set; }
        public double? Distance { get; set; }
        public bool UseContainerWidth { get; set; }
    }
}
