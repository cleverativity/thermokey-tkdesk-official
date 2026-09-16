namespace Cardano.Application.DTOs.Responses
{
    public class CondenserRatingResponse
    {
        public List<RemoteCondenserResponse> Results { get; set; } = new();
    }
}
