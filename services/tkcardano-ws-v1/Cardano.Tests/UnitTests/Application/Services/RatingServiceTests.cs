using Cardano.Application.DTOs.Requests;
using Cardano.Application.Interfaces.Computation;
using Cardano.Application.Services;
using Cardano.Domain.Entities;
using Cardano.Domain.Interfaces;
using Cardano.Domain.Models;
using FluentAssertions;
using Moq;
using NUnit.Framework;

namespace Cardano.Tests.UnitTests.Application.Services;

[TestFixture]
public class RatingServiceTests
{
    private Mock<ICondenserRepository> _condenserRepository = null!;
    private Mock<IThermalComputationEngine> _engine = null!;
    private RatingService _service = null!;

    [SetUp]
    public void Setup()
    {
        _condenserRepository = new Mock<ICondenserRepository>();
        _engine = new Mock<IThermalComputationEngine>();
        _service = new RatingService(_condenserRepository.Object, _engine.Object);
    }

    private static RatingRequest Request() => new()
    {
        Series = "T",
        FansConnection = "All-EC~50Hz",
        FanBrand = "EBM Papst",
        DryBulb = 25,
        RelHumidity = 50,
        Altitude = 0,
        RefrigerantType = "R-404A",
        Condensing = 40,
        SubCooling = 3,
        Distance = 10
    };

    [Test]
    public async Task RateAsync_EmptyEngineResult_ReturnsEmptyPage_AndCallsSelectRatedUnits()
    {
        var condensers = new List<Condenser>
        {
            new() { Id = 1, Model = "TMCH1150HUU" }
        };
        _condenserRepository.Setup(x => x.GetAllCondenser()).ReturnsAsync(condensers);
        _engine.Setup(x => x.SelectRatedUnits(It.IsAny<IList<Condenser>>(), It.IsAny<RatingSearch>()))
            .Returns(new List<RatingMatch>());

        var result = await _service.RateAsync(Request(), 1, 10);

        result.Results.Should().BeEmpty();
        result.TotalCount.Should().Be(0);
        _engine.Verify(x => x.SelectRatedUnits(
            It.IsAny<IList<Condenser>>(),
            It.Is<RatingSearch>(s =>
                s.Series == "T" &&
                s.FanType == "EC" &&
                s.FanBrand == "EBM Papst" &&
                s.RefrigerantType == "R-404A" &&
                s.ThermalCapacityKw == null &&
                s.DistanceM == 10)), Times.Once);
        _engine.Verify(x => x.CalculateRatedUnit(
            It.IsAny<IList<Condenser>>(),
            It.IsAny<RatingSearch>(),
            It.IsAny<int>()), Times.Never);
    }

    [Test]
    public async Task RateAsync_KnownUnits_MapsModelWithoutSelectionCapacityFilter()
    {
        var condensers = new List<Condenser>
        {
            new() { Id = 1, Model = "JMC100" },
            new() { Id = 2, Model = "TMCH1150HUU" }
        };
        _condenserRepository.Setup(x => x.GetAllCondenser()).ReturnsAsync(condensers);
        _engine.Setup(x => x.SelectRatedUnits(It.IsAny<IList<Condenser>>(), It.IsAny<RatingSearch>()))
            .Returns(new List<RatingMatch>
            {
                new()
                {
                    Id = 2,
                    ModelId = 2,
                    ModelCode = "TMCH1150HUUB1",
                    FanDrive = "EC",
                    FanBrand = "EBM Papst"
                }
            });

        var result = await _service.RateAsync(Request(), 1, 10);

        result.Results.Should().ContainSingle(r =>
            r.Id == 2 && r.Identification.ModelCode == "TMCH1150HUUB1");
        _engine.Verify(x => x.SelectRatedUnits(
            It.IsAny<IList<Condenser>>(),
            It.Is<RatingSearch>(s =>
                s.FanSpeedValue == 100 &&
                s.FanSpeedUnit == "%" &&
                s.ThermalCapacityKw == null &&
                s.CondensingC == 40 &&
                s.DryBulbC == 25)), Times.Once);
    }

