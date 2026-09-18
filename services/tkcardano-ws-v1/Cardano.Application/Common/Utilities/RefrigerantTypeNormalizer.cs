namespace Cardano.Application.Common.Utilities;

public static class RefrigerantTypeNormalizer
{
    public static string? ToDisplay(string? refrigerantType)
    {
        if (string.IsNullOrWhiteSpace(refrigerantType))
        {
            return refrigerantType;
        }

        return refrigerantType.Trim().Replace("-", "", StringComparison.Ordinal);
    }

    public static string? ToEngine(string? refrigerantType)
    {
        if (string.IsNullOrWhiteSpace(refrigerantType))
        {
            return refrigerantType;
        }

        var value = refrigerantType.Trim();
        if (value.Equals("All", StringComparison.OrdinalIgnoreCase))
        {
            return value;
        }

        var compact = value.Replace("-", "", StringComparison.Ordinal);
        if (compact.Contains("NH3", StringComparison.OrdinalIgnoreCase)
            || compact.Contains("717", StringComparison.OrdinalIgnoreCase))
        {
            return "R717-(NH3)";
        }

        if (value.StartsWith("R-", StringComparison.OrdinalIgnoreCase))
        {
            return "R-" + value[2..];
        }

        if (compact.Length > 1 && (compact[0] == 'R' || compact[0] == 'r') && char.IsDigit(compact[1]))
        {
            return "R-" + compact[1..];
        }

        return value;
    }
}
