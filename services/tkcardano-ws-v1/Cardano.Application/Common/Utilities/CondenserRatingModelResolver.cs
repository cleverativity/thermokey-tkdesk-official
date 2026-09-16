using Cardano.Domain.Entities;

namespace Cardano.Application.Common.Utilities
{
    public static class CondenserRatingModelResolver
    {
        public static Condenser? Resolve(
            IReadOnlyList<Condenser> condensers,
            string? requestedName,
            out bool isFullUnitName)
        {
            isFullUnitName = false;

            if (string.IsNullOrWhiteSpace(requestedName) || condensers == null || condensers.Count == 0)
            {
                return null;
            }

            var name = requestedName.Trim();

            var exact = condensers.FirstOrDefault(c =>
                !string.IsNullOrEmpty(c.Model) &&
                string.Equals(c.Model, name, StringComparison.OrdinalIgnoreCase));

            if (exact != null)
            {
                return exact;
            }

            Condenser? bestPrefixMatch = null;
            foreach (var condenser in condensers)
            {
                if (string.IsNullOrEmpty(condenser.Model))
                {
                    continue;
                }

                if (!name.StartsWith(condenser.Model, StringComparison.OrdinalIgnoreCase))
                {
                    continue;
                }

                if (bestPrefixMatch == null || condenser.Model.Length > bestPrefixMatch.Model!.Length)
                {
                    bestPrefixMatch = condenser;
                }
            }

            if (bestPrefixMatch != null)
            {
                isFullUnitName = true;
            }

            return bestPrefixMatch;
        }
    }
}
