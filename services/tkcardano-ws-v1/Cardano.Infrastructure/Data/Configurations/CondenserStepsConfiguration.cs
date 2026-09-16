using Cardano.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Cardano.Infrastructure.Data.Configurations
{
    public class CondenserStepsConfiguration : IEntityTypeConfiguration<CondenserSteps>
    {
        public void Configure(EntityTypeBuilder<CondenserSteps> builder)
        {
            builder.ToTable("condenser_steps");
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).HasColumnName("id");
            builder.Property(x => x.user_id).HasColumnName("user_id");
            builder.Property(x => x.data).HasColumnName("data");
            builder.Property(x => x.status).HasColumnName("status");
            builder.Property(x => x.selection_id).HasColumnName("selection_id");
            builder.Property(x => x.Macro_serie).HasColumnName("macro_serie");
        }
    }
}
