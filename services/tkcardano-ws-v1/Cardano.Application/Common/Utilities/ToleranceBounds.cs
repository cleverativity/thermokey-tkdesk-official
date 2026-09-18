namespace Cardano.Application.Common.Utilities;

public static class ToleranceBounds
{
    public static (double Min, double Max) Resolve(double tolerance, double? toleranceMin, double? toleranceMax)
    {
        if (toleranceMin.HasValue && toleranceMax.HasValue)
        {
            return (toleranceMin.Value, toleranceMax.Value);
        }

        var magnitude = Math.Abs(tolerance);
        return (-magnitude, magnitude);
    }
}
