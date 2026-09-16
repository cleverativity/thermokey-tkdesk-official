namespace Cardano.Domain.Entities
{
    public class Condenser
    {
        public int Id { get; set; }
        public string? Model { get; set; }
        public int Price_Vertical { get; set; }
        public int Price_Horizontal { get; set; }
        public int Fan_Voltage { get; set; }
        public string? Coil_Type { get; set; }
        public int Coil_Length { get; set; }
        public int Number_Coils { get; set; }
        public string? Coil_Type_NH3 { get; set; }
        public int Delta_Fans_Flow { get; set; }
        public int Star_Fans_Flow { get; set; }
        public string Series { get; set; } = string.Empty;
        public int Fan_Noise_Delta { get; set; }
        public int Fan_Noise_Star { get; set; }
        public int Num_Of_Fan_Rows { get; set; }
        public int Num_Of_Fan_Per_Row { get; set; }
        public string? Fan_Series { get; set; }
        public double Correction_Delta { get; set; }
        public int Vertical_Machine_Height { get; set; }
        public int Vertical_Machine_Length { get; set; }
        public int Vertical_Machine_Width { get; set; }
        public int Horizontal_Machine_Height { get; set; }
        public int Horizontal_Machine_Length { get; set; }
        public int Horizontal_Machine_Width { get; set; }
        public int Inlet_Diameter { get; set; }
        public int Outlet_Diameter { get; set; }
        public int Num_Of_Condenser_Outlet_NH3 { get; set; }
        public int Num_Of_Condenser_Outlet { get; set; }
        public int Machine_Weight_Vertical { get; set; }
        public int Machine_Weight_Horizontal { get; set; }
        public double Inlet_Diameter_NH3 { get; set; }
        public int Num_Of_Condenser_Inlets_NH3 { get; set; }
        public double Outlet_Diameter_NH3 { get; set; }
        public int Number_Of_Inlets { get; set; }
        public int FanRPM_Star { get; set; }
        public int Fan_Power_Star { get; set; }
        public double Fan_Current_Star { get; set; }
        public double Tube_Volume { get; set; }
        public int FanRPM_Delta { get; set; }
        public int FanPower_Delta { get; set; }
        public double FanCurrent_Delta { get; set; }
        public int Num_Of_Tubes { get; set; }
        public int Num_Of_Passes_NH3 { get; set; }
        public int Num_Of_Passes { get; set; }
        public int Fan_Flow_Max_Delta { get; set; }
        public int Fan_Flow_Min_Delta { get; set; }
        public int Fan_Flow_Max_Star { get; set; }
        public int Fan_Flow_Min_Star { get; set; }
        public string? Fan_Model { get; set; }
    }
}
