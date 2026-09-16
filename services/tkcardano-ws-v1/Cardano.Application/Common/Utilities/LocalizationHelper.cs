using Cardano.Application.Common.Enums;
using Cardano.Application.DTOs.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cardano.Application.Common.Utilities
{

    public static class LocalizationHelper
    {
        private static readonly Dictionary<SupportedLanguage, Dictionary<string, string>> Labels = new();

        static LocalizationHelper()
        {
            // English labels
            var englishLabels = new Dictionary<string, string>
            {
                {"RemoteCondensers", "REMOTE CONDENSERS"},
                {"Model", "Model:"},
                {"TechnicalData", "TECHNICAL DATA"},
                {"InletsOutlets", "INLETS & OUTLETS"},
                {"FanTechnicalData", "FAN TECHNICAL DATA"},
                {"AccessoriesList", "ACCESSORIES LIST"},
                {"PriceDetails", "PRICE DETAILS"},
                {"GeometricParameters", "GEOMETRIC PARAMETERS"},
                {"GrossUnitPrice", "Gross Unit Price:"},
                {"AccessoriesPrice", "Accessories Price:"},
                {"TotalGrossPrice", "Total Gross Price:"},
                {"Discount", "Discount:"},
                {"TotalNetPrice", "Total Net Price:"},
                {"LengthValue1", "Length Value 1 (mm)"},
                {"LengthValue2", "Length Value 2 (mm)"},
                {"LengthValue3", "Length Value 3 (mm)"},
                {"LengthValue4", "Length Value 4 (mm)"},
                {"LengthValue5", "Length Value 5 (mm)"},
                {"WidthValue1", "Width Value 1 (mm)"},
                {"WidthValue2", "Width Value 2 (mm)"},
                {"HeightValue1", "Height Value 1 (mm)"},
                {"HeightValue2", "Height Value 2 (mm)"},
                {"HeightValue3", "Height Value 3 (mm)"},
                {"HeightValue4", "Height Value 4 (mm)"},
                {"LengthHorizontal1", "Length Horizontal 1 (mm)"},
                {"LengthHorizontal2", "Length Horizontal 2 (mm)"},
                {"LengthHorizontal3", "Length Horizontal 3 (mm)"},
                {"LengthHorizontal4", "Length Horizontal 4 (mm)"},
                {"LengthHorizontal5", "Length Horizontal 5 (mm)"},
                {"WidthHorizontal1", "Width Horizontal 1 (mm)"},
                {"WidthHorizontal2", "Width Horizontal 2 (mm)"},
                {"WidthHorizontal3", "Width Horizontal 3 (mm)"},
                {"WidthHorizontal4", "Width Horizontal 4 (mm)"},
                {"HeightHorizontal1", "Height Horizontal 1 (mm)"},
                {"HeightHorizontal2", "Height Horizontal 2 (mm)"},
                {"HeightHorizontal3", "Height Horizontal 3 (mm)"},
                {"HeightHorizontal4", "Height Horizontal 4 (mm)"},
                {"P1", "P1 (mm)"},
                {"P2", "P2 (mm)"},
                {"Dv1", "Dv1 (mm):"},
                {"Dh1", "Dh1 (mm):"},
                {"OutletConnection", "Outlet Connection"},
                {"InletConnection", "Inlet Connection"},
                {"PositionConnections", "Position of Connections"},
                {"NumberOfFans", "Number of Fans"},
                {"SPL", "SPL"},
                {"Link", "Link"},
                {"PowerLevel", "Power Level"},
                {"RPM", "RPM"},
                {"Voltage", "Voltage"},
                {"PowerMax", "Power x 1 (Watt) (@wp, Max)"},
                {"Frequency", "Frequency"},
                {"CurrentMax", "Current x 1 (A) (@wp, Max)"},
                {"RealCapacity", "Real Capacity (kW)"},
                {"RequestedCondensingTemp", "At the Requested Condensing Temperature (°C)"},
                {"RequestedCapacity", "Requested Capacity (kW)"},
                {"RealCondensingTemp", "At the Real Condensing Temperature (°C)"},
                {"Ratio", "Ratio (%)"},
                {"DesuperHeatTemp", "Desuper Heat Temp. (K)"},
                {"RefrigerantType", "Refrigerant."},
                {"SubCoolingTemp", "Subcooling Temp. (K)"},
                {"AirInletTemp", "Inlet Air Temp. (°C)"},
                {"AirOutletTemp", "Outlet Air Temp. (°C)"},
                {"Altitude", "Altitude (m)."},
                {"RefSidePressureDrop", "Ref. Side Pressure Drop (kPa)"},
                {"AirFlow", "Air Flow (m³/h)"},
                {"AirSidePressureDrop", "Air Side Pressure Drop (Pa)"},
                {"SPLAccessories", "SPL in Accessories (dBA)"},
                {"AtDistance", "At the distance of (m)"},
                {"AcousticPowerLevel", "Acoustic Power Level (dBA)"},
                {"MaterialCasing", "Material of Casing"},
                {"AirHumidity", "Air Humidity @Inlet (%)"},
                {"Weight", "Weight (kg)"},
                {"FinMaterial", "Fin Material"},
                {"InternalVolume", "Internal Volume (dm³)"},
                {"Surface", "Surface (m²):"},
                {"Note1", "[1] The current is referred to nominal supplier data: fans consumption can be different at variations of the air temperature and the variations of system voltage."},
                {"Note2", "[2] The unit may not be suitable for very corrosive atmospheres. For special applications contact Thermokey."},
                {"Note3", "[3] Dimensions and weights are not valid for all possible options!"},
                {"Note4", "[4] Noise caused by control systems, spray sistem..etc is not considered in unit noise declaration."},
                {"Note5", "[5] The manual consists of 4 parts GI = General Instructions, IM = Handling Instructions and unpacking, IT = instructions and technical data, IS = Specific instructions for use and maintenance. If not specified in the order, the instructions IT and IS have to be downloaded by the user from the site www.thermokey.com and will not be given on paper."},
                {"Note6", "[6] An inverter different from the one proposed by Thermokey must have omni polar sinusoidal filters, whose quality must be approved by Thermokey, between phase and phase and phase and ground."},
                {"EnergyAnalysisReport", "ENERGY ANALYSIS REPORT"},
                {"AirTempInlet", "Air Temp.@inlet"},
                {"DpAir", "Dp Air"},
                {"RPMTable", "Rpm"},
                {"CurrentAllFans", "Current All Fans"},
                {"TubeVolume", "Tube Volume"},
                {"ConnectDiamInlet", "Connect. diam.@inlet"},
                {"ConnectDiamOutlet", "Connect. diam.@outlet"},
                {"UnitCelsius", "[°C]"},
                {"UnitKilowatt", "[kW]"},
                {"UnitCubicMeterHour", "[m³/h]"},
                {"UnitPascal", "[Pa]"},
                {"UnitDecibel", "[dB(A)]@m"},
                {"UnitWatt", "[Watt]"},
                {"UnitAmpere", "[A]"},
                {"UnitCubicDecimeter", "[dm³]"},
                {"UnitKilogram", "[kg]"},
                {"UnitMillimeter", "[mm]"},
                {"UnitEuro", "[€]"},
                {"Capacity", "Capacity"},
                {"Power", "Power"},
                {"Price", "Price"},
                {"RemoteCondenserReport", "REMOTE CONDENSER REPORT"}
            };

            // Italian labels
            var italianLabels = new Dictionary<string, string>
            {
                {"RemoteCondensers", "CONDENSATORI REMOTI"},
                {"Model", "Modello:"},
                {"TechnicalData", "DATI TECNICI"},
                {"InletsOutlets", "ENTRATE E USCITE"},
                {"FanTechnicalData", "DATI TECNICI VENTILATORE"},
                {"AccessoriesList", "ELENCO ACCESSORI"},
                {"PriceDetails", "DETTAGLI PREZZI"},
                {"GeometricParameters", "PARAMETRI GEOMETRICI"},
                {"GrossUnitPrice", "Prezzo Unitario Lordo:"},
                {"AccessoriesPrice", "Prezzo Accessori:"},
                {"TotalGrossPrice", "Prezzo Totale Lordo:"},
                {"Discount", "Sconto:"},
                {"TotalNetPrice", "Prezzo Totale Netto:"},
                {"LengthValue1", "Valore Lunghezza 1 (mm)"},
                {"LengthValue2", "Valore Lunghezza 2 (mm)"},
                {"LengthValue3", "Valore Lunghezza 3 (mm)"},
                {"LengthValue4", "Valore Lunghezza 4 (mm)"},
                {"LengthValue5", "Valore Lunghezza 5 (mm)"},
                {"WidthValue1", "Valore Larghezza 1 (mm)"},
                {"WidthValue2", "Valore Larghezza 2 (mm)"},
                {"HeightValue1", "Valore Altezza 1 (mm)"},
                {"HeightValue2", "Valore Altezza 2 (mm)"},
                {"HeightValue3", "Valore Altezza 3 (mm)"},
                {"HeightValue4", "Valore Altezza 4 (mm)"},
                {"LengthHorizontal1", "Lunghezza Orizzontale 1 (mm)"},
                {"LengthHorizontal2", "Lunghezza Orizzontale 2 (mm)"},
                {"LengthHorizontal3", "Lunghezza Orizzontale 3 (mm)"},
                {"LengthHorizontal4", "Lunghezza Orizzontale 4 (mm)"},
                {"LengthHorizontal5", "Lunghezza Orizzontale 5 (mm)"},
                {"WidthHorizontal1", "Larghezza Orizzontale 1 (mm)"},
                {"WidthHorizontal2", "Larghezza Orizzontale 2 (mm)"},
                {"WidthHorizontal3", "Larghezza Orizzontale 3 (mm)"},
                {"WidthHorizontal4", "Larghezza Orizzontale 4 (mm)"},
                {"HeightHorizontal1", "Altezza Orizzontale 1 (mm)"},
                {"HeightHorizontal2", "Altezza Orizzontale 2 (mm)"},
                {"HeightHorizontal3", "Altezza Orizzontale 3 (mm)"},
                {"HeightHorizontal4", "Altezza Orizzontale 4 (mm)"},
                {"P1", "P1 (mm)"},
                {"P2", "P2 (mm)"},
                {"Dv1", "Dv1 (mm):"},
                {"Dh1", "Dh1 (mm):"},
                {"OutletConnection", "Connessione di Uscita"},
                {"InletConnection", "Connessione di Entrata"},
                {"PositionConnections", "Posizione delle Connessioni"},
                {"NumberOfFans", "Numero di Ventilatori"},
                {"SPL", "SPL"},
                {"Link", "Collegamento"},
                {"PowerLevel", "Livello di Potenza"},
                {"RPM", "RPM"},
                {"Voltage", "Tensione"},
                {"PowerMax", "Potenza x 1 (Watt) (@wp, Max)"},
                {"Frequency", "Frequenza"},
                {"CurrentMax", "Corrente x 1 (A) (@wp, Max)"},
                {"RealCapacity", "Capacità Reale (kW)"},
                {"RequestedCondensingTemp", "Alla Temperatura di Condensazione Richiesta (°C)"},
                {"RequestedCapacity", "Capacità Richiesta (kW)"},
                {"RealCondensingTemp", "Alla Temperatura di Condensazione Reale (°C)"},
                {"Ratio", "Rapporto (%)"},
                {"DesuperHeatTemp", "Temp. Desurriscaldamento (K)"},
                {"RefrigerantType", "Refrigerante."},
                {"SubCoolingTemp", "Temp. Sottoraffreddamento (K)"},
                {"AirInletTemp", "Temp. Entrata Aria (°C)"},
                {"AirOutletTemp", "Temp. Uscita Aria (°C)"},
                {"Altitude", "Altitudine (m)."},
                {"RefSidePressureDrop", "Caduta Pressione Lato Ref. (kPa)"},
                {"AirFlow", "Flusso Aria (m³/h)"},
                {"AirSidePressureDrop", "Caduta Pressione Lato Aria (Pa)"},
                {"SPLAccessories", "SPL in Accessori (dBA)"},
                {"AtDistance", "Alla distanza di (m)"},
                {"AcousticPowerLevel", "Livello di Potenza Acustica (dBA)"},
                {"MaterialCasing", "Materiale dell'Involucro"},
                {"AirHumidity", "Umidità Aria @Entrata (%)"},
                {"Weight", "Peso (kg)"},
                {"FinMaterial", "Materiale Alette"},
                {"InternalVolume", "Volume Interno (dm³)"},
                {"Surface", "Superficie (m²):"},
                {"Note1", "[1] La corrente si riferisce ai dati nominali del fornitore: il consumo dei ventilatori può essere diverso in caso di variazioni della temperatura dell'aria e delle variazioni della tensione di sistema."},
                {"Note2", "[2] L'unità potrebbe non essere adatta per atmosfere molto corrosive. Per applicazioni speciali contattare Thermokey."},
                {"Note3", "[3] Dimensioni e pesi non sono validi per tutte le possibili opzioni!"},
                {"Note4", "[4] Il rumore causato dai sistemi di controllo, sistema spray..ecc non è considerato nella dichiarazione del rumore dell'unità."},
                {"Note5", "[5] Il manuale è composto da 4 parti GI = Istruzioni Generali, IM = Istruzioni di Movimentazione e disimballaggio, IT = istruzioni e dati tecnici, IS = Istruzioni Specifiche per l'uso e la manutenzione. Se non specificato nell'ordine, le istruzioni IT e IS devono essere scaricate dall'utente dal sito www.thermokey.com e non saranno fornite su carta."},
                {"Note6", "[6] Un inverter diverso da quello proposto da Thermokey deve avere filtri sinusoidali omni polari, la cui qualità deve essere approvata da Thermokey, tra fase e fase e fase e terra."},
                {"EnergyAnalysisReport", "RAPPORTO ANALISI ENERGETICA"},
                {"AirTempInlet", "Temp. Aria@ingresso"},
                {"DpAir", "Dp Aria"},
                {"RPMTable", "giri/min"},
                {"CurrentAllFans", "Corrente Tutti i Ventilatori"},
                {"TubeVolume", "Volume Tubo"},
                {"ConnectDiamInlet", "Diam. collegamento@ingresso"},
                {"ConnectDiamOutlet", "Diam. collegamento@uscita"},
                {"UnitCelsius", "[°C]"},
                {"UnitKilowatt", "[kW]"},
                {"UnitCubicMeterHour", "[m³/h]"},
                {"UnitPascal", "[Pa]"},
                {"UnitDecibel", "[dB(A)]@m"},
                {"UnitWatt", "[Watt]"},
                {"UnitAmpere", "[A]"},
                {"UnitCubicDecimeter", "[dm³]"},
                {"UnitKilogram", "[kg]"},
                {"UnitMillimeter", "[mm]"},
                {"UnitEuro", "[€]"},
                {"Capacity", "Capacità"},
                {"Power", "Potenza"},
                {"Price", "Prezzo"},
                {"RemoteCondenserReport", "RAPPORTO CONDENSATORE REMOTO"}
            };

            Labels[SupportedLanguage.English] = englishLabels;
            Labels[SupportedLanguage.Italian] = italianLabels;
        }

        public static string GetLabel(string key, SupportedLanguage language = SupportedLanguage.English)
        {
            if (Labels.TryGetValue(language, out var languageDict) &&
               languageDict.TryGetValue(key, out var label))
            {
                return label;
            }

            // Fallback to English
            if (Labels.TryGetValue(SupportedLanguage.English, out var englishDict) &&
                englishDict.TryGetValue(key, out var fallback))
            {
                return fallback;
            }

            return key;
        }

    }

}
