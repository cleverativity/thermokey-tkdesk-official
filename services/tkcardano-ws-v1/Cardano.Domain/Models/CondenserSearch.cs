using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cardano.Domain.Models
{
    public class CondenserSearch
    {
        public int Id { get; set; }
        public int SelectedModelId  { get; set; }
        public string? CondenserType { get; set; }
        public string? CondenserModel { get; set; }
        public string? RemoteModel { get; set; }
        public string? FansConnection { get; set; }
        public string? UnitsType { get; set; }
        public double Condensing { get; set; }
        public string? RefrigerantType { get; set; }
        public double AtmPressureInMetric { get; set; }
        public double SplValue { get; set; }
        public double Distance { get; set; }
        public string? FlowDirection { get; set; }
        public double ThermalCapacity { get; set; }
        public double ToleranceMin { get; set; }
        public double ToleranceMax { get; set; }
        public double SubCooling { get; set; }
        public double Compressor { get; set; }
        public double DryBulb { get; set; }
        public double Altitude { get; set; }
        public double RelHumidity { get; set; }
        public double CapacityAdjustment { get; set; }
        public double NewAirFlow { get; set; }
    }
}
