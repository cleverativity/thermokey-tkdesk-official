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
    public class ThermokeyCalculationRepository: IThermalCalcRepository
    {
        private readonly AppDbContext _db;

        public ThermokeyCalculationRepository(AppDbContext db)
        {
            _db = db;
        }

        public async Task<IEnumerable<Accessories>> GetAllAccessories()
        {
            return await _db.Accessories.AsNoTracking().ToListAsync();
        }
    }
}
