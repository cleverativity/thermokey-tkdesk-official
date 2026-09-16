using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cardano.Application.DTOs.Requests
{
    public  class ConvertUnitypeRequest
    {
        //public double FieldValue { get; set; }
        public string UnitTypes { get; set; } = string.Empty;
        public double Capacity { get; set; }
        public double Altitude { get; set; }
        public double Drybulb { get; set; }
        public double Compressor { get; set; }
        public double Condensing { get; set; }
        public double SubCooling { get; set; }
        public double Distance { get; set; }
        public double Relhumidity { get; set; }
    }
}
