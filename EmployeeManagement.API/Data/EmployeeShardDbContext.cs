using EmployeeManagement.API.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagement.API.Data
{
    public class EmployeeShardDbContext : DbContext
    {
        public EmployeeShardDbContext(
            DbContextOptions<EmployeeShardDbContext> options)
            : base(options)
        {
        }

        public DbSet<Employee> Employees => Set<Employee>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>(entity =>
            {
                entity.HasKey(e => e.Id);

                // IDs are assigned by the application so that
                // the same shard key rule is used consistently.
                entity.Property(e => e.Id)
                      .ValueGeneratedNever();

                entity.Property(e => e.EmployeeCode).IsRequired();
                entity.Property(e => e.Name).IsRequired();
                entity.Property(e => e.Email).IsRequired();
                entity.Property(e => e.Phone).IsRequired();
                entity.Property(e => e.Department).IsRequired();
                entity.Property(e => e.Designation).IsRequired();
            });
        }
    }
}