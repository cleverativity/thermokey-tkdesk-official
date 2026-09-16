using System.Text.RegularExpressions;

namespace Cardano.Application.Common.Utilities
{
    /// <summary>
    /// Maps model → MinIO image by folder tag + size number.
    /// TMCH1163HUUDV → Table-type/HUU/TMK11-0-2-HUU.jpg (size 11 + series HUU)
    /// TMKH1163HUU… → Table-type/HUU/TMK11-0-2-HUU.jpg
    /// TMKH1163HTNYV → Table-type/HTN/… (series HTN, size 11)
    /// </summary>
    public static class CondenserImageKeyResolver
    {
        /// <summary>MinIO folders under Table-type / V-type.</summary>
        private static readonly string[] KnownSeriesTags =
        [
            "HUU", "HTX", "HNU", "HTN", "HTT", "HLL"
        ];

        /// <summary>
        /// Model prefix before the series tag, e.g. TMCH1163 / TMKH1163 / JMKx…
        /// Family letter may differ from MinIO file prefix (TMC → TMK drawings).
        /// </summary>
        private static readonly Regex SizeRegex = new(
            @"^(?<family>TM[A-Z]|JMK|TKM)(?<variant>[A-Z])?(?<size>\d{2})",
            RegexOptions.IgnoreCase | RegexOptions.Compiled);

        private static readonly Regex ImageStemRegex = new(
            @"^(?:TMK|JMK|TKM)-?(?<size>\d{2})-0-(?<variant>[12])-(?<series>[A-Z]{3})$",
            RegexOptions.IgnoreCase | RegexOptions.Compiled);

        public sealed record ParsedModel(string Family, string Size, string Series, string RootFolder);

        public static bool TryParse(string? modelName, string? airFlowDirection, string? condenserType, out ParsedModel? parsed)
        {
            parsed = null;
            if (string.IsNullOrWhiteSpace(modelName))
                return false;

            var baseModel = NormalizeModelName(modelName);
            if (string.IsNullOrEmpty(baseModel))
                return false;

            var series = FindSeriesTag(baseModel);
            if (series is null)
                return false;

            var seriesIndex = baseModel.IndexOf(series, StringComparison.OrdinalIgnoreCase);
            var prefix = seriesIndex > 0 ? baseModel[..seriesIndex] : baseModel;

            var sizeMatch = SizeRegex.Match(prefix);
            if (!sizeMatch.Success)
                return false;

            var family = sizeMatch.Groups["family"].Value.ToUpperInvariant();
            var size = sizeMatch.Groups["size"].Value;
            var root = ResolveRootFolder(family, condenserType);

            parsed = new ParsedModel(family, size, series, root);
            return true;
        }

        public static IReadOnlyList<string> BuildCandidateKeys(ParsedModel parsed, string? airFlowDirection)
        {
            var preferred = PreferredDrawingVariant(airFlowDirection);
            var alternate = preferred == "2" ? "1" : "2";

            // Drawings in MinIO use TMK (Table-type) / JMK (V-type), not model family (e.g. TMC → TMK11-…).
            var primaryRoot = parsed.RootFolder;
            var secondaryRoot = primaryRoot.Equals("V-type", StringComparison.OrdinalIgnoreCase)
                ? "Table-type"
                : "V-type";

            var keys = new List<string>();
            foreach (var root in new[] { primaryRoot, secondaryRoot })
            {
                var imageFamily = ImageFamilyForRoot(root);
                var folder = $"{root}/{parsed.Series}/";

                foreach (var variant in new[] { preferred, alternate })
                {
                    foreach (var stem in new[]
                             {
                                 $"{imageFamily}{parsed.Size}-0-{variant}-{parsed.Series}",
                                 $"{imageFamily}-{parsed.Size}-0-{variant}-{parsed.Series}",
                                 $"TKM-{parsed.Size}-0-{variant}-{parsed.Series}",
                                 $"TKM{parsed.Size}-0-{variant}-{parsed.Series}"
                             })
                    {
                        // Bucket objects may or may not include an extension.
                        keys.Add(folder + stem + ".jpg");
                        keys.Add(folder + stem);
                    }
                }
            }

            return keys.Distinct(StringComparer.OrdinalIgnoreCase).ToList();
        }

