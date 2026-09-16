using Cardano.Application.DTOs.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cardano.Application.Interfaces.Services
{
    public interface IUnitOfMeasureService
    {
        Task<IReadOnlyList<UnitOfMeasureResponse>> GetAllAsync(
            CancellationToken cancellationToken = default);
        Task<IReadOnlyList<UnitOfMeasureVariableResponse>> GetVariablesAsync(
            CancellationToken cancellationToken = default);
        Task<IReadOnlyList<UnitOfMeasureResponse>> GetUnitsForVariableAsync(
            string step,
            string section,
            string variable,
            CancellationToken cancellationToken = default);
    }
}
