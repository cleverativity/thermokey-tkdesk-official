using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cardano.Application.DTOs.Responses
{
    public class ThermalAdjustCapacityResponse
    {
        public string? FanModel { get; set; }
        public double NewCapacity { get; set; }
        public double NewAirFlow { get; set; }
    }

    public class ThermalAdjustFanResponse
    {
        public double MinFansFlow { get; set; }
        public double MaxFansFlow { get; set; }
        public double AdjustedMinFansFlow { get; set; }
        public double AdjustedMaxFansFlow { get; set; }
        public double CalculFansFlow { get; set; }
        public double AdjustedFansFlow { get; set; }
        public int Fans { get; set; }
        public string? FanModel { get; set; }

        public double NewCapacity { get; set; }
        public double NewAirFlow { get; set; }
    }
}
