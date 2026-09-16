using Cardano.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Cardano.Infrastructure.Data.Configurations
{
    public class CondenserRefTypeConfiguration : IEntityTypeConfiguration<CondenserRefType>
    {
        public void Configure(EntityTypeBuilder<CondenserRefType> builder)
        {
            builder.ToTable("condenserReTypes");
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).HasColumnName("id");
            builder.Property(x => x.condenser_type).HasColumnName("ref_type");
        }
    }
}
