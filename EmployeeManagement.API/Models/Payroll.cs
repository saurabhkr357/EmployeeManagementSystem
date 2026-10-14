namespace EmployeeManagement.API.Models
{
    public class Payroll
    {
        public int Id { get; set; }

        public int EmployeeId { get; set; }

        public decimal BasicSalary { get; set; }

        public decimal HRA { get; set; }

        public decimal Bonus { get; set; }

        public decimal Deduction { get; set; }

        public decimal NetSalary { get; set; }
    }
}