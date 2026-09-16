using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cardano.Domain.Models
{
    public class AdjustCapacityResult
    {
        public string? FanModel { get; set; }
        public double NewCapacity { get; set; }
        public double NewAirFlow { get; set; }

    }

    public class AdjustQuery
    {
        public int? ModelId { get; set; }

        public string? RemoteModel { get; set; }

        public string? RefrigerantType { get; set; }

        public string? UnitsType { get; set; }

        public double Condensing { get; set; }

        public int PercentAdjustment { get; set; }

        public double Compressor { get; set; }

        public double SubCooling { get; set; }

        public double DryBulb { get; set; }

        public double AtmosphericPress { get; set; }
    }

    public class AdjustFanResult
    {
        public double MinFansFlow { get; set; }
        public double MaxFansFlow { get; set; }
        public double AdjustedMinFansFlow { get; set; }
        public double AdjustedMaxFansFlow { get; set; }
        public double CalculFansFlow { get; set; }
        public double AdjustedFansFlow { get; set; }
        public int Fans { get; set; }
        public string? FanModel { get; set; }

        // New Value
        public double NewCapacity { get; set; }
        public double NewAirFlow { get; set; }
    }
}
