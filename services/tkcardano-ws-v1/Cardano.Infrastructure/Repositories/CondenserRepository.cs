using Cardano.Domain.Entities;
using Cardano.Domain.Interfaces;
using Cardano.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cardano.Infrastructure.Repositories
{
    public class CondenserRepository : ICondenserRepository
    {
        private readonly AppDbContext _db;

        public CondenserRepository(AppDbContext db)
        {
            _db = db;
        }

        public async Task<IEnumerable<Condenser>> GetAllCondenser()
        {
            return await _db.Condenser.AsNoTracking().ToListAsync();
        }
    }
}

