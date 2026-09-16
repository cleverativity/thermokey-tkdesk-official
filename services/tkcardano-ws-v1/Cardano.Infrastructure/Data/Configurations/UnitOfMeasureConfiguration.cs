using Cardano.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Globalization;

namespace Cardano.Infrastructure.Data.Configurations
{
    public class UnitOfMeasureConfiguration : IEntityTypeConfiguration<UnitOfMeasure>
    {
        public void Configure(EntityTypeBuilder<UnitOfMeasure> builder)
        {
            builder.ToTable("unit_of_measures");
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).HasColumnName("id");
            builder.Property(x => x.Name).HasColumnName("name");
            builder.Property(x => x.Type).HasColumnName("type");
            builder.Property(x => x.Delta).HasColumnName("delta");
            builder.Property(x => x.DecimalPlaces).HasColumnName("decimalPlaces");
            builder.Property(x => x.Factor)
                .HasColumnName("factor")
                .HasConversion(
                    value => FormatFactor(value),
                    raw => ParseFactor(raw));
        }

        private static string FormatFactor(decimal value) =>
            value.ToString(CultureInfo.InvariantCulture);

        private static decimal ParseFactor(string raw) =>
            decimal.TryParse(raw, NumberStyles.Float, CultureInfo.InvariantCulture, out var parsed)
                ? parsed
                : 0m;
    }
}
