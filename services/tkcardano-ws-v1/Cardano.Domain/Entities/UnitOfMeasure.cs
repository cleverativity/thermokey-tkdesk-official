namespace Cardano.Domain.Entities
{
    public class UnitOfMeasure
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Type { get; set; }
        public decimal Factor { get; set; }
        public int Delta { get; set; }
        public int DecimalPlaces { get; set; }
    }
}
