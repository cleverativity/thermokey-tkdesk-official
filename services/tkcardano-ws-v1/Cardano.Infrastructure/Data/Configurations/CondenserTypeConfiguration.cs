using Cardano.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Cardano.Infrastructure.Data.Configurations
{
    public class CondenserTypeConfiguration : IEntityTypeConfiguration<CondenserType>
    {
        public void Configure(EntityTypeBuilder<CondenserType> builder)
        {
            builder.ToTable("condenserTypes");
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).HasColumnName("id");
            builder.Property(x => x.condenser_type).HasColumnName("condenser_type");
        }
    }
}
