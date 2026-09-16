using Cardano.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Cardano.Infrastructure.Data.Configurations
{
    public class AccessoriesItemsConfiguration : IEntityTypeConfiguration<AccessoriesItems>
    {
        public void Configure(EntityTypeBuilder<AccessoriesItems> builder)
        {
            builder.HasNoKey();
            builder.ToView("view_accessories_by_group");
            builder.Property(x => x.Id).HasColumnName("id");
            builder.Property(x => x.Item).HasColumnName("item");
            builder.Property(x => x.IsDisabled).HasColumnName("isdisabled");
            builder.Property(x => x.Type).HasColumnName("type");
            builder.Property(x => x.GrpId).HasColumnName("grp_id");
            builder.Property(x => x.Group_name).HasColumnName("group_name");
        }
    }
}
