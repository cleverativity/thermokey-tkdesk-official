namespace Cardano.Application.DTOs.Requests
{
    public class RatingCalculationRequest : RatingRequest
    {
        public int Id { get; set; }
        public int? ModelId { get; set; }
    }
}
