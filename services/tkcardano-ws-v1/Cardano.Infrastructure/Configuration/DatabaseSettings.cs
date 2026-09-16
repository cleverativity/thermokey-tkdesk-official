using Microsoft.Extensions.Configuration;

namespace Cardano.Infrastructure.Configuration
{
    public class DatabaseSettings
    {
        public string ConnectionString { get; }

        public DatabaseSettings(IConfiguration configuration)
        {
            var configuredConnectionString = configuration.GetConnectionString("DefaultConnection");

            if (!string.IsNullOrWhiteSpace(configuredConnectionString))
            {
                ConnectionString = configuredConnectionString;
                return;
            }

            // Optional fallback for containerized/runtime override without appsettings.
            var host = configuration["DB_HOST"];
            var port = configuration["DB_PORT"] ?? "5432";
            var database = configuration["DB_NAME"];
            var username = configuration["DB_USER"];
            var password = configuration["DB_PASSWORD"];

            if (!string.IsNullOrWhiteSpace(host)
                && !string.IsNullOrWhiteSpace(database)
                && !string.IsNullOrWhiteSpace(username)
                && !string.IsNullOrWhiteSpace(password))
            {
                ConnectionString =
                    $"Host={host};Port={port};Database={database};Username={username};Password={password}";
                return;
            }

            throw new InvalidOperationException(
                "Database connection string is not configured. Set ConnectionStrings:DefaultConnection in appsettings.{Environment}.json or provide DB_HOST/DB_PORT/DB_NAME/DB_USER/DB_PASSWORD environment variables.");
        }
    }
}
