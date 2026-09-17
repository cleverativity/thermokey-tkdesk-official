using System.Globalization;

namespace Cardano.Application.Common.Utilities;

/// <summary>
/// Converts UI condensing temperature to the engine midpoint °C.
/// UI values: ave (X = 0.5), dew (X = 1), bubble (X = 0).
/// </summary>
public static class CondensingReferenceConverter
{
    public const string Ave = "ave";
    public const string Dew = "dew";
    public const string Bubble = "bubble";

    public static readonly string[] AllowedValues = [Ave, Dew, Bubble];

    // Typical dew−bubble glide (K) at ~40 °C condensing. Pure / azeotropic fluids are 0.
    private static readonly Dictionary<string, double> GlideKByRefrigerant = new(StringComparer.OrdinalIgnoreCase)
    {
        ["R404A"] = 0.5,
        ["R407C"] = 5.0,
        ["R407F"] = 6.4,
        ["R410A"] = 0.1,
        ["R448A"] = 6.1,
        ["R449A"] = 6.0,
        ["R450A"] = 0.6,
        ["R452A"] = 3.5
    };

    public static bool IsAllowed(string? reference) =>
        string.IsNullOrWhiteSpace(reference) || Parse(reference) != null;

    /// <summary>
    /// Canonical UI/GET value: ave, dew, or bubble.
    /// Accepts those strings (any case) or vapor quality X: 0.5 → ave, 1 → dew, 0 → bubble.
    /// </summary>
    public static string? Parse(string? reference)
    {
        if (string.IsNullOrWhiteSpace(reference))
        {
            return null;
        }

        var value = reference.Trim();
        if (double.TryParse(value, NumberStyles.Float, CultureInfo.InvariantCulture, out var quality)
            && TryFromQuality(quality, out var fromQuality))
        {
            return fromQuality;
        }

        return value.ToLowerInvariant() switch
        {
            Ave => Ave,
            Dew => Dew,
            Bubble => Bubble,
            _ => null
        };
    }

    public static string Normalize(string? reference) => Parse(reference) ?? Ave;

    public static bool TryFromQuality(double quality, out string reference)
    {
        if (Math.Abs(quality - 1) < 0.001)
        {
            reference = Dew;
            return true;
        }

        if (Math.Abs(quality - 0.5) < 0.001)
        {
            reference = Ave;
            return true;
        }

        if (Math.Abs(quality) < 0.001)
        {
            reference = Bubble;
            return true;
        }

        reference = Ave;
        return false;
    }

    public static double GlideK(string? refrigerantType)
    {
        var key = RefrigerantKey(refrigerantType);
        return GlideKByRefrigerant.TryGetValue(key, out var glide) ? glide : 0;
    }

    /// <summary>
    /// Maps UI condensing °C to engine midpoint °C:
    /// ave (X = 0.5) → T, dew (X = 1) → T − glide/2, bubble (X = 0) → T + glide/2.
    /// </summary>
    public static double ToEngineCondensing(double condensingC, string? refrigerantType, string? reference)
    {
        var kind = Normalize(reference);
        if (kind == Ave)
        {
            return condensingC;
        }

        var halfGlide = GlideK(refrigerantType) / 2.0;
        if (halfGlide <= 0)
        {
            return condensingC;
        }

        return kind == Dew
            ? condensingC - halfGlide
            : condensingC + halfGlide;
    }

    private static string RefrigerantKey(string? refrigerantType)
    {
        var engine = RefrigerantTypeNormalizer.ToEngine(refrigerantType);
        if (string.IsNullOrWhiteSpace(engine))
        {
            return string.Empty;
        }

        return engine.Replace("-", "", StringComparison.Ordinal).ToUpperInvariant();
    }
}
