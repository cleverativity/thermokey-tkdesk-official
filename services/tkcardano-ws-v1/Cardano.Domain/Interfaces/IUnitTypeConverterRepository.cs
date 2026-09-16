using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cardano.Domain.Interfaces
{
    public interface IUnitTypeConverterRepository
    {
        public Double DegFfromDegDryBulb(double dryBulbValue);

        public Double CondenserDeSuperHeatDegrees(string unitsType, double compressor);

        public Double CondenserSubCoolDegrees(string unitsType, double compressor);

        public Double CondensingTemperature(string unitsType, double condensing);

        public double ThermalCapacity(string unitType, double dbField);

        public double ThermalAltitude(string unitType, double dbField);

        public double ThermalAtmosphericPress(string unitType, double dblRelHumidity, double dbAltitudeMetric);

        public double ThermalDryBulb(string unitType, double dbField);

        public double ThermalCompressor(string unitType, double dbField);

        public double ThermalCondensing(string unitType, double dbField);

        public double ThermalSubCooling(string unitType, double dbField);

        public double ThermalDistance(string unitType, double dbField);
    }
}