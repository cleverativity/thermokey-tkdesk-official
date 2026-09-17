using AutoMapper;
using Cardano.Application.Common.Utilities;
using Cardano.Application.DTOs.Requests;
using Cardano.Application.DTOs.Responses;
using Cardano.Application.Interfaces.Repositories;
using Cardano.Application.Interfaces.Computation;

using Cardano.Computation;
using Cardano.Domain.Interfaces;
using Cardano.Domain.Models;
using Microsoft.Extensions.Logging;
using System;
using System.Text.Json.Serialization;

namespace Cardano.Application.Services
{
    public class ThermalAdjustmentService : IThermalAdjustmentService
    {
        private readonly AdjustmentCapacity _adjustmentCapacity;
        private readonly AdjustmentFan _adjustmentFan;
        private readonly EAnalysis _eAnalysis;

        private readonly ICondenserRepository _condenserRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<ThermalAdjustmentService> _logger;

        public ThermalAdjustmentService(
            ICondenserRepository condenserRepository,
            IUnitTypeConverterRepository unitTypeConverter,
            IMapper mapper,
            ILogger<ThermalAdjustmentService> logger)
        {
            _adjustmentCapacity = new AdjustmentCapacity(unitTypeConverter);
            _adjustmentFan = new AdjustmentFan(unitTypeConverter);
            _eAnalysis = new EAnalysis();

            _condenserRepository = condenserRepository;
            _mapper = mapper;
            _logger = logger;
        }

        public AdjustQuery adjustMap(ThermalAdjustmentRequest dto)
        {
            return new AdjustQuery
            {
                ModelId = dto.ModelId,
                RemoteModel = dto.RemoteModel,
                RefrigerantType = RefrigerantTypeNormalizer.ToEngine(dto.RefrigerantType),
                UnitsType = dto.UnitsType,
                Condensing = dto.Condensing,
                PercentAdjustment = dto.PercentAdjustment,
                Compressor = dto.Compressor,
                SubCooling = dto.SubCooling,
                DryBulb = dto.DryBulb,
                AtmosphericPress = dto.AtmosphericPress,
            };
        }

        public EAQuery EAMap(EAnalysisRequest dto)
        {
            return new EAQuery
            {
                CondenserId = dto.CondenserId,
                CondenserModel = dto.CondenserModel,
                IsCalculateCapacity = dto.IsCalculateCapacity,
                IsCalculateAirFlow = dto.IsCalculateAirFlow,
                IsSingleCaculation = dto.IsSingleCaculation,
                IntEACurrentFixCapacity = dto.IntEACurrentFixCapacity,
                IntEANewFixCapacity = dto.IntEANewFixCapacity,
                IntEAStartingAir = dto.IntEAStartingAir,
                IntEAInletAirTemp = dto.IntEAInletAirTemp,
                IntEAFinalAir = dto.IntEAFinalAir,
                IntEAStep = dto.IntEAStep,
                IntEADistance = dto.IntEADistance,
                IntEACondensingTemp = dto.IntEACondensingTemp,
                Distance = dto.Distance,
                FlowDirection = dto.FlowDirection,
                refRigerantType = RefrigerantTypeNormalizer.ToEngine(dto.refRigerantType),
                AirflowRate = dto.AirflowRate,
                Rpm = dto.Rpm,
                NoOfFans = dto.NoOfFans,
                Power = dto.Power,
                CurrentFan = dto.CurrentFan,
                TubeVolume = dto.TubeVolume,
                Weight = dto.Weight,
                DiameterInlet = dto.DiameterInlet,
                DiameterOutlet = dto.DiameterOutlet,
                Price = dto.Price,
                SubCooling = dto.SubCooling,
                Compressor = dto.Compressor,
                AtmPressureInMetric = dto.AtmPressureInMetric,
                Condensing = dto.Condensing,
                DryBulb = dto.DryBulb
            };
        }

        public async Task<List<ThermalAdjustCapacityResponse>> GetCapacityAdjustmentAsync(ThermalAdjustmentRequest dto)
        {
            try
            {
                _logger.LogInformation("Starting capacity adjustment calculation for ModelId: {ModelId}, RemoteModel: {RemoteModel}",
                    dto.ModelId, dto.RemoteModel);

                var con = (await _condenserRepository.GetAllCondenser()).ToList();
                var adjResponse = adjustMap(dto);

                var result = _adjustmentCapacity.GetCapacityAdjustment(con, adjResponse);
                var response = _mapper.Map<List<ThermalAdjustCapacityResponse>>(result);

                _logger.LogInformation("Successfully completed capacity adjustment calculation. Results count: {Count}",
                    response.Count);

                return response;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex,
                    "Error occurred while calculating capacity adjustment. ModelId: {ModelId}, RemoteModel: {RemoteModel}, RefrigerantType: {RefrigerantType}",
                    dto.ModelId, dto.RemoteModel, dto.RefrigerantType);
                throw;
            }
        }

        public async Task<List<EAnalysisResponse>> GetEAnalysisAsync(EAnalysisRequest dto)
        {
            try
            {
                var con = (await _condenserRepository.GetAllCondenser()).ToList();
                var eAResponse = EAMap(dto);

                var result = _eAnalysis.GetCalculateEnergyAnalysis(con, eAResponse);
                var response = _mapper.Map<List<EAnalysisResponse>>(result);

                _logger.LogInformation("Successfully completed Energy Analysis calculation. Results count: {Count}",
                    response.Count);

                return response;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex,
                    "Error occurred while calculating fan adjustment. ");
                throw;
            }
        }

        public async Task<List<ThermalAdjustFanResponse>> GetFanAdjustmentAsync(ThermalAdjustmentRequest dto)
        {
            try
            {
                var con = (await _condenserRepository.GetAllCondenser()).ToList();
                var adjResponse = adjustMap(dto);

                var result = _adjustmentFan.GetFanFlowAdjustment(con, adjResponse);
                var response = _mapper.Map<List<ThermalAdjustFanResponse>>(result);

                _logger.LogInformation("Successfully completed fan adjustment calculation. Results count: {Count}",
                    response.Count);

                return response;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex,
                    "Error occurred while calculating fan adjustment. ModelId: {ModelId}, RemoteModel: {RemoteModel}, RefrigerantType: {RefrigerantType}",
                    dto.ModelId, dto.RemoteModel, dto.RefrigerantType);
                throw;
            }
        }
    }
}