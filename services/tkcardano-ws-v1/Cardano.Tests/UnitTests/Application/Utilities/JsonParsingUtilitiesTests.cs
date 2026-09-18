using Cardano.Application.Common.Utilities;
using FluentAssertions;
using NUnit.Framework;

namespace Cardano.Tests.UnitTests.Application.Utilities;

[TestFixture]
public class JsonParsingUtilitiesTests
{
    [Test]
    public void CondenseParseFromJson_ReadsMaxDimensionsFromSavedSteps()
    {
        const string json = """
            {
              "status": "solved",
              "condenserType": "All",
              "maxWidth": 12,
              "maxHeight": 13,
              "maxLength": 12,
              "esp": 50,
              "maxSoundPressure": 65,
              "maxSoundPower": 80,
              "noiseTolerance": 2,
              "toleranceMax": 10,
              "toleranceMin": -10,
              "refrigerantType": "R404A",
              "condensingReference": "dew",
              "airFlowDirection": "Vertical"
            }
            """;

        var condenser = JsonParsingUtilities.CondenseParseFromJson(json);

        condenser.MaxLength.Should().Be(12);
        condenser.MaxHeight.Should().Be(13);
        condenser.MaxWidth.Should().Be(12);
        condenser.Esp.Should().Be(50);
        condenser.MaxSoundPressure.Should().Be(65);
        condenser.MaxSoundPower.Should().Be(80);
        condenser.NoiseTolerance.Should().Be(2);
        condenser.ToleranceMin.Should().Be(-10);
        condenser.ToleranceMax.Should().Be(10);
        condenser.AirFlowDirection.Should().Be("Vertical");
        condenser.CondensingReference.Should().Be("dew");
        condenser.RefrigerantType.Should().Be("R-404A");
    }

    [Test]
    public void CondenseParseFromJson_MapsQualityXAndDoesNotStickOnAve()
    {
        const string json = """
            {
              "condenser": {
                "condenserType": "All"
              },
              "condensingReference": 1,
              "condensing": 40,
              "refrigerantType": "R407C"
            }
            """;

        var condenser = JsonParsingUtilities.CondenseParseFromJson(json);

        condenser.CondensingReference.Should().Be("dew");
    }

    [Test]
    public void CondenseParseFromJson_MapsBubbleQualityOnCondenserNode()
    {
        const string json = """
            {
              "CondensingReference": "BUBBLE",
              "condensing": 40
            }
            """;

        JsonParsingUtilities.CondenseParseFromJson(json).CondensingReference.Should().Be("bubble");
    }

    [Test]
    public void CondenseParseFromJson_LeavesMissingMaxDimensionsNull()
    {
        const string json = """
            {
              "condenserType": "All",
              "airFlowDirection": "Vertical"
            }
            """;

        var condenser = JsonParsingUtilities.CondenseParseFromJson(json);

        condenser.MaxLength.Should().BeNull();
        condenser.MaxHeight.Should().BeNull();
        condenser.MaxWidth.Should().BeNull();
        condenser.Esp.Should().Be(0);
        condenser.CondensingReference.Should().BeNull();
    }

    [Test]
    public void CondenseParseFromJson_ReadsLegacySplValueAsMaxSoundPressure()
    {
        const string json = """
            {
              "splValue": 70
            }
            """;

        JsonParsingUtilities.CondenseParseFromJson(json).MaxSoundPressure.Should().Be(70);
    }

    [Test]
    public void CondenseParseFromJson_ReadsFluidCanonicalsAndModes()
    {
        const string json = """
            {
              "condensing": 39.75,
              "condensingReference": "bubble",
              "condensingMidpointC": 40,
              "compressor": 25,
              "compressorBaseK": 25,
              "subCooling": 3,
              "subCoolingBaseK": 3,
              "compressorInletMode": "temperature",
              "subCoolingMode": "delta_temperature"
            }
            """;

        var condenser = JsonParsingUtilities.CondenseParseFromJson(json);

        condenser.Condensing.Should().Be(39.75);
        condenser.CondensingReference.Should().Be("bubble");
        condenser.CondensingMidpointC.Should().Be(40);
        condenser.CompressorBaseK.Should().Be(25);
        condenser.SubCoolingBaseK.Should().Be(3);
        condenser.CompressorInletMode.Should().Be("temperature");
        condenser.SubCoolingMode.Should().Be("delta_temperature");
    }
}
