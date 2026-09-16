namespace Cardano.Domain.Entities
{
    public class Company
    {
        public int Id { get; set; }
        public string? CompanyName { get; set; }
        public string Attention_of { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string Telephone { get; set; } = string.Empty;
        public string Fax { get; set; } = string.Empty;
        public DateTime App_date { get; set; }
        public string Software_version { get; set; } = string.Empty;
        public string Offer_no { get; set; } = string.Empty;
        public string Reference { get; set; } = string.Empty;
    }
}
