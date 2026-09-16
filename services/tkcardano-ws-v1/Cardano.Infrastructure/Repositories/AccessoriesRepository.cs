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
    public class AccessoriesRepository : IAccessoriesRepository
    {

        private readonly AppDbContext _db;

        public AccessoriesRepository(AppDbContext db)
        {
            _db = db;
        }

        public async Task<IEnumerable<Accessories>> GetAllAccessories()
        {
            return await _db.Accessories.AsNoTracking().ToListAsync();
        }

        public async Task<IEnumerable<AccessoriesItems>> GetAllAccessoriesItems()
        {
            return await _db.AccessoriesItems.AsNoTracking().ToListAsync();
        }
    }
}
