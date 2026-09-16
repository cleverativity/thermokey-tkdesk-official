namespace Cardano_API.Helpers
{
    /// <summary>
    /// Resolves appsettings.json locations for single-file / container publishes.
    /// AppContext.BaseDirectory can be a temp extract folder, while the JSON files sit next to the executable.
    /// </summary>
    public static class AppSettingsPathHelper
    {
        public static IReadOnlyList<string> GetSearchDirectories()
        {
            var directories = new List<string>();
            var seen = new HashSet<string>(StringComparer.Ordinal);

            void Add(string? path)
            {
                if (string.IsNullOrWhiteSpace(path))
                {
                    return;
                }

                var fullPath = Path.GetFullPath(path);
                if (seen.Add(fullPath))
                {
                    directories.Add(fullPath);
                }
            }

            Add(AppContext.BaseDirectory);
            Add(Directory.GetCurrentDirectory());

            var processPath = Environment.ProcessPath;
            if (!string.IsNullOrWhiteSpace(processPath))
            {
                Add(Path.GetDirectoryName(processPath));
            }

            return directories;
        }

        public static IConfiguration BuildEnvironmentConfiguration(string environmentName)
        {
            var builder = new ConfigurationBuilder();
            foreach (var directory in GetSearchDirectories())
            {
                builder.AddJsonFile(Path.Combine(directory, "appsettings.json"), optional: true);
                builder.AddJsonFile(Path.Combine(directory, $"appsettings.{environmentName}.json"), optional: true);
            }

            return builder.Build();
        }
    }
}
