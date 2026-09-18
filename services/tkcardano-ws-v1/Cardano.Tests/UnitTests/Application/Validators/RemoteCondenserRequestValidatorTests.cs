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
        CondenserType = "All",
        FansConnection = "All~50Hz",
        AirFlowDirection = "Vertical",
        UnitsType = "si",
        Condensing = 45,
        RefrigerantType = "R-134a",
        AtmosphericPress = 101.325,
        MaxSoundPressure = 65,
        Distance = 10,
        ThermalCapacity = 50,
        Tolerance = 10,
        Compressor = 25,
        SubCooling = 3,
        DryBulb = 25
    };

    [Test]
    public void ValidRequest_WithTolerance_IsValid()
    {
        var result = _validator.Validate(ValidRequest());

        result.IsValid.Should().BeTrue();
    }

    [Test]
    public void ValidRequest_WithMinAndMax_IsValid()
    {
        var request = ValidRequest();
        request.Tolerance = 0;
        request.ToleranceMin = -10;
        request.ToleranceMax = 10;

        var result = _validator.Validate(request);

        result.IsValid.Should().BeTrue();
    }

    [Test]
    public void OnlyMin_IsInvalid()
    {
        var request = ValidRequest();
        request.ToleranceMin = -10;

        var result = _validator.Validate(request);

        result.IsValid.Should().BeFalse();
        result.Errors.Should().Contain(e => e.ErrorMessage.Contains("both be provided"));
    }

    [Test]
    public void MinGreaterThanMax_IsInvalid()
    {
        var request = ValidRequest();
        request.ToleranceMin = 10;
        request.ToleranceMax = -10;

        var result = _validator.Validate(request);

        result.IsValid.Should().BeFalse();
        result.Errors.Should().Contain(e => e.ErrorMessage.Contains("cannot be greater"));
    }

    [Test]
    public void NegativeEsp_IsInvalid()
    {
        var request = ValidRequest();
        request.Esp = -1;

        var result = _validator.Validate(request);

        result.IsValid.Should().BeFalse();
        result.Errors.Should().Contain(e => e.PropertyName == "Esp");
    }

    [Test]
    public void ZeroEsp_IsValid()
    {
        var request = ValidRequest();
        request.Esp = 0;

        _validator.Validate(request).IsValid.Should().BeTrue();
    }

    [Test]
    public void NegativeMaxSoundPower_IsInvalid()
    {
        var request = ValidRequest();
        request.MaxSoundPower = -1;

        var result = _validator.Validate(request);

        result.IsValid.Should().BeFalse();
        result.Errors.Should().Contain(e => e.PropertyName == "MaxSoundPower");
    }

    [Test]
    public void NegativeNoiseTolerance_IsInvalid()
    {
        var request = ValidRequest();
        request.NoiseTolerance = -1;

        var result = _validator.Validate(request);

        result.IsValid.Should().BeFalse();
        result.Errors.Should().Contain(e => e.PropertyName == "NoiseTolerance");
    }

    [TestCase("ave")]
    [TestCase("dew")]
    [TestCase("bubble")]
    [TestCase("0.5")]
    [TestCase("1")]
    [TestCase("0")]
    [TestCase(null)]
    public void CondensingReference_KnownValues_AreValid(string? reference)
    {
        var request = ValidRequest();
        request.CondensingReference = reference;

        _validator.Validate(request).IsValid.Should().BeTrue();
    }

    [Test]
    public void CondensingReference_UnknownValue_IsInvalid()
    {
        var request = ValidRequest();
        request.CondensingReference = "x";

        var result = _validator.Validate(request);

        result.IsValid.Should().BeFalse();
        result.Errors.Should().Contain(e => e.PropertyName == "CondensingReference");
    }

    [Test]
    public void CondensingReference_Middle_IsInvalid()
    {
        var request = ValidRequest();
        request.CondensingReference = "middle";

        var result = _validator.Validate(request);

        result.IsValid.Should().BeFalse();
        result.Errors.Should().Contain(e => e.PropertyName == "CondensingReference");
    }
}
