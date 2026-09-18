using Cardano.Application.DTOs.Requests;
using Cardano.Application.Validators;
using FluentAssertions;
using NUnit.Framework;

namespace Cardano.Tests.UnitTests.Application.Validators;

[TestFixture]
public class RatingRequestValidatorTests
{
    private readonly RatingRequestValidator _validator = new();

    private static RatingRequest ValidRequest() => new()
    {
        Series = "T",
        Subseries = "HLL",
        FansConnection = "All~50Hz",
        FanBrand = "All",
        DryBulb = 35,
        RelHumidity = 50,
        RefrigerantType = "R-404A",
        Condensing = 45,
        SubCooling = 5,
        ThermalCapacity = 100,
        Distance = 10
    };

    [Test]
    public void ValidRequest_WithTableSubseries_IsValid()
    {
        var result = _validator.Validate(ValidRequest());

        result.IsValid.Should().BeTrue();
    }

    [Test]
    public void Subseries_FamilyLetterT_IsInvalid()
    {
        var request = ValidRequest();
        request.Subseries = "T";

        var result = _validator.Validate(request);

        result.IsValid.Should().BeFalse();
        result.Errors.Should().Contain(e => e.PropertyName == nameof(RatingRequest.Subseries));
    }

    [Test]
    public void Subseries_Huu_IsValid()
    {
        var request = ValidRequest();
        request.Subseries = "HUU";

        _validator.Validate(request).IsValid.Should().BeTrue();
    }

    [Test]
    public void Subseries_All_IsValid()
    {
        var request = ValidRequest();
        request.Subseries = "All";

        _validator.Validate(request).IsValid.Should().BeTrue();
    }

    [Test]
    public void NumberOfModules_Four_IsInvalid()
    {
        var request = ValidRequest();
        request.NumberOfModules = 4;

        var result = _validator.Validate(request);

        result.IsValid.Should().BeFalse();
        result.Errors.Should().Contain(e => e.PropertyName == nameof(RatingRequest.NumberOfModules));
    }

    [Test]
    public void RefrigerantType_Water_IsInvalid()
    {
        var request = ValidRequest();
        request.RefrigerantType = "Water";

        var result = _validator.Validate(request);

        result.IsValid.Should().BeFalse();
        result.Errors.Should().Contain(e => e.PropertyName == nameof(RatingRequest.RefrigerantType));
    }
}
