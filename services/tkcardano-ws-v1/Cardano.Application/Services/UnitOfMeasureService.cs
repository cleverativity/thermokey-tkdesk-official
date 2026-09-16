using Cardano.Application.DTOs.Responses;
using Cardano.Application.Interfaces.Services;
using Cardano.Domain.Entities;
using Cardano.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cardano.Application.Services
{
    public class UnitOfMeasureService : IUnitOfMeasureService
    {
        private readonly IUnitOfMeasureRepository _repository;
        public UnitOfMeasureService(IUnitOfMeasureRepository repository)
        {
            _repository = repository;
        }
        public async Task<IReadOnlyList<UnitOfMeasureResponse>> GetAllAsync(
            CancellationToken cancellationToken = default)
        {
            var units = await _repository.GetAllAsync(cancellationToken);
            return units.Select(ToResponse).ToList();
        }
        public async Task<IReadOnlyList<UnitOfMeasureVariableResponse>> GetVariablesAsync(
            CancellationToken cancellationToken = default)
        {
            var variables = await _repository.GetVariablesAsync(cancellationToken);
            return variables.Select(ToResponse).ToList();
        }
        public async Task<IReadOnlyList<UnitOfMeasureResponse>> GetUnitsForVariableAsync(
            string step,
            string section,
            string variable,
            CancellationToken cancellationToken = default)
        {
            var units = await _repository.GetUnitsForVariableAsync(
                step, section, variable, cancellationToken);
            return units.Select(ToResponse).ToList();
        }
        private static UnitOfMeasureResponse ToResponse(UnitOfMeasure unit) => new()
        {
            Id = unit.Id,
            Name = unit.Name,
            Type = unit.Type,
            Factor = unit.Factor,
            Delta = unit.Delta,
            DecimalPlaces = unit.DecimalPlaces
        };
        private static UnitOfMeasureVariableResponse ToResponse(UnitOfMeasureVariable variable) => new()
        {
            Id = variable.Id,
            Step = variable.Step,
            Section = variable.Section,
            Variable = variable.Variable,
            UnitIds = variable.UnitIds
        };
    }
}
