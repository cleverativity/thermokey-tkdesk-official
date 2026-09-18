using Cardano.Application.DTOs.Responses;
using Newtonsoft.Json.Linq;

namespace Cardano.Application.Common.Utilities
{
    public static class JsonParsingUtilities
    {
        public static GetCondenserAndAccessoriesStepsResponse.Condenser CondenseParseFromJson(string jsonString)
        {
            var data = new GetCondenserAndAccessoriesStepsResponse.Condenser();

            if (string.IsNullOrEmpty(jsonString))
            {
                // Returns with default values
                return data;
            }

            try
            {
                JObject jsonData = JObject.Parse(jsonString);

                // Check if this is a nested "condenser" object
                JObject? condenserNode = jsonData;
                if (jsonData["condenser"] != null && jsonData["condenser"] is JObject condenserObj)
                {
                    condenserNode = condenserObj;
                }

                // If condenserNode is null, use the root jsonData
                condenserNode ??= jsonData;

                // Use helper method to safely extract values
                data.Id = GetIntValue(condenserNode, "id");
                data.ModelId = GetIntValue(condenserNode, "modelId");
                data.AirFlowDirection = GetStringValue(condenserNode, "airFlowDirection");
                data.Altitude = GetDoubleValue(condenserNode, "altitude");
                data.AtmosphericPress = GetDoubleValue(condenserNode, "atmosphericPress");
                data.Compressor = GetDoubleValue(condenserNode, "compressor");
                data.CondenserModel = GetStringValue(condenserNode, "condenserModel");
                data.CondenserType = GetStringValue(condenserNode, "condenserType");
                data.Condensing = GetDoubleValue(condenserNode, "condensing");
                data.CondensingReference = ReadCondensingReference(condenserNode, jsonData);
                data.Distance = GetDoubleValue(condenserNode, "distance");
                data.DryBulb = GetDoubleValue(condenserNode, "dryBulb");
                data.FansConnection = GetStringValue(condenserNode, "fansConnection");
                data.RefrigerantType = RefrigerantTypeNormalizer.ToEngine(GetStringValue(condenserNode, "refrigerantType"));
                data.RelHumidity = GetDoubleValue(condenserNode, "relHumidity");
                data.MaxSoundPressure = GetOptionalDoubleValue(condenserNode, "maxSoundPressure")
                    ?? GetOptionalDoubleValue(condenserNode, "splValue")
                    ?? 0;
                data.MaxSoundPower = GetDoubleValue(condenserNode, "maxSoundPower");
                data.NoiseTolerance = GetDoubleValue(condenserNode, "noiseTolerance");
                data.SubCooling = GetDoubleValue(condenserNode, "subCooling");
                data.ThermalCapacity = GetDoubleValue(condenserNode, "thermalCapacity");
                data.Tolerance = GetDoubleValue(condenserNode, "tolerance");
                data.ToleranceMin = GetOptionalDoubleValue(condenserNode, "toleranceMin");
                data.ToleranceMax = GetOptionalDoubleValue(condenserNode, "toleranceMax");
                data.UnitsType = GetStringValue(condenserNode, "unitsType");
                data.CapacityAdjustment = GetDoubleValue(condenserNode, "capacityAdjustment");
                data.AdjustmentModuleType = GetStringValue(condenserNode, "adjustmentModuleType", "ac");
                data.NewAirflow = GetNullableDoubleValue(condenserNode, "newAirflow");
                data.Current_a = GetDoubleValue(condenserNode, "current_a");
                data.Price = GetDoubleValue(condenserNode, "price");
                data.RemoteModel = GetStringValue(condenserNode, "remoteModel");
                data.CurrentUnitType = GetStringValue(condenserNode, "currentUnitType");
                data.MaxLength = GetOptionalDoubleValue(condenserNode, "maxLength");
                data.MaxHeight = GetOptionalDoubleValue(condenserNode, "maxHeight");
                data.MaxWidth = GetOptionalDoubleValue(condenserNode, "maxWidth");
                data.Esp = GetDoubleValue(condenserNode, "esp");
                data.CondensingMidpointC = GetOptionalDoubleValue(condenserNode, "condensingMidpointC");
                data.CompressorBaseK = GetOptionalDoubleValue(condenserNode, "compressorBaseK");
                data.SubCoolingBaseK = GetOptionalDoubleValue(condenserNode, "subCoolingBaseK");
                var compressorInletMode = GetStringValue(condenserNode, "compressorInletMode");
                data.CompressorInletMode = string.IsNullOrWhiteSpace(compressorInletMode)
                    ? null
                    : compressorInletMode;
                var subCoolingMode = GetStringValue(condenserNode, "subCoolingMode");
                data.SubCoolingMode = string.IsNullOrWhiteSpace(subCoolingMode)
                    ? null
                    : subCoolingMode;

            }
            catch (Newtonsoft.Json.JsonReaderException ex)
            {
                Console.WriteLine($"Invalid JSON format in condenser data: {ex.Message}");
                // Returns with default values on JSON parsing error
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error parsing condenser JSON: {ex.Message}");
                // Returns with default values on error
            }

            return data;
        }

