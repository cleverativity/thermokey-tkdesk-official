using Cardano.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static InstinctCodeII.Fluids.Properties.Air;
using static InstinctCodeII.Units;

namespace Cardano.Infrastructure.Repositories
{
    public class UnitConversionRepository : IUnitTypeConverterRepository
    {
        private readonly ConvertValue _convertValue = new ConvertValue();

        public Double DegFfromDegDryBulb(double dryBulbValue)
        {
            var convertValue = new ConvertValue();
            return convertValue.DegFfromDegC(dryBulbValue);
        }

        public Double CondenserDeSuperHeatDegrees(string unitsType, double compressor)
        {
            switch (unitsType)
            {
                case "imp":
                case "English":
                    return compressor;

                case "si":
                case "Metric":
                    return (9.0 / 5.0) * compressor;

                default:
                    switch (unitsType)
                    {
                        case "English":
                            return 45;

                        case "Metric":
                            return (9.0 / 5.0) * compressor;

                        default:
                            return 0;
                    }
            }
        }

        public Double CondenserSubCoolDegrees(string unitsType, double subCooling)
        {
            switch (unitsType)
            {
                case "imp":
                case "English":
                    return subCooling;

                case "si":
                case "Metric":
                    return (9.0 / 5.0) * subCooling;

                default:
                    switch (unitsType)
                    {
                        case "English":
                            return subCooling;

                        case "Metric":
                            return (9.0 / 5.0) * subCooling;

                        default:
                            return 0;
                    }
            }
        }

        public Double CondensingTemperature(string unitsType, double condensing)
        {
            var convertValue = new ConvertValue();
            switch (unitsType)
            {
                case "imp":
                case "English":
                    return convertValue.DegCfromDegF(convertValue.DegFfromDegC(condensing));

                case "si":
                case "Metric":
                    return convertValue.DegCfromDegF(convertValue.DegFfromDegC(condensing));

                default:
                    return 0;
            }
        }

        private static double RoundAndNormalize(double result)
        {
            double rounded = Math.Round(result, 2);
            return Math.Abs(rounded - 9) < 0.005 ? 0 : rounded;
        }

        public double ThermalCapacity(string unitType, double dbField)
        {
            double result;
            if (unitType == "imp")
                result = Math.Round(ConvertValue.BtuPerHrFromKW * dbField, 0);
            else
                result = Math.Round(ConvertValue.KWFromBtuPerHr * dbField, 0);
            return RoundAndNormalize(result);
        }

        public double ThermalAltitude(string unitType, double dbField)
        {
            if (unitType == "imp")
                return Math.Round(ConvertValue.FeetFromMeter * dbField, 0);
            else
                return Math.Round(ConvertValue.MeterFromFeet * dbField, 0);
        }

        private double Tk_DensityAirStd = 0;
        private double Tk_DensityAir = 0;
        private double Twet = 0;

        public double ThermalAtmosphericPress(string unitType, double dblRelHumidity, double dbAltitudeMetric)
        {
            var MoistAirProperties = new InstinctCodeII.Fluids.Properties.Air.MoistAirProperties();
            MoistAirProperties.AtmosphericPressureIN = ConvertValue.psiaFromKilopascal * CalculatePressureCondenser(0);
            MoistAirProperties.DryBulbIN = _convertValue.DegFfromDegC(25);
            MoistAirProperties.WetBulbIN = _convertValue.DegFfromDegC(17.93);
            Tk_DensityAirStd = 16.0185 * MoistAirProperties.MoistDensity();

            var NewRefrigerants_MoistAirProperties = new MoistAirProperties();
            NewRefrigerants_MoistAirProperties.AtmosphericPressureIN = ConvertValue.psiaFromKilopascal * CalculatePressure(dbAltitudeMetric);
            NewRefrigerants_MoistAirProperties.DryBulbIN = _convertValue.DegFfromDegC(25);
            NewRefrigerants_MoistAirProperties.RelativeHumidityIN = dblRelHumidity;
            Twet = _convertValue.DegCfromDegF(NewRefrigerants_MoistAirProperties.CalcWetBulbFromDryBulbRelativeHumidityAtmosphericPressure());
            NewRefrigerants_MoistAirProperties.WetBulbIN = _convertValue.DegFfromDegC(Twet);
            Tk_DensityAir = 16.0185 * NewRefrigerants_MoistAirProperties.MoistDensity();

            if (unitType == "imp")
                return Math.Round((ConvertValue.psiaFromKilopascal * 101.325) * (Tk_DensityAir / Tk_DensityAirStd), 3);
            else
                return Math.Round(101.325 * (Tk_DensityAir / Tk_DensityAirStd), 3);
        }

        public double ThermalDryBulb(string unitType, double dbField)
        {
            double result;
            if (unitType == "imp")
                result = _convertValue.DegFfromDegC(dbField);
            else
                result = _convertValue.DegCfromDegF(dbField);
            return RoundAndNormalize(result);
        }

        public double ThermalCompressor(string unitType, double dbField)
        {
            double result;
            if (unitType == "imp")
                result = (9.0 / 5.0) * dbField;
            else
                result = (5.0 / 9.0) * dbField;
            return RoundAndNormalize(result);
        }

        public double ThermalCondensing(string unitType, double dbField)
        {
            double result;
            if (unitType == "imp")
                result = _convertValue.DegFfromDegC(dbField);
            else
                result = _convertValue.DegCfromDegF(dbField);
            return RoundAndNormalize(result);
        }

        public double ThermalSubCooling(string unitType, double dbField)
        {
            double result;
            if (unitType == "imp")
                result = (9.0 / 5.0) * dbField;
            else
                result = (5.0 / 9.0) * dbField;
            return RoundAndNormalize(result);
        }

        public double ThermalDistance(string unitType, double dbField)
        {
            if (unitType == "imp")
                return Math.Round(ConvertValue.FeetFromMeter * dbField, 2);
            else
                return Math.Round(ConvertValue.MeterFromFeet * dbField, 2);
        }

        private double CalculatePressureCondenser(double MCHX_CoilAltitude)
        {
            var TK_StandardAtmosphere = new StandardAtmosphere();
            double _thisAtmosphericPressure = 0;

            TK_StandardAtmosphere.altitudeIN = ConvertValue.FeetFromMeter * MCHX_CoilAltitude;
            _thisAtmosphericPressure = ConvertValue.kilopascalFromPsia * TK_StandardAtmosphere.calcAltitudePSIA();

            return _thisAtmosphericPressure;
        }

        private double CalculatePressure(double _remoteCondenserAltitude)
        {
            var NewRefrigerants_StandardAtmosphere = new StandardAtmosphere();
            double _thisAtmosphericPressure = 0;

            NewRefrigerants_StandardAtmosphere.altitudeIN = ConvertValue.FeetFromMeter * _remoteCondenserAltitude;
            _thisAtmosphericPressure = ConvertValue.kilopascalFromPsia * NewRefrigerants_StandardAtmosphere.calcAltitudePSIA();

            return _thisAtmosphericPressure;
        }
    }
}