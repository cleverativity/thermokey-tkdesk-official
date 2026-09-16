namespace Cardano.Domain.Models
{
    public class RatingSearch
    {
        public string? Series { get; set; }
        public string? Subseries { get; set; }
        public int? NumberOfModules { get; set; }
        public int? NumberOfFans { get; set; }
        public string? Assembly { get; set; }
        public string? FanType { get; set; }
        public string? FanBrand { get; set; }
        public int? FanDiameter { get; set; }
        public double? FanSpeedValue { get; set; }
        public string? FanSpeedUnit { get; set; }
        public string? NoiseClass { get; set; }
        public string? FluidPassages { get; set; }
        public string? CoilGeometry { get; set; }
        public double? DryBulbC { get; set; }
        public double? RelHumidity { get; set; }
        public double? AltitudeM { get; set; }
        public string? RefrigerantType { get; set; }
        public double? CondensingC { get; set; }
        public double? SubCoolingK { get; set; }
        public double? ThermalCapacityKw { get; set; }
        public double? MaxLengthMm { get; set; }
        public double? MaxHeightMm { get; set; }
        public double? MaxWidthMm { get; set; }
        public double? MaxWeightKg { get; set; }
        public double? DistanceM { get; set; }
    }
}
