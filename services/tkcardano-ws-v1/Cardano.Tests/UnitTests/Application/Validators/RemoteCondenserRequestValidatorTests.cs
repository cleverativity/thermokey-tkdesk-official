using Cardano.Application.DTOs.Requests;
using Cardano.Application.Validators;
using FluentAssertions;
using NUnit.Framework;

namespace Cardano.Tests.UnitTests.Application.Validators;

[TestFixture]
public class RemoteCondenserRequestValidatorTests
{
    private readonly RemoteCondenserRequestValidator _validator = new();

    private static RemoteCondenserRequest ValidRequest() => new()
    {
        CondenserType = "V-Type",
        CondenserModel = "All",
        FansConnection = "All~50Hz",
        AirFlowDirection = "Vertical",
        UnitsType = "si",
        Condensing = 45,
        RefrigerantType = "R134a",
        AtmosphericPress = 101325,
        SplValue = 0,
        Distance = 10,
        ThermalCapacity = 50,
        ToleranceMin = -10,
        ToleranceMax = 10,
        Compressor = 0,
        SubCooling = 3,
        DryBulb = 25
    };

    [Test]
    public void ValidRequest_WithMinAndMax_IsValid()
    {
        var result = _validator.Validate(ValidRequest());

        result.IsValid.Should().BeTrue();
    }

    [Test]
    public void PositiveToleranceMinAndMax_IsValid()
    {
        var request = ValidRequest();
        request.ToleranceMin = 10;
        request.ToleranceMax = 10;

        var result = _validator.Validate(request);

        result.IsValid.Should().BeTrue();
    }

    [Test]
    public void MissingToleranceMin_IsInvalid()
    {
        var request = ValidRequest();
        request.ToleranceMin = null;

        var result = _validator.Validate(request);

        result.IsValid.Should().BeFalse();
        result.Errors.Should().Contain(e => e.PropertyName == "ToleranceMin");
    }

    [Test]
    public void MissingToleranceMax_IsInvalid()
    {
        var request = ValidRequest();
        request.ToleranceMax = null;

        var result = _validator.Validate(request);

        result.IsValid.Should().BeFalse();
        result.Errors.Should().Contain(e => e.PropertyName == "ToleranceMax");
    }
}
