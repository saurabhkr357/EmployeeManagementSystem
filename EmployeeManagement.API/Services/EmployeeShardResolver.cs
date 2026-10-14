namespace EmployeeManagement.API.Services
{
    public class EmployeeShardResolver
    {
        public int GetShardNumber(int employeeId)
        {
            if (employeeId <= 0)
            {
                throw new ArgumentOutOfRangeException(
                    nameof(employeeId),
                    "Employee ID must be positive.");
            }

            return employeeId % 2 == 0 ? 2 : 1;
        }
    }
}