        public static string? PickBestKey(IEnumerable<string> availableKeys, ParsedModel parsed, string? airFlowDirection)
        {
            var preferredVariant = PreferredDrawingVariant(airFlowDirection);
            var size = parsed.Size;
            var series = parsed.Series;

            var matches = availableKeys
                .Where(k =>
                {
                    var file = Path.GetFileNameWithoutExtension(k) ?? string.Empty;
                    var stemMatch = ImageStemRegex.Match(file);
                    if (stemMatch.Success)
                    {
                        return stemMatch.Groups["size"].Value.Equals(size, StringComparison.Ordinal)
                               && stemMatch.Groups["series"].Value.Equals(series, StringComparison.OrdinalIgnoreCase);
                    }

                    var compact = file.Replace("-", "", StringComparison.Ordinal).ToUpperInvariant();
                    return compact.Contains(size, StringComparison.Ordinal)
                           && compact.Contains(series, StringComparison.OrdinalIgnoreCase);
                })
                .ToList();

            if (matches.Count == 0)
                return null;

            var preferred = matches.FirstOrDefault(k =>
            {
                var file = Path.GetFileNameWithoutExtension(k) ?? string.Empty;
                var stemMatch = ImageStemRegex.Match(file);
                return stemMatch.Success
                       && stemMatch.Groups["variant"].Value.Equals(preferredVariant, StringComparison.Ordinal);
            });

            return preferred ?? matches[0];
        }

        private static string NormalizeModelName(string modelName)
        {
            var baseModel = modelName.Trim().ToUpperInvariant();
            var paren = baseModel.IndexOf('(');
            if (paren > 0)
                baseModel = baseModel[..paren];

            var dashEc = baseModel.IndexOf("-[", StringComparison.Ordinal);
            if (dashEc > 0)
                baseModel = baseModel[..dashEc];

            var dashV = baseModel.IndexOf("-V-", StringComparison.OrdinalIgnoreCase);
            if (dashV > 0)
                baseModel = baseModel[..dashV];
            var dashH = baseModel.IndexOf("-H-", StringComparison.OrdinalIgnoreCase);
            if (dashH > 0)
                baseModel = baseModel[..dashH];

            return baseModel;
        }

        private static string? FindSeriesTag(string baseModel)
        {
            string? found = null;
            var foundIndex = int.MaxValue;

            foreach (var tag in KnownSeriesTags.OrderByDescending(t => t.Length))
            {
                var idx = baseModel.IndexOf(tag, StringComparison.OrdinalIgnoreCase);
                if (idx < 0)
                    continue;

                if (found is null || idx < foundIndex)
                {
                    found = tag;
                    foundIndex = idx;
                }
            }

            return found;
        }

        private static string ResolveRootFolder(string family, string? condenserType)
        {
            if (family.Equals("JMK", StringComparison.OrdinalIgnoreCase))
                return "V-type";

            // CondenserType values are "V-Type" / "Table-Type" (see ThermokeyCondensers.vb).
            // Do not use Contains("V") — too broad and can mis-route.
            if (!string.IsNullOrWhiteSpace(condenserType))
            {
                if (condenserType.Contains("Table", StringComparison.OrdinalIgnoreCase))
                    return "Table-type";

                if (condenserType.StartsWith("V", StringComparison.OrdinalIgnoreCase)
                    || condenserType.Contains("V-Type", StringComparison.OrdinalIgnoreCase)
                    || condenserType.Equals("V", StringComparison.OrdinalIgnoreCase))
                    return "V-type";
            }

            return "Table-type";
        }

        private static string ImageFamilyForRoot(string rootFolder) =>
            rootFolder.Equals("V-type", StringComparison.OrdinalIgnoreCase) ? "JMK" : "TMK";

        private static string PreferredDrawingVariant(string? airFlowDirection) =>
            IsVertical(airFlowDirection) ? "2" : "1";

        private static bool IsVertical(string? airFlowDirection) =>
            !string.IsNullOrWhiteSpace(airFlowDirection)
            && airFlowDirection.StartsWith("V", StringComparison.OrdinalIgnoreCase);
    }
}
