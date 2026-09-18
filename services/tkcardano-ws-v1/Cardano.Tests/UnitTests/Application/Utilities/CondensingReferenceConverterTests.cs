using Cardano.Application.Common.Utilities;
using FluentAssertions;
using NUnit.Framework;

namespace Cardano.Tests.UnitTests.Application.Utilities;

[TestFixture]
public class CondensingReferenceConverterTests
{
    [TestCase(null, null)]
    [TestCase("", null)]
    [TestCase("ave", "ave")]
    [TestCase("AVE", "ave")]
    [TestCase("0.5", "ave")]
    [TestCase("dew", "dew")]
    [TestCase("DEW", "dew")]
    [TestCase("1", "dew")]
    [TestCase("bubble", "bubble")]
    [TestCase("0", "bubble")]
    [TestCase("middle", null)]
    public void Parse_MapsUiValuesAndQualityX(string? input, string? expected)
    {
        CondensingReferenceConverter.Parse(input).Should().Be(expected);
    }

    [Test]
    public void Ave_LeavesCondensingUnchanged()
    {
        CondensingReferenceConverter.ToEngineCondensing(40, "R-407C", "ave").Should().Be(40);
        CondensingReferenceConverter.ToEngineCondensing(40, "R-407C", "0.5").Should().Be(40);
        CondensingReferenceConverter.ToEngineCondensing(40, "R-407C", null).Should().Be(40);
    }

    [Test]
    public void Dew_SubtractsHalfGlide()
    {
        CondensingReferenceConverter.ToEngineCondensing(40, "R407C", "dew").Should().Be(37.5);
        CondensingReferenceConverter.ToEngineCondensing(40, "R407C", "1").Should().Be(37.5);
    }

    [Test]
    public void Bubble_AddsHalfGlide()
    {
        CondensingReferenceConverter.ToEngineCondensing(40, "R-407C", "bubble").Should().Be(42.5);
        CondensingReferenceConverter.ToEngineCondensing(40, "R-407C", "0").Should().Be(42.5);
    }

    [Test]
    public void PureFluid_DewAndBubbleStayUnchanged()
    {
        CondensingReferenceConverter.ToEngineCondensing(40, "R-134a", "dew").Should().Be(40);
        CondensingReferenceConverter.ToEngineCondensing(40, "R-134a", "bubble").Should().Be(40);
    }

    [TestCase("ave", true)]
    [TestCase("dew", true)]
    [TestCase("bubble", true)]
    [TestCase("0.5", true)]
    [TestCase("1", true)]
    [TestCase("0", true)]
    [TestCase(null, true)]
    [TestCase("middle", false)]
    [TestCase("x", false)]
    public void IsAllowed_AcceptsUiValuesAndQualityX(string? value, bool allowed)
    {
        CondensingReferenceConverter.IsAllowed(value).Should().Be(allowed);
    }
}
