using Cardano.Domain.Entities;
using Cardano.Domain.Interfaces;
using Cardano.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Cardano.Infrastructure.Repositories
{
    public class UnitOfMeasureRepository : IUnitOfMeasureRepository
    {
        private readonly AppDbContext _db;

        public UnitOfMeasureRepository(AppDbContext db)
        {
            _db = db;
        }

        public async Task<IReadOnlyList<UnitOfMeasure>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            return await _db.UnitOfMeasures
                .AsNoTracking()
                .ToListAsync(cancellationToken);
        }

        public async Task<IReadOnlyList<UnitOfMeasureVariable>> GetVariablesAsync(CancellationToken cancellationToken = default)
        {
            return await _db.UnitOfMeasureVariables
                .AsNoTracking()
                .ToListAsync(cancellationToken);
        }

        public async Task<IReadOnlyList<UnitOfMeasure>> GetUnitsForVariableAsync(
            string step,
            string section,
            string variable,
            CancellationToken cancellationToken = default)
        {
            var mapping = await _db.UnitOfMeasureVariables
                .AsNoTracking()
                .FirstOrDefaultAsync(
                    x => x.Step == step && x.Section == section && x.Variable == variable,
                    cancellationToken);

            if (mapping is null || mapping.UnitIds.Count == 0)
                return [];

            var ids = mapping.UnitIds;

            return await _db.UnitOfMeasures
                .AsNoTracking()
                .Where(unit => ids.Contains(unit.Id))
                .ToListAsync(cancellationToken);
        }
    }
}
