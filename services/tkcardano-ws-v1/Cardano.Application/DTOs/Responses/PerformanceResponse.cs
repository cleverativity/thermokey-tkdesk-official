using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Cardano.Application.DTOs.Responses
{
    public class PerformanceResponse
    {
        public string? ModelName { get; set; }
        public double Capacity { get; set; }
        public double Thermal_capacity { get; set; }
        public double Ratio { get; set; }
        public string RefrigerantType { get; set; } = string.Empty;
        public double InterAirTemp { get; set; }
        public double Altitude { get; set; }
        public double AirFlow { get; set; }
        public double SPLinAccountEN1387 { get; set; }
        public double AccousticPowerLevel { get; set; }
        public double AirHumidity { get; set; }
        public string? Fin_Material { get; set; }

        public double At_Requested_Condensing_Temp { get; set; }
        public double At_Real_Condensing_Temp { get; set; }
        public double DesuperHeatTemp { get; set; }
        public double SubCooling_Temp { get; set; }
        public double OutletAir_Temp { get; set; }
        public double RefrigerantTSidePressureDrop { get; set; }
        public double AirSidePressureDrop { get; set; }

        public string MaterialCasing { get; set; } = string.Empty;
        public string? MainMaterial { get; set; }
        public double Surface { get; set; }
        public double Weights { get; set; }
        public double Internal_vol { get; set; }

        // INLETS & OUTLETS
        public string? Inlet_connection { get; set; }
        public string? Outlet_connection { get; set; }
        public string? Position_connection { get; set; }

        // Fan Technical data
        public double No_fans { get; set; }
        public string? Link { get; set; }
        public double Rpm_wp { get; set; }
        public double Rpm_max { get; set; }
        public double Power_wp { get; set; }
        public double Power_max { get; set; }
        public double Current_a_wp { get; set; }
        public double Current_a_max { get; set; }

        public double Spl { get; set; }
        public double Power_level { get; set; }
        public double Voltage { get; set; }
        public double Frequency { get; set; }
        public double AtDistance { get; set; }

        // Geometric Parameters (Vertical)
        public double lvl1 { get; set; }
        public double lvl2 { get; set; }
        public double lvl3 { get; set; }
        public double lvl4 { get; set; }
        public double lvl5 { get; set; }
        public double Wv1 { get; set; }
        public double Wv2 { get; set; }
        public double Wv3 { get; set; }
        public double Hv1 { get; set; }
        public double Hv2 { get; set; }
        public double Hv3 { get; set; }
        public double Hv4 { get; set; }
        public double P1 { get; set; }
        public double Dv1 { get; set; }

        // Geometric Parameters (Horizontal)
        public double lh1 { get; set; }
        public double lh2 { get; set; }
        public double lh3 { get; set; }
        public double lh4 { get; set; }
        public double lh5 { get; set; }
        public double Wh1 { get; set; }
        public double Wh2 { get; set; }
        public double Wh3 { get; set; }
        public double Wh4 { get; set; }
        public double Hh1 { get; set; }
        public double Hh2 { get; set; }
        public double Hh3 { get; set; }
        public double Hh4 { get; set; }
        public double P2 { get; set; }
        public double Dh1 { get; set; }

        // Accessories
        public string? Dimension_Inch { get; set; }
        public string? Dimension_Mm { get; set; }
        public string? Packaging { get; set; }

        /// <summary>MinIO object key for the condenser drawing (size + airflow).</summary>
        public string? ImageObjectKey { get; set; }

        /// <summary>MIME type of <see cref="ImageBase64"/> (e.g. image/jpeg).</summary>
        public string? ImageContentType { get; set; }

        /// <summary>Base64-encoded condenser drawing; null when MinIO has no match.</summary>
        public string? ImageBase64 { get; set; }
    }
}
