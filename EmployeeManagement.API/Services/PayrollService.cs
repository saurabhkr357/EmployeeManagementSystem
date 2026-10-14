using EmployeeManagement.API.Data;
using EmployeeManagement.API.Models;

namespace EmployeeManagement.API.Services
{
    public class PayrollService
    {
        private readonly ApplicationDbContext _context;

        public PayrollService(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Payroll> GetPayrolls()
        {
            return _context.Payrolls.ToList();
        }

        public Payroll? GetPayroll(int id)
        {
            return _context.Payrolls.FirstOrDefault(x => x.Id == id);
        }

        public Payroll AddPayroll(Payroll payroll)
        {
            payroll.NetSalary = payroll.BasicSalary +
                                payroll.HRA +
                                payroll.Bonus -
                                payroll.Deduction;

            _context.Payrolls.Add(payroll);
            _context.SaveChanges();

            return payroll;
        }

        public Payroll UpdatePayroll(Payroll payroll)
        {
            payroll.NetSalary = payroll.BasicSalary +
                                payroll.HRA +
                                payroll.Bonus -
                                payroll.Deduction;

            _context.Payrolls.Update(payroll);
            _context.SaveChanges();

            return payroll;
        }

        public bool DeletePayroll(int id)
        {
            var payroll = _context.Payrolls.FirstOrDefault(x => x.Id == id);

            if (payroll == null)
                return false;

            _context.Payrolls.Remove(payroll);
            _context.SaveChanges();

            return true;
        }
    }
}