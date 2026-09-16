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
    public class CompanyRepository : ICompanyRepository
    {
        private readonly AppDbContext _db;

        public CompanyRepository(AppDbContext db)
        {
            _db = db;
        }

        public async Task<Company> AddAsync(Company comp)
        {
            await _db.Company.AddAsync(comp);
            await _db.SaveChangesAsync();
            return comp;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var e = await _db.Company.FirstOrDefaultAsync(c => c.Id == id);
            if (e == null) return false;

            _db.Company.Remove(e);
            await _db.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<Company>> GetAllAsync()
        {
            return await _db.Company.AsNoTracking().ToListAsync();
        }

        public async Task<Company?> GetByIdAsync(int id)
        {
            return await _db.Company.FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<Company> UpdateAsync(Company comp)
        {
            _db.Entry(comp).State = EntityState.Modified;
            await _db.SaveChangesAsync();
            return comp;
        }
    }
}
