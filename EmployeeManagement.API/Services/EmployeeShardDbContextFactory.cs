using EmployeeManagement.API.Data;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagement.API.Services
{
    public class EmployeeShardDbContextFactory
    {
        private readonly IConfiguration _configuration;

        public EmployeeShardDbContextFactory(
            IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public EmployeeShardDbContext CreateForEmployee(int employeeId)
        {
            if (employeeId <= 0)
            {
                throw new ArgumentOutOfRangeException(nameof(employeeId));
            }

            var connectionName = employeeId % 2 == 0
                ? "EmployeeShard2"
                : "EmployeeShard1";

            var connectionString =
                _configuration.GetConnectionString(connectionName)
                ?? throw new InvalidOperationException(
                    $"Connection string '{connectionName}' was not found.");

            var options =
                new DbContextOptionsBuilder<EmployeeShardDbContext>()
                    .UseSqlServer(connectionString)
                    .Options;

            return new EmployeeShardDbContext(options);
        }

        public EmployeeShardDbContext CreateForShard(int shardNumber)
        {
            if (shardNumber is not (1 or 2))
            {
                throw new ArgumentOutOfRangeException(nameof(shardNumber));
            }

            var connectionName = shardNumber == 1
                ? "EmployeeShard1"
                : "EmployeeShard2";

            var connectionString =
                _configuration.GetConnectionString(connectionName)
                ?? throw new InvalidOperationException(
                    $"Connection string '{connectionName}' was not found.");

            var options =
                new DbContextOptionsBuilder<EmployeeShardDbContext>()
                    .UseSqlServer(connectionString)
                    .Options;

            return new EmployeeShardDbContext(options);
        }
    }
}