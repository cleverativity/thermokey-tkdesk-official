using AutoMapper;
using Cardano.Application.DTOs.Requests;
using Cardano.Application.DTOs.Responses;
using Cardano.Domain.Entities;
using Cardano.Domain.Models;
using System.Text.Json;

namespace Cardano.Application.Common.Mapping
{
    public class ThermalStepsMappingProfile : Profile
    {
        public ThermalStepsMappingProfile()
        {
            // Used by: ThermalStepsService.GetCurrentStepsAsync - CurrentStep mapping
            CreateMap<CurrentStep, GetCurrentStepsResponse>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.status))
                .ForMember(dest => dest.User_id, opt => opt.MapFrom(src => src.user_id))
                .ForMember(dest => dest.Macro_serie, opt => opt.MapFrom(src => src.macro_serie))
                .ForMember(dest => dest.Thermal_id, opt => opt.MapFrom(src => src.thermal_id));

            // Used by: ThermalStepsService.GetCurrentStepsAsync and AddAsync - CondenserSteps from repository
            CreateMap<CondenserSteps, GetCurrentStepsResponse>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.status))
                .ForMember(dest => dest.User_id, opt => opt.MapFrom(src => src.user_id))
                .ForMember(dest => dest.Macro_serie, opt => opt.MapFrom(src => src.Macro_serie))
                .ForMember(dest => dest.Thermal_id, opt => opt.MapFrom(src => src.selection_id));

            // Used by: ThermalStepsService.GetCondenserAndAccessoriesAsync
            CreateMap<GetCondenserAndAccessoriesStepsResponse.Condenser, CondenserResponseDto>();

            // Used by: ThermalStepsService.AddAsync - Map request DTO to entity
            CreateMap<CreateStepsRequest, CondenserSteps>()
                .ForMember(dest => dest.user_id, opt => opt.MapFrom(src => src.User_id))
                .ForMember(dest => dest.status, opt => opt.MapFrom(src => src.Status))
                .ForMember(dest => dest.selection_id, opt => opt.MapFrom(src => src.Selection_id))
                .ForMember(dest => dest.Macro_serie, opt => opt.MapFrom(src => src.Macro_serie))
                .ForMember(dest => dest.data, opt => opt.MapFrom(src => ConvertToJsonDocument(src.Data)))
                .ForMember(dest => dest.Id, opt => opt.Ignore()); // Auto-generated

        }

        private static JsonDocument? ConvertToJsonDocument(object? data)
        {
            if (data == null) return null;

            var jsonString = JsonSerializer.Serialize(data);
            return JsonDocument.Parse(jsonString);
        }

        private static object? ConvertJsonDocumentToObject(JsonDocument? jsonDocument)
        {
            if (jsonDocument == null) return null;

            return JsonSerializer.Deserialize<object>(jsonDocument.RootElement.GetRawText());
        }
    }
}