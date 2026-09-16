using System.Text.Json.Serialization;

namespace Cardano_API.Models;

public sealed record ErrorResponse(string Error);

[JsonSourceGenerationOptions(PropertyNamingPolicy = JsonKnownNamingPolicy.CamelCase)]
[JsonSerializable(typeof(ErrorResponse))]
internal partial class ErrorResponseJsonContext : JsonSerializerContext;

