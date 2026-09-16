using AutoMapper;
using Cardano.Application.DTOs.Responses;
using Cardano.Domain.Entities;
using Cardano.Domain.Models;

namespace Cardano.Application.Common.Mapping
{
    public class AccessoriesMappingProfile : Profile
    {
        public AccessoriesMappingProfile()
        {
            // Used by: AccessoriesService.GetAccessoriesItemPerModel
            CreateMap<AccessoriesItems, AccessoriesResponse>();

            // Used by: AccessoriesService.GetSelectedAccessoriesPerModel
            CreateMap<AccessoriesDetails, AccessoriesSelectedResponse>();


            //CreateMap<AccessoriesWithPrice, AccessoriesWithPriceResponse>();
            // Map nested AccessoriesItemList to AccessoriesItem
            CreateMap<AccessoriesItemList, AccessoriesItem>()
                .ForMember(dest => dest.Price, opt => opt.MapFrom(src => (decimal)src.Price));

            CreateMap<Cardano.Domain.Models.AccessoryCatalogItem, DTOs.Responses.AccessoryCatalogItem>();

            //CreateMap<AccessoriesWithPrice, AccessoriesWithPriceResponse>()
            //        .ForMember(dest => dest.AccessoriesItems, opt => opt.MapFrom(src => src.AccessoriesItems));
            //                CreateMap<AccessoriesItemList, Cardano.Application.DTOs.Responses.AccessoryCatalogItem>()
            //                   .ForMember(d => d.Id, o => o.MapFrom(s => s.Id))
            //                   .ForMember(d => d.Item, o => o.MapFrom(s => s.Item))
            //                   .ForMember(d => d.Price, o => o.MapFrom(s => s.Price));
        }
  
    }
}