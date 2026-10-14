using System.Data;
using EmployeeManagement.API.Data;
using EmployeeManagement.API.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagement.API.Services
{
    public class EmployeeService
    {
        private readonly ApplicationDbContext _context;
        private readonly EmployeeShardDbContextFactory _shardFactory;

        public EmployeeService(
            ApplicationDbContext context,
            EmployeeShardDbContextFactory shardFactory)
        {
            _context = context;
            _shardFactory = shardFactory;
        }

        // Read from both shards and combine the results.
        public List<Employee> GetEmployees()
        {
            using var shard1 = _shardFactory.CreateForShard(1);
            using var shard2 = _shardFactory.CreateForShard(2);

            var employees1 = shard1.Employees
                .AsNoTracking()
                .ToList();

            var employees2 = shard2.Employees
                .AsNoTracking()
                .ToList();

            return employees1
                .Concat(employees2)
                .OrderBy(e => e.Id)
                .ToList();
        }

        // Route a single employee lookup to its shard.
        public Employee? GetEmployee(int id)
        {
            using var shard = _shardFactory.CreateForEmployee(id);

            return shard.Employees
                .AsNoTracking()
                .FirstOrDefault(e => e.Id == id);
        }

        // Allocate an ID centrally, then insert into its shard.
        public Employee AddEmployee(Employee employee)
        {
            var id = GetNextEmployeeId();

            employee.Id = id;

            using var shard = _shardFactory.CreateForEmployee(id);

            shard.Employees.Add(employee);
            shard.SaveChanges();

            return employee;
        }

        public Employee UpdateEmployee(Employee employee)
        {
            if (employee.Id <= 0)
                throw new ArgumentOutOfRangeException(nameof(employee.Id));

            using var shard = _shardFactory.CreateForEmployee(employee.Id);

            var existing = shard.Employees
                .FirstOrDefault(e => e.Id == employee.Id);

            if (existing == null)
                throw new KeyNotFoundException(
                    $"Employee with ID {employee.Id} was not found.");

            existing.EmployeeCode = employee.EmployeeCode;
            existing.Name = employee.Name;
            existing.Email = employee.Email;
            existing.Phone = employee.Phone;
            existing.Department = employee.Department;
            existing.Designation = employee.Designation;

            shard.SaveChanges();

            return existing;
        }

        public bool DeleteEmployee(int id)
        {
            using var shard = _shardFactory.CreateForEmployee(id);

            var employee = shard.Employees
                .FirstOrDefault(e => e.Id == id);

            if (employee == null)
                return false;

            shard.Employees.Remove(employee);
            shard.SaveChanges();

            return true;
        }

        private int GetNextEmployeeId()
        {
            using var shard1 = _shardFactory.CreateForShard(1);
            using var shard2 = _shardFactory.CreateForShard(2);

            var oddCount = shard1.Employees.Count();
            var evenCount = shard2.Employees.Count();

            var connection = _context.Database.GetDbConnection();
            var shouldClose = connection.State != ConnectionState.Open;

            try
            {
                if (shouldClose)
                    connection.Open();

                using var command = connection.CreateCommand();

                command.CommandText = oddCount <= evenCount
                    ? "SELECT NEXT VALUE FOR dbo.EmployeeIdOddSequence;"
                    : "SELECT NEXT VALUE FOR dbo.EmployeeIdEvenSequence;";

                return Convert.ToInt32(command.ExecuteScalar());
            }
            finally
            {
                if (shouldClose)
                    connection.Close();
            }
        }
    }
}