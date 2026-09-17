using Cardano.Application.Common.Utilities;
using Cardano.Domain.Entities;
using FluentAssertions;
using NUnit.Framework;

namespace Cardano.Tests.UnitTests.Application.Utilities;

[TestFixture]
public class CondenserSizeFilterTests
{
    [Test]
    public void Apply_WithoutLimits_ReturnsAllUnits()
    {
        var units = new[] { CreateUnit(1, 5000, 2000, 1500) };

        CondenserSizeFilter.Apply(units, null, null, null, "V-Type", "Vertical")
            .Should().HaveCount(1);
    }

    [Test]
    public void Apply_KeepsUnitAtExactLimit()
    {
        var units = new[] { CreateUnit(1, 4000, 2000, 1500) };

        CondenserSizeFilter.Apply(units, 4000, 2000, 1500, "V-Type", "Vertical")
            .Should().ContainSingle(unit => unit.Id == 1);
    }

    [Test]
    public void Apply_DropsUnitOverLength()
    {
        var units = new[]
        {
            CreateUnit(1, 4000, 1800, 1400),
            CreateUnit(2, 4100, 1800, 1400)
        };

        CondenserSizeFilter.Apply(units, 4000, null, null, "V-Type", "Vertical")
            .Select(unit => unit.Id)
            .Should().Equal(1);
    }

    [Test]
    public void Apply_UsesHorizontalDimensionsForTableType()
    {
        var unit = CreateUnit(1, verticalLength: 5000, verticalHeight: 3000, verticalWidth: 2000);
        unit.Horizontal_Machine_Length = 3000;
        unit.Horizontal_Machine_Height = 1500;
        unit.Horizontal_Machine_Width = 1200;

        CondenserSizeFilter.Fits(unit, 3500, 2000, 1500, "Table-Type", "Horizontal")
            .Should().BeTrue();
        CondenserSizeFilter.Fits(unit, 3500, 2000, 1500, "V-Type", "Vertical")
            .Should().BeFalse();
    }

    [Test]
    public void Apply_UsesOnlyProvidedAxes()
    {
        var units = new[] { CreateUnit(1, 6000, 1800, 1400) };

        CondenserSizeFilter.Apply(units, null, 2000, 1500, "V-Type", "Vertical")
            .Should().ContainSingle();
    }

    [Test]
    public void ToMillimetres_ConvertsMetresFromUi()
    {
        CondenserSizeFilter.ToMillimetres(12, "si").Should().Be(12000);
        CondenserSizeFilter.ToMillimetres(13, "si").Should().Be(13000);
        CondenserSizeFilter.ToMillimetres(12, "si").Should().Be(12000);
    }

    [Test]
    public void ToMillimetres_LeavesMillimetresUnchanged()
    {
        CondenserSizeFilter.ToMillimetres(4000, "si").Should().Be(4000);
        CondenserSizeFilter.ToMillimetres(null, "si").Should().BeNull();
    }

    [Test]
    public void Apply_AcceptsMetreLimitsAfterConversion()
    {
        var units = new[]
        {
            CreateUnit(1, 11000, 12000, 11000),
            CreateUnit(2, 13000, 12000, 11000)
        };

        var filtered = CondenserSizeFilter.Apply(
            units,
            CondenserSizeFilter.ToMillimetres(12, "si"),
            CondenserSizeFilter.ToMillimetres(13, "si"),
            CondenserSizeFilter.ToMillimetres(12, "si"),
            "V-Type",
            "Vertical");

        filtered.Select(unit => unit.Id).Should().Equal(1);
    }

    private static Condenser CreateUnit(int id, int verticalLength, int verticalHeight, int verticalWidth)
    {
        return new Condenser
        {
            Id = id,
            Vertical_Machine_Length = verticalLength,
            Vertical_Machine_Height = verticalHeight,
            Vertical_Machine_Width = verticalWidth,
            Horizontal_Machine_Length = verticalLength,
            Horizontal_Machine_Height = verticalHeight,
            Horizontal_Machine_Width = verticalWidth
        };
    }
}
