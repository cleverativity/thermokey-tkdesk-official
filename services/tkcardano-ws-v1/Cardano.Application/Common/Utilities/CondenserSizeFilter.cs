using Cardano.Domain.Entities;

namespace Cardano.Application.Common.Utilities;

public static class CondenserSizeFilter
{
    public static List<Condenser> Apply(
        IEnumerable<Condenser> condensers,
        double? maxLength,
        double? maxHeight,
        double? maxWidth,
        string? condenserType,
        string? airFlowDirection)
    {
        if (!HasLimits(maxLength, maxHeight, maxWidth))
        {
            return condensers as List<Condenser> ?? condensers.ToList();
        }

        return condensers
            .Where(unit => Fits(unit, maxLength, maxHeight, maxWidth, condenserType, airFlowDirection))
            .ToList();
    }

    public static bool Fits(
        Condenser unit,
        double? maxLength,
        double? maxHeight,
        double? maxWidth,
        string? condenserType,
        string? airFlowDirection)
    {
        if (!HasLimits(maxLength, maxHeight, maxWidth))
        {
            return true;
        }

        var (length, height, width) = GetDimensions(unit, condenserType, airFlowDirection);

        if (maxLength.HasValue && length > maxLength.Value)
        {
            return false;
        }

        if (maxHeight.HasValue && height > maxHeight.Value)
        {
            return false;
        }

        if (maxWidth.HasValue && width > maxWidth.Value)
        {
            return false;
        }

        return true;
    }

    public static bool HasLimits(double? maxLength, double? maxHeight, double? maxWidth)
        => maxLength.HasValue || maxHeight.HasValue || maxWidth.HasValue;

    public static double? ToMillimetres(double? value, string? unitType = null)
    {
        if (!value.HasValue)
        {
            return null;
        }

        // Catalog dimensions are millimetres. UI values like 12 with type "m" are metres.
        // Values already in mm (e.g. 4000) are left unchanged.
        if (value.Value <= 0 || value.Value >= 100)
        {
            return value;
        }

        return IsImperial(unitType)
            ? value.Value * 304.8
            : value.Value * 1000.0;
    }

    private static bool IsImperial(string? unitType)
        => string.Equals(unitType, "imp", StringComparison.OrdinalIgnoreCase)
            || string.Equals(unitType, "english", StringComparison.OrdinalIgnoreCase)
            || string.Equals(unitType, "i-p", StringComparison.OrdinalIgnoreCase)
            || string.Equals(unitType, "i-p (english)", StringComparison.OrdinalIgnoreCase)
            || string.Equals(unitType, "ip", StringComparison.OrdinalIgnoreCase);

    private static (int Length, int Height, int Width) GetDimensions(
        Condenser unit,
        string? condenserType,
        string? airFlowDirection)
    {
        if (UseHorizontalDimensions(condenserType, airFlowDirection))
        {
            return (unit.Horizontal_Machine_Length, unit.Horizontal_Machine_Height, unit.Horizontal_Machine_Width);
        }

        return (unit.Vertical_Machine_Length, unit.Vertical_Machine_Height, unit.Vertical_Machine_Width);
    }

    private static bool UseHorizontalDimensions(string? condenserType, string? airFlowDirection)
    {
        if (!string.IsNullOrWhiteSpace(condenserType))
        {
            if (condenserType.Contains("Table", StringComparison.OrdinalIgnoreCase))
            {
                return true;
            }

            if (condenserType.Contains("V-Type", StringComparison.OrdinalIgnoreCase)
                || condenserType.Equals("V", StringComparison.OrdinalIgnoreCase)
                || condenserType.StartsWith("V", StringComparison.OrdinalIgnoreCase))
            {
                return false;
            }
        }

        if (!string.IsNullOrWhiteSpace(airFlowDirection))
        {
            if (airFlowDirection.Contains("Horiz", StringComparison.OrdinalIgnoreCase))
            {
                return true;
            }

            if (airFlowDirection.StartsWith("V", StringComparison.OrdinalIgnoreCase))
            {
                return false;
            }
        }

        return false;
    }
}
