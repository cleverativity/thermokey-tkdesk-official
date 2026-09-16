using Cardano.Domain.Entities;
using Cardano.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Cardano.Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }

        public DbSet<Company> Company { get; set; }
        public DbSet<Condenser> Condenser { get; set; }
        public DbSet<CondenserType> CondenserType { get; set; }
        public DbSet<FanConnection> FanConnection { get; set; }
        public DbSet<CondenserRefType> CondenserRefType { get; set; }
        public DbSet<Accessories> Accessories { get; set; }
        public DbSet<AccessoriesItems> AccessoriesItems { get; set; }
        public DbSet<CondenserSteps> CondenserSteps { get; set; }
        public DbSet<CurrentStep> CurrentSteps { get; set; }
        public DbSet<UnitOfMeasure> UnitOfMeasures { get; set; }
        public DbSet<UnitOfMeasureVariable> UnitOfMeasureVariables { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
        }
    }
}
