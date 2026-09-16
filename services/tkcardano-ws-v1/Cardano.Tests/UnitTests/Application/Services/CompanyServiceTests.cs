using AutoMapper;
using Cardano.Application.DTOs.Requests;
using Cardano.Application.DTOs.Responses;
using Cardano.Application.Services;
using Cardano.Domain.Entities;
using Cardano.Domain.Interfaces;
using FluentAssertions;
using Moq;
using NUnit.Framework;

namespace Cardano.Tests.UnitTests.Application.Services;

[TestFixture]
public class CompanyServiceTests
{
    private Mock<ICompanyRepository>? _repositoryMock;
    private Mock<IMapper>? _mapperMock;
    private CompanyService? _service;

    [SetUp]
    public void Setup()
    {
        _repositoryMock = new Mock<ICompanyRepository>();
        _mapperMock = new Mock<IMapper>();
        _service = new CompanyService(_repositoryMock.Object, _mapperMock.Object);
    }

    [Test]
    public async Task AddAsync_ValidRequest_ReturnsCompanyResponse()
    {
        // Arrange
        var request = new CompanyRequest
        {
            company = "Test Company",
            attention_of = "John Doe",
            city = "Test City",
            telephone = "123456789",
            fax = "987654321",
            AppDate = DateTime.Now,
            software_version = "1.0",
            offer_no = "OFFER-001",
            reference = "REF-001"
        };

        var expectedCompany = new Company
        {
            Id = 1,
            CompanyName = request.company,
            Attention_of = request.attention_of,
            City = request.city,
            Telephone = request.telephone,
            Fax = request.fax,
            App_date = request.AppDate ?? DateTime.MinValue,
            Software_version = request.software_version,
            Offer_no = request.offer_no,
            Reference = request.reference
        };

        var expectedResponse = new CompanyResponse
        {
            Id = expectedCompany.Id,
            company = expectedCompany.CompanyName,
            attention_of = expectedCompany.Attention_of,
            city = expectedCompany.City,
            telephone = expectedCompany.Telephone,
            fax = expectedCompany.Fax,
            AppDate = expectedCompany.App_date,
            software_version = expectedCompany.Software_version,
            offer_no = expectedCompany.Offer_no,
            reference = expectedCompany.Reference
        };

        _repositoryMock?.Setup(r => r.AddAsync(It.IsAny<Company>()))
                      .ReturnsAsync(expectedCompany);

        _mapperMock?.Setup(m => m.Map<CompanyResponse>(It.IsAny<Company>()))
                   .Returns(expectedResponse);

        // Act
        var result = await _service.AddAsync(request);

        // Assert
        result.Should().NotBeNull();
        result.company.Should().Be(request.company);
        result.attention_of.Should().Be(request.attention_of);
        result.city.Should().Be(request.city);

        _repositoryMock.Verify(r => r.AddAsync(It.IsAny<Company>()), Times.Once);
    }

    [Test]
    public async Task GetByIdAsync_ExistingId_ReturnsCompany()
    {
        // Arrange
        var companyId = 1;
        var expectedCompany = new Company
        {
            Id = companyId,
            CompanyName = "Test Company",
            Attention_of = "John Doe",
            City = "Test City"
        };

        var expectedResponse = new CompanyResponse
        {
            Id = expectedCompany.Id,
            company = expectedCompany.CompanyName,
            attention_of = expectedCompany.Attention_of,
            city = expectedCompany.City
        };

        _repositoryMock.Setup(r => r.GetByIdAsync(companyId))
                      .ReturnsAsync(expectedCompany);

        _mapperMock.Setup(m => m.Map<CompanyResponse>(It.IsAny<Company>()))
                   .Returns(expectedResponse);

        // Act
        var result = await _service.GetByIdAsync(companyId);

        // Assert
        result.Should().NotBeNull();
        result!.Id.Should().Be(companyId);
        result.company.Should().Be("Test Company");

        _repositoryMock.Verify(r => r.GetByIdAsync(companyId), Times.Once);
    }

    [Test]
    public async Task GetByIdAsync_NonExistingId_ReturnsNull()
    {
        // Arrange
        var companyId = 999;
        _repositoryMock.Setup(r => r.GetByIdAsync(companyId))
                      .ReturnsAsync((Company?)null);

        // Act
        var result = await _service.GetByIdAsync(companyId);

        // Assert
        result.Should().BeNull();
        _repositoryMock.Verify(r => r.GetByIdAsync(companyId), Times.Once);
    }

    [Test]
    public async Task DeleteAsync_ExistingId_ReturnsTrue()
    {
        // Arrange
        var companyId = 1;
        _repositoryMock.Setup(r => r.DeleteAsync(companyId))
                      .ReturnsAsync(true);

        // Act
        var result = await _service.DeleteAsync(companyId);

        // Assert
        result.Should().BeTrue();
        _repositoryMock.Verify(r => r.DeleteAsync(companyId), Times.Once);
    }

    [Test]
    [TestCase("")]
    [TestCase(null)]
    [TestCase("   ")]
    public async Task AddAsync_InvalidCompanyName_ShouldHandleGracefully(string? companyName)
    {
        // Arrange
        var company = new Company
        {
            Id = 1,
            CompanyName = companyName ?? string.Empty
        };

        var request = new CompanyRequest
        {
            company = companyName!,
            attention_of = "Test",
            city = "Test City"
        };

        var expectedResponse = new CompanyResponse
        {
            Id = company.Id,
            company = company.CompanyName
        };

        _repositoryMock.Setup(r => r.AddAsync(It.IsAny<Company>()))
                      .ReturnsAsync(company);

        _mapperMock.Setup(m => m.Map<CompanyResponse>(It.IsAny<Company>()))
                   .Returns(expectedResponse);

        // Act
        var result = await _service.AddAsync(request);

        // Assert
        result.Should().NotBeNull();
        result.company.Should().Be(companyName ?? string.Empty);
    }
}