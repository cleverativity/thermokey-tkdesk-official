using Cardano.Application.DTOs.Requests;
using Cardano.Application.Validators;
using FluentAssertions;
using NUnit.Framework;

namespace Cardano.Tests.UnitTests.Application.Validators;

[TestFixture]
public class CondenserRatingRequestValidatorTests
{
    private readonly CondenserRatingRequestValidator _validator = new();

    private static CondenserRatingRequest ValidRequest() => new()
    {
        CondenserModel = "TMCH1150HUU",
        FansConnection = "AC-Delta-3Ph-400V~50Hz",
        AirFlowDirection = "Vertical",
        UnitsType = "si",
        Condensing = 40,
        RefrigerantType = "R-404A",
        AtmosphericPress = 101.325,
        Distance = 10,
        Compressor = 25,
        SubCooling = 3,
        DryBulb = 25,
        Altitude = 0,
        RelHumidity = 50,
        CurrentUnitType = "si"
    };

    [Test]
    public void ValidRequest_WithoutCapacityOrTolerance_IsValid()
    {
        var result = _validator.Validate(ValidRequest());

        result.IsValid.Should().BeTrue();
    }

    [Test]
    public void MissingCondenserModel_IsInvalid()
    {
        var request = ValidRequest();
        request.CondenserModel = "";

        var result = _validator.Validate(request);

        result.IsValid.Should().BeFalse();
        result.Errors.Should().Contain(e => e.PropertyName == "CondenserModel");
    }

    [Test]
    public void MissingFansConnection_IsInvalid()
    {
        var request = ValidRequest();
        request.FansConnection = null;

        var result = _validator.Validate(request);

        result.IsValid.Should().BeFalse();
        result.Errors.Should().Contain(e => e.PropertyName == "FansConnection");
    }
}
