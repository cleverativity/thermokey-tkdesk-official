using Cardano.Domain.Entities;

namespace Cardano.Domain.Interfaces
{
    public interface IUnitOfMeasureRepository
    {
        Task<IReadOnlyList<UnitOfMeasure>> GetAllAsync(CancellationToken cancellationToken = default);

        Task<IReadOnlyList<UnitOfMeasureVariable>> GetVariablesAsync(CancellationToken cancellationToken = default);

        Task<IReadOnlyList<UnitOfMeasure>> GetUnitsForVariableAsync(
            string step,
            string section,
            string variable,
            CancellationToken cancellationToken = default);
    }
}
