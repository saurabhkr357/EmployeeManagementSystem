using EmployeeManagement.API.Data;
using EmployeeManagement.API.Models;

namespace EmployeeManagement.API.Services
{
    public class DashboardService
    {
        private readonly ApplicationDbContext _context;

        public DashboardService(ApplicationDbContext context)
        {
            _context = context;
        }

        public Dashboard GetDashboard()
        {
            var today = DateTime.Today;

            Dashboard dashboard = new Dashboard();

            dashboard.TotalEmployees = _context.Employees.Count();
            dashboard.TotalPayroll = _context.Payrolls.Count();
            dashboard.PresentToday = _context.Attendances
        .Count(a => a.AttendanceDate.Date == today &&
                    a.Status == "Present");

            dashboard.AbsentToday = _context.Attendances
                .Count(a => a.AttendanceDate.Date == today &&
                            a.Status == "Absent");


            return dashboard;
        }
    }
}