using Cardano.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Cardano.Infrastructure.Data.Configurations
{
    public class CurrentStepConfiguration : IEntityTypeConfiguration<CurrentStep>
    {
        public void Configure(EntityTypeBuilder<CurrentStep> builder)
        {
            builder.HasNoKey();
        }
    }
}
