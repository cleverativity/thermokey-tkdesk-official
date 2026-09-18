using Cardano.Application.Common.Utilities;
using FluentAssertions;
using NUnit.Framework;

namespace Cardano.Tests.UnitTests.Application.Utilities;

[TestFixture]
public class RefrigerantTypeNormalizerTests
{
    [TestCase("R-134a", "R134a")]
    [TestCase("R-404A", "R404A")]
    [TestCase("R717-(NH3)", "R717(NH3)")]
    [TestCase("R-1234yf", "R1234yf")]
    public void ToDisplay_RemovesDashes(string engineName, string displayName)
    {
        RefrigerantTypeNormalizer.ToDisplay(engineName).Should().Be(displayName);
    }

    [TestCase("R134a", "R-134a")]
    [TestCase("R404A", "R-404A")]
    [TestCase("R1234yf", "R-1234yf")]
    [TestCase("R-134a", "R-134a")]
    [TestCase("R717(NH3)", "R717-(NH3)")]
    [TestCase("R717-(NH3)", "R717-(NH3)")]
    public void ToEngine_AcceptsDisplayAndLegacyNames(string input, string engineName)
    {
        RefrigerantTypeNormalizer.ToEngine(input).Should().Be(engineName);
    }
}
