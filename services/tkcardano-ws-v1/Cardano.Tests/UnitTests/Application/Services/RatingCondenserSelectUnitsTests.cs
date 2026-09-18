using Cardano.Domain.Entities;
using Cardano.Domain.Models;
using Cardano.Infrastructure.Computation;
using FluentAssertions;
using NUnit.Framework;

namespace Cardano.Tests.UnitTests.Application.Services;

[TestFixture]
public class RatingCondenserSelectUnitsTests
{
    private readonly ThermokeyComputationEngine _engine = new();

    [Test]
    public void SelectRatedUnits_FiltersByTableSubseriesHll()
    {
        var condensers = new List<Condenser>
        {
            CreateUnit(1, "TMCH1140HLL1"),
            CreateUnit(2, "TMCH1150HUU")
        };

        var matches = _engine.SelectRatedUnits(condensers, Search(subseries: "HLL"));

        matches.Should().ContainSingle(match => match.Id == 1);
        matches[0].Subseries.Should().Be("HLL");
    }

    [Test]
    public void SelectRatedUnits_SeriesT_ExcludesJumbo()
    {
        var condensers = new List<Condenser>
        {
            CreateUnit(1, "TMCH1140HLL1"),
            CreateUnit(2, "JMCH1140HLL1")
        };

        var matches = _engine.SelectRatedUnits(condensers, Search(series: "T"));

        matches.Should().ContainSingle(match => match.Id == 1);
    }

    [Test]
    public void SelectRatedUnits_FiltersByDiameter400()
    {
        var condensers = new List<Condenser>
        {
            CreateUnit(1, "TMCH1140HLL1"),
            CreateUnit(2, "TMCH1150HUU")
        };

        var matches = _engine.SelectRatedUnits(condensers, Search(fanDiameter: 400));

        matches.Should().ContainSingle(match => match.Id == 1);
        matches[0].FanDiameter.Should().Be(400);
    }

    [Test]
    public void SelectRatedUnits_FiltersAssembledTwoModules()
    {
        var condensers = new List<Condenser>
        {
            CreateUnit(1, "TMCH1140HLL1"),
            CreateUnit(2, "2XTMCH1140HLL1")
        };

        var matches = _engine.SelectRatedUnits(condensers, Search(numberOfModules: 2));

        matches.Should().ContainSingle(match => match.Id == 2);
        matches[0].NumberOfModules.Should().Be(2);
    }

    private static RatingSearch Search(
        string? series = null,
        string? subseries = null,
        int? fanDiameter = null,
        int? numberOfModules = null)
    {
        return new RatingSearch
        {
            Series = series ?? "All",
            Subseries = subseries ?? "All",
            FanType = "AC",
            FanBrand = "All",
            FanDiameter = fanDiameter,
            NumberOfModules = numberOfModules
        };
    }

    private static Condenser CreateUnit(int id, string model)
    {
        return new Condenser
        {
            Id = id,
            Model = model,
            Series = "MC",
            Coil_Type = "25_Alu18-16-8-8-0-0",
            Num_Of_Passes = 1,
            Num_Of_Fan_Rows = 1,
            Num_Of_Fan_Per_Row = 1,
            Fan_Series = "H",
            Fan_Model = "A4E400-AP02-12",
            Vertical_Machine_Length = 1067,
            Vertical_Machine_Height = 879,
            Vertical_Machine_Width = 674,
            Machine_Weight_Vertical = 120
        };
    }
}
