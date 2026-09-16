namespace Cardano.Domain.Entities
{
    public class UnitOfMeasureVariable
    {
        public int Id { get; set; }
        public string? Step { get; set; }
        public string? Section { get; set; }
        public string? Variable { get; set; }
        public IReadOnlyList<int> UnitIds { get; set; } = [];
    }
}
