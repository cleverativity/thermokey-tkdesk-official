using System.Globalization;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Cardano.Application.Common.Converters
{
    /// <summary>
    /// Serializes decimals as fixed-point JSON strings (e.g. "0.0000001")
    /// so clients cannot re-display them as scientific notation (1e-7).
    /// </summary>
    public sealed class FixedDecimalJsonConverter : JsonConverter<decimal>
    {
        public override decimal Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            return reader.TokenType switch
            {
                JsonTokenType.Number => reader.GetDecimal(),
                JsonTokenType.String => decimal.Parse(
                    reader.GetString()!,
                    NumberStyles.Float,
                    CultureInfo.InvariantCulture),
                _ => throw new JsonException($"Unexpected token type {reader.TokenType} for decimal.")
            };
        }

        public override void Write(Utf8JsonWriter writer, decimal value, JsonSerializerOptions options)
        {
            // Must be a JSON string. As a JSON number, browsers/Swagger re-parse it as
            // IEEE-754 and re-display small values as scientific notation (1e-7).
            writer.WriteStringValue(value.ToString(CultureInfo.InvariantCulture));
        }
    }
}
