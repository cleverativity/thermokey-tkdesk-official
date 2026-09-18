namespace Cardano.Application.Interfaces.Services
{
    public sealed class CondenserImageResult
    {
        public required byte[] Bytes { get; init; }
        public required string ObjectKey { get; init; }
        public required string ContentType { get; init; }
    }

    /// <summary>
    /// Resolves a single condenser drawing from MinIO by model size + airflow (+ series).
    /// </summary>
    public interface ICondenserImageService
    {
        Task<CondenserImageResult?> TryGetImageAsync(
            string? modelName,
            string? airFlowDirection,
            string? condenserType,
            CancellationToken cancellationToken = default);
    }
}
