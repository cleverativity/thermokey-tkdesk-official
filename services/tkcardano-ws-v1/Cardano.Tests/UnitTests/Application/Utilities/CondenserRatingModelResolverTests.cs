using Cardano.Application.Common.Utilities;
using Cardano.Domain.Entities;
using FluentAssertions;
using NUnit.Framework;

namespace Cardano.Tests.UnitTests.Application.Utilities;

[TestFixture]
public class CondenserRatingModelResolverTests
{
    private static List<Condenser> Catalog() =>
    [
        new() { Id = 1, Model = "TMC100" },
        new() { Id = 2, Model = "TMCH1150HUU" },
        new() { Id = 3, Model = "JMC200" }
    ];

    [Test]
    public void Resolve_ExactCatalogModel_ReturnsThatUnit()
    {
        var result = CondenserRatingModelResolver.Resolve(Catalog(), "tmch1150huu", out var isFullUnitName);

        result.Should().NotBeNull();
        result!.Id.Should().Be(2);
        isFullUnitName.Should().BeFalse();
    }

    [Test]
    public void Resolve_FullUnitModelName_UsesLongestCatalogPrefix()
    {
        var result = CondenserRatingModelResolver.Resolve(Catalog(), "TMCH1150HUUDV", out var isFullUnitName);

        result.Should().NotBeNull();
        result!.Model.Should().Be("TMCH1150HUU");
        isFullUnitName.Should().BeTrue();
    }

    [Test]
    public void Resolve_UnknownModel_ReturnsNull()
    {
        var result = CondenserRatingModelResolver.Resolve(Catalog(), "DOES-NOT-EXIST", out var isFullUnitName);

        result.Should().BeNull();
        isFullUnitName.Should().BeFalse();
    }

    [Test]
    public void Resolve_EmptyName_ReturnsNull()
    {
        CondenserRatingModelResolver.Resolve(Catalog(), "  ", out _).Should().BeNull();
    }
}
