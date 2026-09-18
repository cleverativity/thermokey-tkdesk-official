using Cardano.Application.Common.Utilities;
using FluentAssertions;
using NUnit.Framework;

namespace Cardano.Tests.UnitTests.Application.Utilities;

[TestFixture]
public class FansConnectionMapperTests
{
    [TestCase(null, "All")]
    [TestCase("", "All")]
    [TestCase("All~50Hz", "All")]
    [TestCase("All-AC~50Hz", "AC")]
    [TestCase("AC-Delta-3Ph-400V~50Hz", "AC")]
    [TestCase("AC-Star-3Ph-400V~50Hz", "AC")]
    [TestCase("AC-1Ph-230V~50Hz", "AC")]
    [TestCase("All-EC~50Hz", "EC")]
    [TestCase("EC-3Ph-400V-(B1)~50Hz", "EC")]
    [TestCase("EC-3Ph-400V-(B2)~50Hz", "EC")]
    [TestCase("EC-1Ph-230V~50Hz", "EC")]
    [TestCase("EC-(B1)~50Hz", "EC")]
    [TestCase("EC-(B2)~50Hz", "EC")]
    public void ToFanType_MapsConnectionName(string? fansConnection, string fanType)
    {
        FansConnectionMapper.ToFanType(fansConnection).Should().Be(fanType);
    }

    [TestCase("EC-(B1)~50Hz", "All", "EBM Papst")]
    [TestCase("EC-3Ph-400V-(B1)~50Hz", "Ziehl-Abegg", "EBM Papst")]
    [TestCase("EC-(B2)~50Hz", "All", "Ziehl-Abegg")]
    [TestCase("EC-3Ph-400V-(B2)~50Hz", "EBM Papst", "Ziehl-Abegg")]
    [TestCase("All-EC~50Hz", "EBM Papst", "EBM Papst")]
    [TestCase("All-AC~50Hz", null, "All")]
    public void ToFanBrand_UsesB1B2OrRequestedBrand(string fansConnection, string? requestedBrand, string fanBrand)
    {
        FansConnectionMapper.ToFanBrand(fansConnection, requestedBrand).Should().Be(fanBrand);
    }

    [Test]
    public void IsAllowed_AcceptsLookupValues()
    {
        FansConnectionMapper.IsAllowed("ac-delta-3ph-400v~50hz").Should().BeTrue();
        FansConnectionMapper.IsAllowed("AC").Should().BeFalse();
    }
}