    [Test]
    public async Task CalculateAsync_UnknownId_ReturnsNull()
    {
        _condenserRepository.Setup(x => x.GetAllCondenser()).ReturnsAsync(new List<Condenser>
        {
            new() { Id = 2, Model = "TMCH1150HUU" }
        });
        _engine.Setup(x => x.CalculateRatedUnit(
                It.IsAny<IList<Condenser>>(),
                It.IsAny<RatingSearch>(),
                It.IsAny<int>()))
            .Returns((RatingMatch?)null);

        var result = await _service.CalculateAsync(new RatingCalculationRequest
        {
            Id = 99,
            FansConnection = "All-EC~50Hz",
            FanBrand = "EBM Papst",
            DryBulb = 25,
            Condensing = 40,
            RefrigerantType = "R-404A"
        });

        result.Should().BeNull();
    }

    [Test]
    public async Task CalculateAsync_KnownUnit_ReturnsMappedCalculation()
    {
        var condensers = new List<Condenser>
        {
            new() { Id = 2, Model = "TMCH1150HUU" }
        };
        _condenserRepository.Setup(x => x.GetAllCondenser()).ReturnsAsync(condensers);
        _engine.Setup(x => x.CalculateRatedUnit(
                It.IsAny<IList<Condenser>>(),
                It.IsAny<RatingSearch>(),
                2))
            .Returns(new RatingMatch
            {
                Id = 2,
                ModelId = 2,
                ModelCode = "TMCH1150HUUB1",
                CalculatedCapacity = 12.5,
                FanDrive = "EC",
                FanBrand = "EBM Papst"
            });

        var result = await _service.CalculateAsync(new RatingCalculationRequest
        {
            Id = 2,
            ModelId = 2,
            FansConnection = "All-EC~50Hz",
            FanBrand = "EBM Papst",
            DryBulb = 25,
            Condensing = 40,
            RefrigerantType = "R-404A"
        });

        result.Should().NotBeNull();
        result!.Id.Should().Be(2);
        result.ModelCode.Should().Be("TMCH1150HUUB1");
        result.PerformanceData.Capacity.Should().Be(12.5);
        _engine.Verify(x => x.CalculateRatedUnit(
            It.IsAny<IList<Condenser>>(),
            It.Is<RatingSearch>(s => s.FanType == "EC" && s.FanBrand == "EBM Papst"),
            2), Times.Once);
    }

    [Test]
    public async Task RateAsync_B1Connection_MapsToEcAndEbmBrand()
    {
        _condenserRepository.Setup(x => x.GetAllCondenser()).ReturnsAsync(new List<Condenser>
        {
            new() { Id = 1, Model = "TMCH1150HUU" }
        });
        _engine.Setup(x => x.SelectRatedUnits(It.IsAny<IList<Condenser>>(), It.IsAny<RatingSearch>()))
            .Returns(new List<RatingMatch>());

        var request = Request();
        request.FansConnection = "EC-(B1)~50Hz";
        request.FanBrand = "All";

        await _service.RateAsync(request, 1, 10);

        _engine.Verify(x => x.SelectRatedUnits(
            It.IsAny<IList<Condenser>>(),
            It.Is<RatingSearch>(s => s.FanType == "EC" && s.FanBrand == "EBM Papst")), Times.Once);
    }

    [Test]
    public async Task RateAsync_AllAcConnection_MapsToAc()
    {
        _condenserRepository.Setup(x => x.GetAllCondenser()).ReturnsAsync(new List<Condenser>
        {
            new() { Id = 1, Model = "TMCH1150HUU" }
        });
        _engine.Setup(x => x.SelectRatedUnits(It.IsAny<IList<Condenser>>(), It.IsAny<RatingSearch>()))
            .Returns(new List<RatingMatch>());

        var request = Request();
        request.FansConnection = "All-AC~50Hz";
        request.FanBrand = "All";

        await _service.RateAsync(request, 1, 10);

        _engine.Verify(x => x.SelectRatedUnits(
            It.IsAny<IList<Condenser>>(),
            It.Is<RatingSearch>(s => s.FanType == "AC" && s.FanBrand == "All")), Times.Once);
    }
}
