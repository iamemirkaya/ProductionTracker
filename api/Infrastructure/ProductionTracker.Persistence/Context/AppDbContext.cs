using Microsoft.EntityFrameworkCore;
using ProductionTracker.Domain.Entities;
using System.Reflection;

namespace ProductionTracker.Persistence.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext() { }

        public AppDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Workshop> Workshops { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductionLog> ProductionLogs { get; set; }
        public DbSet<Shift> Shifts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}
