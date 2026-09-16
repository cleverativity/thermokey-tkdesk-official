using AutoMapper;
using Cardano.Application.Common.Utilities;
using Cardano.Application.DTOs.Requests;
using Cardano.Application.DTOs.Responses;
using Cardano.Application.Interfaces.Repositories;
using Cardano.Domain.Entities;
using Cardano.Domain.Interfaces;

namespace Cardano.Application.Services
{
    public class ThermalStepsService : IThermalStepsService
    {
        private readonly IThermalStepsRepository _repository;
        private readonly IMapper _mapper;

        public ThermalStepsService(IThermalStepsRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            return await _repository.DeleteAsync(id);
        }

        public async Task<List<GetCondenserAndAccessoriesStepsResponse>> GetCondenserAndAccessoriesAsync(Int32 selection_id, String status)
        {
            var stepRecords = await _repository.GetCondenserAccessoriesAsync(selection_id, status);
            var result = new List<GetCondenserAndAccessoriesStepsResponse>();

            if (stepRecords != null && stepRecords.Any())
            {
                foreach (var stepData in stepRecords)
                {
                    string jsonString = stepData.data?.RootElement.GetRawText() ?? string.Empty;
                    var parsedCondenser = JsonParsingUtilities.CondenseParseFromJson(jsonString);
                    var parsedAccessories = JsonParsingUtilities.AccessoriesParseFromJson(jsonString, parsedCondenser.ModelId);

                    // Create response data based on status following the original logic
                    CondenserAndAccessoriesData responseData;

                    if (stepData.status == "solved")
                    {
                        // For solved status, only include condenser datacal
                        responseData = new CondenserAndAccessoriesData
                        {
                            Condenser = _mapper.Map<CondenserResponseDto>(parsedCondenser),
                        };
                    }
                    else
                    {
                        // For other statuses, include both accessories and condenser
                        responseData = new CondenserAndAccessoriesData
                        {
                            //Accessories = parsedAccessories,
                            Condenser = _mapper.Map<CondenserResponseDto>(parsedCondenser)
                        };

                        //Update condenser with additional data from accessories
                        //if (responseData.Condenser != null)
                        //{
                        //    responseData.Condenser.RemoteModel = parsedAccessories?.CondenserModel;
                        //}
                    }

                    // Create strongly-typed response object
                    var response = new GetCondenserAndAccessoriesStepsResponse
                    {
                        Id = stepData.Id,
                        Status = stepData.status,
                        UserId = stepData.user_id,
                        Data = responseData
                    };

                    result.Add(response);
                }
            }

            return result;
        }

        public async Task<GetCurrentStepsResponse> GetCurrentStepsAsync(Int32 selection_id)
        {
            var conSteps = await _repository.GetCurrentStepsAsync(selection_id);
            if (conSteps != null && conSteps.Any())
            {
                return _mapper.Map<GetCurrentStepsResponse>(conSteps.First());
            }
            return new GetCurrentStepsResponse();
        }

        public async Task<GetCurrentStepsResponse> AddAsync(CreateStepsRequest dto)
        {
            var con = _mapper.Map<CondenserSteps>(dto);
            var created = await _repository.AddAsync(con);
            var response = _mapper.Map<GetCurrentStepsResponse>(created);

            // Hide the Id in the response for AddAsync operation
            response.Id = 0;

            return response;
        }

    }
}