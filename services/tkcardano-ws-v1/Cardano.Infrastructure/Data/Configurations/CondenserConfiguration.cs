using Cardano.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Cardano.Infrastructure.Data.Configurations
{
    public class CondenserConfiguration : IEntityTypeConfiguration<Condenser>
    {
        public void Configure(EntityTypeBuilder<Condenser> builder)
        {
            builder.ToTable("condensers");
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).HasColumnName("id");
            builder.Property(x => x.Model).HasColumnName("model");
            builder.Property(x => x.Price_Vertical).HasColumnName("price_vertical");
            builder.Property(x => x.Price_Horizontal).HasColumnName("price_horizontal");
            builder.Property(x => x.Fan_Voltage).HasColumnName("fan_voltage");
            builder.Property(x => x.Coil_Type).HasColumnName("coil_type");
            builder.Property(x => x.Coil_Length).HasColumnName("coil_length");
            builder.Property(x => x.Number_Coils).HasColumnName("number_coils");
            builder.Property(x => x.Coil_Type_NH3).HasColumnName("coil_type_nh3");
            builder.Property(x => x.Delta_Fans_Flow).HasColumnName("delta_fans_flow");
            builder.Property(x => x.Star_Fans_Flow).HasColumnName("star_fans_flow");
            builder.Property(x => x.Series).HasColumnName("series");
            builder.Property(x => x.Fan_Noise_Delta).HasColumnName("fan_noise_delta");
            builder.Property(x => x.Fan_Noise_Star).HasColumnName("fan_noise_star");
            builder.Property(x => x.Num_Of_Fan_Rows).HasColumnName("num_of_fan_rows");
            builder.Property(x => x.Num_Of_Fan_Per_Row).HasColumnName("num_of_fan_per_row");
            builder.Property(x => x.Fan_Series).HasColumnName("fan_series");
            builder.Property(x => x.Correction_Delta).HasColumnName("correction_delta");
            builder.Property(x => x.Vertical_Machine_Height).HasColumnName("vertical_machine_height");
            builder.Property(x => x.Vertical_Machine_Length).HasColumnName("vertical_machine_length");
            builder.Property(x => x.Vertical_Machine_Width).HasColumnName("vertical_machine_width");
            builder.Property(x => x.Horizontal_Machine_Height).HasColumnName("horizontal_machine_height");
            builder.Property(x => x.Horizontal_Machine_Length).HasColumnName("horizontal_machine_length");
            builder.Property(x => x.Horizontal_Machine_Width).HasColumnName("horizontal_machine_width");
            builder.Property(x => x.Inlet_Diameter).HasColumnName("inlet_diameter");
            builder.Property(x => x.Outlet_Diameter).HasColumnName("outlet_diameter");
            builder.Property(x => x.Num_Of_Condenser_Outlet_NH3).HasColumnName("num_of_condenser_outlet_NH3");
            builder.Property(x => x.Num_Of_Condenser_Outlet).HasColumnName("num_of_condenser_outlet");
            builder.Property(x => x.Machine_Weight_Vertical).HasColumnName("machine_weight_vertical");
            builder.Property(x => x.Machine_Weight_Horizontal).HasColumnName("machine_weight_horizontal");
            builder.Property(x => x.Inlet_Diameter_NH3).HasColumnName("inlet_diameter_NH3");
            builder.Property(x => x.Num_Of_Condenser_Inlets_NH3).HasColumnName("num_of_condenser_inlets_NH3");
            builder.Property(x => x.Outlet_Diameter_NH3).HasColumnName("outlet_diameter_NH3");
            builder.Property(x => x.Number_Of_Inlets).HasColumnName("number_of_inlets");
            builder.Property(x => x.FanRPM_Star).HasColumnName("fanrpm_star");
            builder.Property(x => x.Fan_Power_Star).HasColumnName("fan_power_star");
            builder.Property(x => x.Fan_Current_Star).HasColumnName("fan_current_Star");
            builder.Property(x => x.Tube_Volume).HasColumnName("tube_volume");
            builder.Property(x => x.FanRPM_Delta).HasColumnName("fanrpm_delta");
            builder.Property(x => x.FanPower_Delta).HasColumnName("fanpower_delta");
            builder.Property(x => x.FanCurrent_Delta).HasColumnName("fancurrent_delta");
            builder.Property(x => x.Num_Of_Tubes).HasColumnName("num_of_tubes");
            builder.Property(x => x.Num_Of_Passes_NH3).HasColumnName("num_of_passes_NH3");
            builder.Property(x => x.Num_Of_Passes).HasColumnName("num_of_passes");
            builder.Property(x => x.Fan_Flow_Max_Delta).HasColumnName("fan_flow_max_delta");
            builder.Property(x => x.Fan_Flow_Min_Delta).HasColumnName("fan_flow_min_delta");
            builder.Property(x => x.Fan_Flow_Max_Star).HasColumnName("fan_flow_max_star");
            builder.Property(x => x.Fan_Flow_Min_Star).HasColumnName("fan_flow_min_star");
            builder.Property(x => x.Fan_Model).HasColumnName("fan_model");
        }
    }
}
