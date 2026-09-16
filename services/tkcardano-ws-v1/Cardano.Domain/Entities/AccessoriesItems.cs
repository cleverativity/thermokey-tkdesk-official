namespace Cardano.Domain.Entities
{
    public class AccessoriesItems
    {
        public int Id { get; set; }
        public string? Item { get; set; }
        public bool IsDisabled { get; set; }
        public string? Type { get; set; }
        public int GrpId { get; set; }
        public string Group_name { get; set; } = string.Empty;
    }
}
