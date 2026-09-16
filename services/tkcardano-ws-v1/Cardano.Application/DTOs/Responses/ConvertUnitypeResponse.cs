namespace Cardano.Application.DTOs.Responses
{
    public class ConvertUnitypeResponse
    {
        //public double FieldValue { get; set; }

        public double Capacity { get; set; }
        public double Altitude { get; set; }
        public double Drybulb { get; set; }
        public double Compressor { get; set; }
        public double Condensing { get; set; }
        public double SubCooling { get; set; }
        public double Distance { get; set; }
        public double AtmosphericPress { get; set; }
    }
}