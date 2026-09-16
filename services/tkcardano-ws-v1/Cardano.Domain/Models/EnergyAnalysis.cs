using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cardano.Domain.Models
{
    public class EAResult
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

    public class EAQuery
    {
        public int? CondenserId { get; set; }
        public string? CondenserModel { get; set; }
        public bool? IsCalculateCapacity { get; set; }
        public bool? IsCalculateAirFlow { get; set; }
        public bool? IsSingleCaculation { get; set; }
        public double? IntEACurrentFixCapacity { get; set; }
        public double? IntEANewFixCapacity { get; set; }
        public double? IntEAStartingAir { get; set; }
        public double? IntEAInletAirTemp { get; set; }
        public double? IntEAFinalAir { get; set; }
        public double? IntEAStep { get; set; }
        public double? IntEADistance { get; set; }
        public double? IntEACondensingTemp { get; set; }
        public double? Distance { get; set; }
        public string? FlowDirection { get; set; }
        public string? refRigerantType { get; set; }
        public double? AirflowRate { get; set; }
        public double? Rpm { get; set; }
        public double? NoOfFans { get; set; }
        public double? Power { get; set; }
        public double? CurrentFan { get; set; }
        public double? TubeVolume { get; set; }
        public double? Weight { get; set; }
        public string? DiameterInlet { get; set; }
        public string? DiameterOutlet { get; set; }
        public double? Price { get; set; }
        public double? SubCooling { get; set; }
        public double? Compressor { get; set; }
        public double? AtmPressureInMetric { get; set; }
        public double? Condensing { get; set; }
        public double? DryBulb { get; set; }
    }

}
