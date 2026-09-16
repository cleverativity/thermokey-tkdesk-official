namespace Cardano.Domain.Models
{
    public class RatingMatch
    {
        public int Id { get; set; }
        public int ModelId { get; set; }
        public string? ModelCode { get; set; }
        public string? FanCode { get; set; }
        public string? CoilCode { get; set; }
        public string? CoilGeometry { get; set; }
        public string? FluidPassages { get; set; }
        public string? Series { get; set; }
        public string? Subseries { get; set; }
        public string? FanType { get; set; }
        public string? FanDrive { get; set; }
        public string? FanBrand { get; set; }
        public int? FanDiameter { get; set; }
        public string? NoiseClass { get; set; }
        public int NumberOfModules { get; set; }
        public int NumberOfFans { get; set; }
        public int NumberOfCoils { get; set; }
        public int NumberOfPasses { get; set; }
        public string? Assembly { get; set; }
        public int Rpm { get; set; }
        public double? FanSpeedPercent { get; set; }
        public double? FanSpeedRpm { get; set; }
        public double Length { get; set; }
        public double Height { get; set; }
        public double Width { get; set; }
        public double Weight { get; set; }
        public double? DryBulb { get; set; }
        public double? RelHumidity { get; set; }
        public double? Altitude { get; set; }
        public string? RefrigerantType { get; set; }
        public double? Condensing { get; set; }
        public double? SubCooling { get; set; }
        public double? ThermalCapacity { get; set; }
        public double? CalculatedCapacity { get; set; }
        public double? AirFlowM3h { get; set; }
        public double? OutletAirC { get; set; }
        public double? AirPressureDropPa { get; set; }
        public double? RefrigerantPressureDropKpa { get; set; }
        public string? CondenserType { get; set; }
        public double? InnerVolume { get; set; }
        public double? ExchangeArea { get; set; }
        public string? InletConnection { get; set; }
        public string? OutletConnection { get; set; }
        public double? SoundPower { get; set; }
        public double? SoundPressure { get; set; }
        public double? DistanceM { get; set; }
        public string? FanName { get; set; }
        public string? FanLink { get; set; }
        public int FanRows { get; set; }
        public int FansPerRow { get; set; }
        public double? RpmWp { get; set; }
        public double? RpmMax { get; set; }
        public int? Voltage { get; set; }
        public int? Frequency { get; set; }
        public int? Phases { get; set; }
        public double? SinglePowerWp { get; set; }
        public double? SinglePowerMax { get; set; }
        public double? SingleCurrentWp { get; set; }
        public double? SingleCurrentMax { get; set; }
    }
}
