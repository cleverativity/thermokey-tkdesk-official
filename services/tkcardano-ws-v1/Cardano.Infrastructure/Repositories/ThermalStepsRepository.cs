using Cardano.Domain.Entities;
using Cardano.Domain.Interfaces;
using Cardano.Domain.Models;
using Cardano.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Cardano.Infrastructure.Repositories
{
    public class ThermalStepsRepository : IThermalStepsRepository
    {
        private readonly AppDbContext _db;
        public ThermalStepsRepository(AppDbContext db)
        {
            _db = db;
        }

        /// <summary>
        /// Upsert by selection_id + status (any status). If duplicate rows already exist,
        /// keep the newest, update it, and remove the older copies.
        /// </summary>
        public async Task<CondenserSteps> AddAsync(CondenserSteps comp)
        {
            var status = comp.status ?? string.Empty;

            var existing = await _db.CondenserSteps
                .Where(x => x.selection_id == comp.selection_id
                            && x.status == status)
                .OrderByDescending(x => x.Id)
                .ToListAsync();

            if (existing.Count == 0)
            {
                await _db.CondenserSteps.AddAsync(comp);
                await _db.SaveChangesAsync();
                return comp;
            }

            var keep = existing[0];
            keep.user_id = comp.user_id;
            keep.data = comp.data;
            keep.status = status;
            keep.Macro_serie = comp.Macro_serie;

            if (existing.Count > 1)
            {
                _db.CondenserSteps.RemoveRange(existing.Skip(1));
            }

            await _db.SaveChangesAsync();
            return keep;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var e = await _db.CondenserSteps.FirstOrDefaultAsync(c => c.Id == id);
            if (e == null) return false;

            _db.CondenserSteps.Remove(e);
            await _db.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<CondenserSteps>> GetCondenserAccessoriesAsync(int selection_id, string status)
        {
            // One row per selection_id + status: return the newest if older duplicates remain.
            var rows = await _db.CondenserSteps.AsNoTracking()
                .Where(x => x.selection_id == selection_id && x.status == status)
                .OrderByDescending(x => x.Id)
                .ToListAsync();

            if (rows.Count <= 1)
                return rows;

            return [rows[0]];
        }


        public async Task<IEnumerable<CurrentStep>> GetCurrentStepsAsync(int selection_id)
        {
            try
            {
                return await _db.CurrentSteps
                              .FromSqlRaw("SELECT * FROM get_current_steps({0})", selection_id)
                              .AsNoTracking()
                              .ToListAsync();
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException($"Error retrieving current steps for selection_id: {selection_id}", ex);
            }
        }


    }
}
