using Cardano.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Cardano.Infrastructure.Data.Configurations
{
    public class FanConnectionConfiguration : IEntityTypeConfiguration<FanConnection>
    {
        public void Configure(EntityTypeBuilder<FanConnection> builder)
        {
            builder.ToTable("fanconnection");
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).HasColumnName("id");
            builder.Property(x => x.fan_connection).HasColumnName("fan_connection");
        }
    }
}
