using Cardano.Application.Common.Utilities;
using FluentAssertions;
using NUnit.Framework;

namespace Cardano.Tests.UnitTests.Application.Utilities;

[TestFixture]
public class ToleranceBoundsTests
{
    [Test]
    public void Resolve_LegacyTolerance_UsesSymmetricBand()
    {
        var (min, max) = ToleranceBounds.Resolve(10, null, null);

        min.Should().Be(-10);
        max.Should().Be(10);
    }

    [Test]
    public void Resolve_MinAndMax_UsesSignedPercents()
    {
        var (min, max) = ToleranceBounds.Resolve(0, -10, 10);

        min.Should().Be(-10);
        max.Should().Be(10);
    }

    [Test]
    public void Resolve_MinAndMax_TakesPrecedenceOverTolerance()
    {
        var (min, max) = ToleranceBounds.Resolve(25, -5, 15);

        min.Should().Be(-5);
        max.Should().Be(15);
    }
}
