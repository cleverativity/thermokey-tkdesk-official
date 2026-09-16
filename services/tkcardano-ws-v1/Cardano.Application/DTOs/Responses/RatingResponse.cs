namespace Cardano.Application.DTOs.Responses
{
    public class RatingIdentification
    {
        public string? ModelCode { get; set; }
        public string? FanCode { get; set; }
        public string? CoilCode { get; set; }
        public string? CoilGeometry { get; set; }
        public string? FluidPassages { get; set; }
        public string? Series { get; set; }
        public string? Subseries { get; set; }
    }

    public class RatingFans
    {
        public string? Type { get; set; }
        public string? FanType { get; set; }
        public string? Brand { get; set; }
        public int? Diameter { get; set; }
        public string? NoiseClass { get; set; }
        public int Number { get; set; }
        public int Rpm { get; set; }
        public double? FanSpeedPercent { get; set; }
        public double? FanSpeedRpm { get; set; }
        public int NumberOfModules { get; set; }
        public string? Assembly { get; set; }
    }

    public class RatingFanSpeed
    {
        public double? Value { get; set; }
        public string Unit { get; set; } = "%";
        public double? Percent { get; set; }
        public double? Rpm { get; set; }
    }

    public class RatingDimensions
    {
        public double Length { get; set; }
        public double Height { get; set; }
        public double Width { get; set; }
        public double Weight { get; set; }
        public string Unit { get; set; } = "mm";
        public string WeightUnit { get; set; } = "kg";
    }

    public class RatingAir
    {
        public double? DryBulb { get; set; }
        public string DryBulbUnit { get; set; } = "C";
        public double? RelHumidity { get; set; }
        public string RelHumidityUnit { get; set; } = "%";
        public double? Altitude { get; set; }
        public string AltitudeUnit { get; set; } = "m";
    }

    public class RatingRefrigerant
    {
        public string? RefrigerantType { get; set; }
        public double? Condensing { get; set; }
        public string CondensingUnit { get; set; } = "C";
        public double? SubCooling { get; set; }
        public string SubCoolingUnit { get; set; } = "K";
        public double? ThermalCapacity { get; set; }
        public string ThermalCapacityUnit { get; set; } = "kW";
    }

    public class RatingPerformanceData
    {
        public double? Capacity { get; set; }
        public string CapacityUnit { get; set; } = "kW";
        public string Mode { get; set; } = "Condensing";
        public string Condition { get; set; } = "Air cooled";
    }

    public class RatingAirData
    {
        public double? InletTemperature { get; set; }
        public string InletTemperatureUnit { get; set; } = "C";
        public double? InletRelativeHumidity { get; set; }
        public string InletRelativeHumidityUnit { get; set; } = "%";
        public double? Altitude { get; set; }
        public string AltitudeUnit { get; set; } = "m";
        public double? OutletTemperature { get; set; }
        public string OutletTemperatureUnit { get; set; } = "C";
        public double? Flowrate { get; set; }
        public string FlowrateUnit { get; set; } = "m3/h";
        public double? PressureDrop { get; set; }
        public string PressureDropUnit { get; set; } = "Pa";
    }

    public class RatingRefrigerantData
    {
        public string? RefrigerantType { get; set; }
        public double? Condensing { get; set; }
        public string CondensingUnit { get; set; } = "C";
        public double? SubCooling { get; set; }
        public string SubCoolingUnit { get; set; } = "K";
        public double? LiquidLeaving { get; set; }
        public string LiquidLeavingUnit { get; set; } = "C";
        public double? PressureDrop { get; set; }
        public string PressureDropUnit { get; set; } = "kPa";
    }

    public class RatingUnitData
    {
        public string? Type { get; set; }
        public double? Length { get; set; }
        public double? Width { get; set; }
        public double? Height { get; set; }
        public string DimensionUnit { get; set; } = "m";
        public double? Weight { get; set; }
        public string WeightUnit { get; set; } = "kg";
        public double? InnerVolume { get; set; }
        public string InnerVolumeUnit { get; set; } = "dm3";
        public double? ExchangeArea { get; set; }
        public string ExchangeAreaUnit { get; set; } = "m2";
        public string? InletConnection { get; set; }
        public string? OutletConnection { get; set; }
    }

    public class RatingCoilData
    {
        public string? CoilCode { get; set; }
        public string? CoilGeometry { get; set; }
        public string FinMaterial { get; set; } = "Aluminum";
        public string TubeMaterial { get; set; } = "Aluminium";
        public int? Passes { get; set; }
        public string? PassesLabel { get; set; }
        public int? NumberOfCoils { get; set; }
        public double? InnerVolume { get; set; }
        public string InnerVolumeUnit { get; set; } = "dm3";
        public double? ExchangeArea { get; set; }
        public string ExchangeAreaUnit { get; set; } = "m2";
        public string? InletHeader { get; set; }
        public string? OutletHeader { get; set; }
    }

    public class RatingNoiseData
    {
        public double? SoundPower { get; set; }
        public string SoundPowerUnit { get; set; } = "dB(A)";
        public double? SoundPressure { get; set; }
        public string SoundPressureUnit { get; set; } = "dB(A)";
        public double? Distance { get; set; }
        public string DistanceUnit { get; set; } = "m";
    }

    public class RatingVentilationData
    {
        public string? FanName { get; set; }
        public string? FanType { get; set; }
        public string? Link { get; set; }
        public double? SpeedPercent { get; set; }
        public double? RpmWp { get; set; }
        public double? RpmMax { get; set; }
        public int? Diameter { get; set; }
        public int? FanRows { get; set; }
        public int? FansPerRow { get; set; }
        public int? NumberOfFans { get; set; }
        public int? Phases { get; set; }
        public int? Voltage { get; set; }
        public int? Frequency { get; set; }
        public double? SinglePowerWp { get; set; }
        public double? SinglePowerMax { get; set; }
        public double? TotalPowerWp { get; set; }
        public double? TotalPowerMax { get; set; }
        public double? SingleCurrentWp { get; set; }
        public double? SingleCurrentMax { get; set; }
        public double? TotalCurrentWp { get; set; }
        public double? TotalCurrentMax { get; set; }
    }

    public class RatingResultResponse
    {
        public int Id { get; set; }
        public int ModelId { get; set; }
        public RatingIdentification Identification { get; set; } = new();
        public RatingFans Fans { get; set; } = new();
        public RatingDimensions Dimensions { get; set; } = new();
        public RatingAir Air { get; set; } = new();
        public RatingRefrigerant Refrigerant { get; set; } = new();
    }

    public class RatingCalculationResponse
    {
        public int Id { get; set; }
        public int ModelId { get; set; }
        public string? ModelCode { get; set; }
        public RatingPerformanceData PerformanceData { get; set; } = new();
        public RatingAirData AirData { get; set; } = new();
        public RatingRefrigerantData RefrigerantData { get; set; } = new();
        public RatingUnitData UnitData { get; set; } = new();
        public RatingCoilData CoilData { get; set; } = new();
        public RatingNoiseData NoiseData { get; set; } = new();
        public RatingVentilationData VentilationData { get; set; } = new();
    }

    public class RatingWorkingPointRow
    {
        public double? InletAirTemp { get; set; }
        public double? InletRelativeHumidity { get; set; }
        public double? Condensing { get; set; }
        public double? Capacity { get; set; }
        public double? RefrigerantPressureDrop { get; set; }
        public double? AirFlow { get; set; }
        public double? OutletAirTemp { get; set; }
        public double? AirPressureDrop { get; set; }
        public double? FanSpeedRpm { get; set; }
        public double? FanSpeedPercent { get; set; }
        public double? TotalPower { get; set; }
        public double? TotalCurrent { get; set; }
        public double? SoundPower { get; set; }
        public double? SoundPressure { get; set; }
    }

    public class RatingWorkingPointResponse
    {
        public int Id { get; set; }
        public int ModelId { get; set; }
        public string? ModelCode { get; set; }
        public string Mode { get; set; } = "FixedSpeed";
        public string? RefrigerantType { get; set; }
        public double? Condensing { get; set; }
        public double? SubCooling { get; set; }
        public double? RelHumidity { get; set; }
        public double? Distance { get; set; }
        public string DistanceUnit { get; set; } = "m";
        public string CapacityUnit { get; set; } = "kW";
        public string TemperatureUnit { get; set; } = "C";
        public string AirFlowUnit { get; set; } = "m3/h";
        public string AirPressureDropUnit { get; set; } = "Pa";
        public string RefrigerantPressureDropUnit { get; set; } = "kPa";
        public string PowerUnit { get; set; } = "W";
        public string CurrentUnit { get; set; } = "A";
        public string SoundUnit { get; set; } = "dB(A)";
        public List<RatingWorkingPointRow> Results { get; set; } = new();
    }

    public class PaginatedRatingResponse
    {
        public List<RatingResultResponse> Results { get; set; } = new();
        public RatingAir Air { get; set; } = new();
        public RatingRefrigerant Refrigerant { get; set; } = new();
        public RatingFanSpeed FanSpeed { get; set; } = new();
        public int CurrentPage { get; set; }
        public int PageSize { get; set; }
        public int TotalCount { get; set; }
        public int TotalPages { get; set; }
        public bool HasNextPage { get; set; }
        public bool HasPreviousPage { get; set; }
    }
}
