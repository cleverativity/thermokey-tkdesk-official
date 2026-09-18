using Cardano.Application.Common.Utilities;
using Cardano.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Cardano.Application.DTOs.Responses
{
    /// <summary>
    /// Response DTO for current thermal steps information
    /// </summary>
    public class GetCurrentStepsResponse
    {
       
        public int Id { get; set; }
        public String? Status { get; set; }
        public int User_id { get; set; } // Fixed naming convention
        public string? Macro_serie { get; set; }
        public int Thermal_id { get; set; }
    }


    /// <summary>
    /// Response DTO for condenser and accessories steps
    /// </summary>
    public class GetCondenserAndAccessoriesStepsResponse
    {
        public int Id { get; set; }
        public object? Status { get; set; }
        public int UserId { get; set; }
        public CondenserAndAccessoriesData? Data { get; set; }

        // Legacy nested classes for backward compatibility with JsonParsingUtilities

        public class DataModel
        {
            public Accessories? Accessories { get; set; }
            public Condenser? Condenser { get; set; }
        }

        public class Accessories
        {
            public int Id { get; set; }
            public string? SelectedCondenser { get; set; }
            public string? CondenserModel { get; set; }
            public string? RefRigerantType { get; set; }
            public string? FlowDirection { get; set; }
            public double AccessoriesDiscount { get; set; }
            public double UnitDiscount { get; set; }
            public List<int>? SelectedItems { get; set; }
            public string? FansConnection { get; set; }
            public string? NewCondenserModel { get; set; }
            [JsonIgnore]
            public Condenser? Condenser { get; set; }
        }

        public class Condenser
        {
            public int Id { get; set; }
            public int ModelId { get; set; }
            public string? AirFlowDirection { get; set; }
            public double Altitude { get; set; }
            public double AtmosphericPress { get; set; }
            public double Compressor { get; set; }
            public string? CondenserModel { get; set; }
            public string? RemoteModel { get; set; }
            public string? CondenserType { get; set; }
            public double Condensing { get; set; }
            [JsonConverter(typeof(CondensingReferenceJsonConverter))]
            public string? CondensingReference { get; set; }
            public double Distance { get; set; }
            public double DryBulb { get; set; }
            public string? FansConnection { get; set; }
            public string? RefrigerantType { get; set; }
            public double RelHumidity { get; set; }
            public double MaxSoundPressure { get; set; }
            public double MaxSoundPower { get; set; }
            public double NoiseTolerance { get; set; }
            public double SubCooling { get; set; }
            public double ThermalCapacity { get; set; }
            public double Tolerance { get; set; }
            public double? ToleranceMin { get; set; }
            public double? ToleranceMax { get; set; }
            public string? UnitsType { get; set; }
            public double CapacityAdjustment { get; set; }
            public string? AdjustmentModuleType { get; set; }
            public double? NewAirflow { get; set; }
            public double Current_a { get; set; }
            public double Price { get; set; }
            public string? CurrentUnitType { get; set; }
            public double? MaxLength { get; set; }
            public double? MaxHeight { get; set; }
            public double? MaxWidth { get; set; }
            public double Esp { get; set; }
            public double? CondensingMidpointC { get; set; }
            public double? CompressorBaseK { get; set; }
            public double? SubCoolingBaseK { get; set; }
            public string? CompressorInletMode { get; set; }
            public string? SubCoolingMode { get; set; }
        }
    }

    /// <summary>
    /// Data container for condenser and accessories information
    /// </summary>
    public class CondenserAndAccessoriesData
    {

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public AccessoriesResponseDto? Accessories { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public CondenserResponseDto? Condenser { get; set; }
    }

    /// <summary>
    /// Response DTO for accessories information
    /// </summary>
    public class AccessoriesResponseDto
    {
        public int Id { get; set; }
        public string? SelectedCondenser { get; set; }
        public string? CondenserModel { get; set; }
        public string? RefrigerantType { get; set; }
        public string? FlowDirection { get; set; }
        public double AccessoriesDiscount { get; set; }
        public double UnitDiscount { get; set; }
        public List<int>? SelectedItems { get; set; }
        public string? FansConnection { get; set; }
        public string? NewCondenserModel { get; set; }
    }

    /// <summary>
    /// Response DTO for condenser information
    /// </summary>
    public class CondenserResponseDto
    {
        public int Id { get; set; }
        public int ModelId { get; set; }
        public string? AirFlowDirection { get; set; }
        public double Altitude { get; set; }
        public double AtmosphericPress { get; set; }
        public double Compressor { get; set; }
        public string? CondenserModel { get; set; }
        public string? RemoteModel { get; set; }
        public string? CondenserType { get; set; }
        public double Condensing { get; set; }
        [JsonConverter(typeof(CondensingReferenceJsonConverter))]
        public string? CondensingReference { get; set; }
        public double Distance { get; set; }
        public double DryBulb { get; set; }
        public string? FansConnection { get; set; }
        public string? RefrigerantType { get; set; }
        public double RelHumidity { get; set; }
        public double MaxSoundPressure { get; set; }
        public double MaxSoundPower { get; set; }
        public double NoiseTolerance { get; set; }
        public double SubCooling { get; set; }
        public double ThermalCapacity { get; set; }
        public double Tolerance { get; set; }
        public double? ToleranceMin { get; set; }
        public double? ToleranceMax { get; set; }
        public string? UnitsType { get; set; }
        public double CapacityAdjustment { get; set; }
        public string? AdjustmentModuleType { get; set; }
        public double? NewAirflow { get; set; }
        public double Current_a { get; set; } // Clearer naming
        public double Price { get; set; }
        public string? currentUnitType { get; set; }
        public double? MaxLength { get; set; }
        public double? MaxHeight { get; set; }
        public double? MaxWidth { get; set; }
        public double Esp { get; set; }
        public double? CondensingMidpointC { get; set; }
        public double? CompressorBaseK { get; set; }
        public double? SubCoolingBaseK { get; set; }
        public string? CompressorInletMode { get; set; }
        public string? SubCoolingMode { get; set; }
    }
}
