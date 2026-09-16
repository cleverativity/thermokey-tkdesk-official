using Cardano.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Cardano.Infrastructure.Data.Configurations
{
    public class AccessoriesConfiguration : IEntityTypeConfiguration<Accessories>
    {
        public void Configure(EntityTypeBuilder<Accessories> builder)
        {
            builder.ToTable("accessories");
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).HasColumnName("id");
            builder.Property(x => x.WiringE).HasColumnName("wiringE");
            builder.Property(x => x.WiringWithElectricPanelQ).HasColumnName("wiring_with_electric_panelQ");
            builder.Property(x => x.ThreePoleRepairSwitchI).HasColumnName("three_pole_repair_switch_I");
            builder.Property(x => x.SixPoleRepairSwitchI).HasColumnName("six_pole_repair_switchI");
            builder.Property(x => x.ShockAbsorber).HasColumnName("shock_absorber");
            builder.Property(x => x.PaintingOfCoolingFins).HasColumnName("painting_of_cooling_fins");
            builder.Property(x => x.FanEC01B1).HasColumnName("fan_ec01_b1");
            builder.Property(x => x.FanEC01B2).HasColumnName("fan_ec01_b2");
            builder.Property(x => x.Packaging).HasColumnName("packaging");
            builder.Property(x => x.Nh3ConnectionExtraPrice).HasColumnName("nh3_connection_extra_price");
            builder.Property(x => x.W3e).HasColumnName("w3e");
            builder.Property(x => x.CondenserId).HasColumnName("condenser_id");
        }
    }
}
