using AutoMapper;
using Cardano.Application.DTOs.Requests;
using Cardano.Application.DTOs.Responses;
using Cardano.Domain.Entities;

namespace Cardano.Application.Common.Mapping
{
    public class CompanyMappingProfile : Profile
    {
        public CompanyMappingProfile()
        {
            // Used by: CompanyController.GetCompany, CompanyController.CreateCompany, CompanyController.UpdateCompany
            CreateMap<Company, CompanyResponse>()
                .ForMember(dest => dest.company, opt => opt.MapFrom(src => src.CompanyName ?? ""))
                .ForMember(dest => dest.AppDate, opt => opt.MapFrom(src => src.App_date));

            // Used by: CompanyService.CreateAsync
            CreateMap<CompanyRequest, Company>()
                .ForMember(dest => dest.CompanyName, opt => opt.MapFrom(src => src.company))
                .ForMember(dest => dest.App_date, opt => opt.MapFrom(src => src.AppDate ?? DateTime.MinValue))
                .ForMember(dest => dest.Id, opt => opt.Ignore()); // Don't map Id for creation
        }
    }
}