using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cardano.Application.DTOs.Responses
{
    public class EAnalysisResponse
    {
        public double AirTempInlet { get; set; }
        public double Capacity { get; set; }
        public double AirFlow { get; set; }
        public double DpAir { get; set; }
        public double Spl { get; set; }
        public double Rpm { get; set; }
        public double Power { get; set; }
        public double CurrentFans { get; set; }
        public double TubeVolume { get; set; }
        public double Weight { get; set; }
        public string? ConnectDiamInlet { get; set; }
        public string? ConnectDiamOutlet { get; set; }
        public double Price { get; set; }
    }
}
