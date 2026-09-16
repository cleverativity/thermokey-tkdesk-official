using Cardano.Application.Common.Converters;
using System.Text.Json.Serialization;

namespace Cardano.Application.DTOs.Responses
{
    public class UnitOfMeasureResponse
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Type { get; set; }

        [JsonConverter(typeof(FixedDecimalJsonConverter))]
        public decimal Factor { get; set; }

        public int Delta { get; set; }
        public int DecimalPlaces { get; set; }
    }
}
