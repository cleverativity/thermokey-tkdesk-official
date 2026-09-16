using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Cardano.Infrastructure.Data.Conversions
{
    internal static class UnitMeasureIdsConverter
    {
        public static readonly ValueConverter<IReadOnlyList<int>, string?> Converter =
            new(ids => Serialize(ids), raw => Parse(raw));

        public static readonly ValueComparer<IReadOnlyList<int>> Comparer =
            new(
                (left, right) => SequenceEqual(left, right),
                value => GetHashCode(value),
                value => Snapshot(value));

        internal static string? Serialize(IReadOnlyList<int> ids) =>
            ids is { Count: > 0 } ? string.Join(",", ids) : null;

        internal static IReadOnlyList<int> Parse(string? raw)
        {
            if (string.IsNullOrWhiteSpace(raw)
                || raw.Equals("Null", StringComparison.OrdinalIgnoreCase))
            {
                return Array.Empty<int>();
            }

            return raw
                .Trim()
                .Trim('{', '}')
                .Split(',', StringSplitOptions.RemoveEmptyEntries)
                .Select(part => int.TryParse(part.Trim(), out var id) ? id : (int?)null)
                .Where(id => id.HasValue)
                .Select(id => id!.Value)
                .ToArray();
        }

        private static bool SequenceEqual(IReadOnlyList<int>? left, IReadOnlyList<int>? right)
        {
            left ??= Array.Empty<int>();
            right ??= Array.Empty<int>();
            return left.SequenceEqual(right);
        }

        private static int GetHashCode(IReadOnlyList<int> value)
        {
            var hash = 0;
            foreach (var id in value)
                hash = HashCode.Combine(hash, id);
            return hash;
        }

        private static IReadOnlyList<int> Snapshot(IReadOnlyList<int> value) =>
            value.ToArray();
    }
}
