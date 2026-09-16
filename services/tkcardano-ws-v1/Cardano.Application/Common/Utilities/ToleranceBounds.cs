namespace Cardano.Application.Common.Utilities
{
    public static class ToleranceBounds
    {
        public static (double Min, double Max) Resolve(double? toleranceMin, double? toleranceMax)
        {
            return (toleranceMin ?? 0, toleranceMax ?? 0);
        }
    }
}
