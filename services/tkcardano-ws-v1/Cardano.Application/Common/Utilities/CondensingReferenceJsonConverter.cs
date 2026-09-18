using System.Text.Json;
using System.Text.Json.Serialization;

namespace Cardano.Application.Common.Utilities;

public sealed class CondensingReferenceJsonConverter : JsonConverter<string?>
{
    public override string? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        switch (reader.TokenType)
        {
            case JsonTokenType.Null:
                return null;
            case JsonTokenType.String:
                return CondensingReferenceConverter.Parse(reader.GetString());
            case JsonTokenType.Number when reader.TryGetDouble(out var quality)
                && CondensingReferenceConverter.TryFromQuality(quality, out var reference):
                return reference;
            default:
                return null;
        }
    }

    public override void Write(Utf8JsonWriter writer, string? value, JsonSerializerOptions options)
    {
        if (value is null)
        {
            writer.WriteNullValue();
            return;
        }

        writer.WriteStringValue(CondensingReferenceConverter.Parse(value) ?? value);
    }
}
