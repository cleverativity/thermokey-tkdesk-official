using Cardano.Domain.Entities;
using Cardano.Infrastructure.Data.Conversions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Cardano.Infrastructure.Data.Configurations
{
    public class UnitOfMeasureVariableConfiguration : IEntityTypeConfiguration<UnitOfMeasureVariable>
    {
        public void Configure(EntityTypeBuilder<UnitOfMeasureVariable> builder)
        {
            builder.ToTable("unit_of_measures_variable");
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).HasColumnName("id");
            builder.Property(x => x.Step).HasColumnName("step");
            builder.Property(x => x.Section).HasColumnName("section");
            builder.Property(x => x.Variable).HasColumnName("variable");
            builder.Property(x => x.UnitIds)
                .HasColumnName("unit_measures_ids")
                .HasConversion(UnitMeasureIdsConverter.Converter, UnitMeasureIdsConverter.Comparer);
        }
    }
}
