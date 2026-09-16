using Cardano.Domain.Entities;
using Cardano.Domain.Interfaces;
using Cardano.Domain.Models;
using Cardano.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cardano.Infrastructure.Repositories
{
    public class ThermalStepsRepository : IThermalStepsRepository
    {
        private readonly AppDbContext _db;
        public ThermalStepsRepository(AppDbContext db)
        {
            _db = db;
        }

        public async Task<CondenserSteps> AddAsync(CondenserSteps comp)
        {
            await _db.CondenserSteps.AddAsync(comp);
            await _db.SaveChangesAsync();
            return comp;
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
            return await _db.CondenserSteps.AsNoTracking().Where(x => x.selection_id == selection_id && x.status == status).ToListAsync();
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
