namespace Cardano.Domain.Interfaces
{
    public interface IObjectStorage
    {
        Task<byte[]?> GetObjectBytesAsync(string objectKey, CancellationToken cancellationToken = default);

        Task<IReadOnlyList<string>> ListObjectKeysAsync(string prefix, CancellationToken cancellationToken = default);
    }
}
