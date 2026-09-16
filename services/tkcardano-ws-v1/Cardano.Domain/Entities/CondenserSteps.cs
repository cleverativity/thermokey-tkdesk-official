using System.Text.Json;

namespace Cardano.Domain.Entities
{
    public class CondenserSteps
    {
        public int Id { get; set; }
        public int user_id { get; set; }
        public JsonDocument? data { get; set; }
        public string? status { get; set; }
        public int selection_id { get; set; }
        public string? Macro_serie { get; set; }
    }
}
