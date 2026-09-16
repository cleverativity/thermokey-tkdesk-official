using Cardano.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Cardano.Infrastructure.Data.Configurations
{
    public class CompanyConfiguration : IEntityTypeConfiguration<Company>
    {
        public void Configure(EntityTypeBuilder<Company> builder)
        {
            builder.ToTable("company");
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).HasColumnName("id");
            builder.Property(x => x.CompanyName).HasColumnName("company");
            builder.Property(x => x.Attention_of).HasColumnName("attention_of");
            builder.Property(x => x.City).HasColumnName("city");
            builder.Property(x => x.Telephone).HasColumnName("telephone");
            builder.Property(x => x.Fax).HasColumnName("fax");
            builder.Property(x => x.App_date).HasColumnName("app_date");
            builder.Property(x => x.Software_version).HasColumnName("software_version");
            builder.Property(x => x.Offer_no).HasColumnName("offer_no");
            builder.Property(x => x.Reference).HasColumnName("reference");
        }
    }
}
