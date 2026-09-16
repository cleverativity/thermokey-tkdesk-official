using Cardano.Domain.Entities;
using Cardano.Domain.Interfaces;
using Cardano.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cardano.Infrastructure.Repositories
{
    public class ThermalRepository : IThermalTypesRepository
    {
        private readonly AppDbContext _db;

        public ThermalRepository(AppDbContext db)
        {
            _db = db;
        }

        public async Task<IEnumerable<CondenserRefType>> GetAllCondenserRefType()
        {
            return await _db.CondenserRefType.AsNoTracking().ToListAsync();
        }

        public async Task<IEnumerable<CondenserType>> GetAllCondenserType()
        {
            return await _db.CondenserType.AsNoTracking().ToListAsync();
        }

        public async Task<IEnumerable<FanConnection>> GetAllFanConnection()
        {
            return await _db.FanConnection.AsNoTracking().ToListAsync();
        }


    }
}
