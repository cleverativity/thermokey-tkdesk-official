using Cardano.Application.Common.Utilities;
using FluentAssertions;
using NUnit.Framework;

namespace Cardano.Tests.UnitTests.Application.Utilities;

[TestFixture]
public class ToleranceBoundsTests
{
    [Test]
    public void Resolve_MinAndMax_UsesProvidedPercents()
    {
        var (min, max) = ToleranceBounds.Resolve(-10, 10);

        min.Should().Be(-10);
        max.Should().Be(10);
    }

    [Test]
    public void Resolve_MissingValues_DefaultsToZero()
    {
        var (min, max) = ToleranceBounds.Resolve(null, null);

        min.Should().Be(0);
        max.Should().Be(0);
    }
}