        public static AccessoriesResponseDto AccessoriesParseFromJson(string jsonString, int modelId)
        {
            var data = new AccessoriesResponseDto();

            if (string.IsNullOrEmpty(jsonString))
            {
                // Returns with default values
                return data;
            }

            try
            {
                JObject jsonData = JObject.Parse(jsonString);

                // Check if this is a nested "accessories" object
                JObject? accessoriesNode = jsonData;
                if (jsonData["accessories"] != null && jsonData["accessories"] is JObject accessoriesObj)
                {
                    accessoriesNode = accessoriesObj;
       
                }

                // If accessoriesNode is null, use the root jsonData
                accessoriesNode ??= jsonData;

                // Use helper methods to safely extract values
                data.Id = modelId;
                data.SelectedCondenser = GetStringValue(accessoriesNode, "selectedCondenser");
                data.CondenserModel = GetStringValue(accessoriesNode, "condenserModel");
                data.RefrigerantType = RefrigerantTypeNormalizer.ToEngine(GetStringValue(accessoriesNode, "refRigerantType"));
                data.FlowDirection = GetStringValue(accessoriesNode, "flowDirection");
                data.AccessoriesDiscount = GetDoubleValue(accessoriesNode, "accessoriesDiscount");
                data.UnitDiscount = GetDoubleValue(accessoriesNode, "unitDiscount");
                data.SelectedItems = GetListValue(accessoriesNode, "selectedItems");
                data.FansConnection = GetStringValue(accessoriesNode, "fansConnection");
                data.NewCondenserModel = GetStringValue(accessoriesNode, "newCondenserModel");

                // Note: Condenser is handled separately in the main conversion flow
            }
            catch (Newtonsoft.Json.JsonReaderException ex)
            {
                Console.WriteLine($"Invalid JSON format: {ex.Message}");
                // Returns with default values on JSON parsing error
            }
            catch (InvalidCastException ex)
            {
                Console.WriteLine($"Type conversion error: {ex.Message}");
                // Returns with default values on cast error
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error parsing JSON: {ex.Message}");
                // Returns with default values on error
            }

            return data;
        }

        public static double GetDoubleValue(JObject jsonData, string propertyName)
        {
            var token = jsonData[propertyName];
            if (token != null && token.Type != JTokenType.Null &&
                double.TryParse(token.ToString(), out double result))
            {
                return result;
            }
            return 0.0;
        }

        public static double? GetNullableDoubleValue(JObject jsonData, string propertyName)
        {
            var token = jsonData[propertyName];
            if (token != null && token.Type != JTokenType.Null &&
                double.TryParse(token.ToString(), out double result))
            {
                return result;
            }
            // Return 0 instead of null for newAirflow when null
            return 0.0;
        }

        public static double? GetOptionalDoubleValue(JObject jsonData, string propertyName)
        {
            var token = jsonData[propertyName];
            if (token != null && token.Type != JTokenType.Null &&
                double.TryParse(token.ToString(), out double result))
            {
                return result;
            }

            return null;
        }

        public static int GetIntValue(JObject jsonData, string propertyName)
        {
            var token = jsonData[propertyName];
            if (token != null && token.Type != JTokenType.Null &&
                int.TryParse(token.ToString(), out int result))
            {
                return result;
            }
            return 0;
        }

        public static string GetStringValue(JObject jsonData, string propertyName, string defaultValue = "")
        {
            var token = jsonData[propertyName];
            if (token != null && token.Type != JTokenType.Null)
            {
                return token.ToString();
            }
            return defaultValue;
        }

        public static List<int> GetListValue(JObject jsonData, string propertyName)
        {
            try
            {
                if (jsonData[propertyName] != null && jsonData[propertyName] is JArray selectedItemsArray)
                {
                    // Parse the JSON array and convert each item to an integer
                    return selectedItemsArray.Select(item =>
                    {
                        if (int.TryParse(item.ToString(), out int result))
                            return result;
                        return 0; // Default value for invalid items
                    }).ToList();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error parsing array for property '{propertyName}': {ex.Message}");
            }

            // Return an empty list if the property doesn't exist or on error
            return new List<int>();
        }

        private static string? ReadCondensingReference(JObject condenserNode, JObject root)
        {
            var token = GetTokenIgnoreCase(condenserNode, "condensingReference")
                ?? GetTokenIgnoreCase(root, "condensingReference");

            if (token == null || token.Type == JTokenType.Null)
            {
                return null;
            }

            if (token.Type is JTokenType.Float or JTokenType.Integer)
            {
                return CondensingReferenceConverter.TryFromQuality(token.Value<double>(), out var fromQuality)
                    ? fromQuality
                    : null;
            }

            return CondensingReferenceConverter.Parse(token.ToString());
        }

        private static JToken? GetTokenIgnoreCase(JObject jsonData, string propertyName)
        {
            var property = jsonData.Properties()
                .FirstOrDefault(p => string.Equals(p.Name, propertyName, StringComparison.OrdinalIgnoreCase));
            return property?.Value;
        }
    }
}