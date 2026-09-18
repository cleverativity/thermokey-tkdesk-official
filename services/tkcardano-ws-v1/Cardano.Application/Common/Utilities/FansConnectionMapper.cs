namespace Cardano.Application.Common.Utilities;

public static class FansConnectionMapper
{
    public static readonly string[] AllowedValues =
    [
        "All~50Hz",
        "All-AC~50Hz",
        "All-EC~50Hz",
        "EC-3Ph-400V-(B1)~50Hz",
        "EC-3Ph-400V-(B2)~50Hz",
        "AC-Delta-3Ph-400V~50Hz",
        "AC-Star-3Ph-400V~50Hz",
        "AC-1Ph-230V~50Hz",
        "EC-1Ph-230V~50Hz",
        "EC-(B1)~50Hz",
        "EC-(B2)~50Hz"
    ];

    public static bool IsAllowed(string? value) =>
        string.IsNullOrWhiteSpace(value)
        || AllowedValues.Contains(value.Trim(), StringComparer.OrdinalIgnoreCase);

    public static (string FanType, string FanBrand) Resolve(string? fansConnection, string? requestedBrand)
    {
        return (ToFanType(fansConnection), ToFanBrand(fansConnection, requestedBrand));
    }

    public static string ToFanType(string? fansConnection)
    {
        var value = Normalize(fansConnection);
        if (string.IsNullOrEmpty(value) || value == "ALL" || value.StartsWith("ALL~", StringComparison.Ordinal))
        {
            return "All";
        }

        if (value.Contains("ALL-AC", StringComparison.Ordinal) || value.StartsWith("AC-", StringComparison.Ordinal))
        {
            return "AC";
        }

        if (value.Contains("ALL-EC", StringComparison.Ordinal)
            || value.StartsWith("EC-", StringComparison.Ordinal)
            || value.StartsWith("EC(", StringComparison.Ordinal))
        {
            return "EC";
        }

        return "All";
    }

    public static string ToFanBrand(string? fansConnection, string? requestedBrand)
    {
        var value = Normalize(fansConnection);
        if (value.Contains("(B2)", StringComparison.Ordinal))
        {
            return "Ziehl-Abegg";
        }

        if (value.Contains("(B1)", StringComparison.Ordinal))
        {
            return "EBM Papst";
        }

        if (string.IsNullOrWhiteSpace(requestedBrand) || requestedBrand.Equals("All", StringComparison.OrdinalIgnoreCase))
        {
            return "All";
        }

        return requestedBrand.Trim();
    }

    private static string Normalize(string? value) =>
        string.IsNullOrWhiteSpace(value) ? string.Empty : value.Trim().ToUpperInvariant();
}
