using EmployeeManagement.API.Data;
using EmployeeManagement.API.Models;

namespace EmployeeManagement.API.Services
{
    public class AttendanceService
    {
        private readonly ApplicationDbContext _context;

        public AttendanceService(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Attendance> GetAttendances()
        {
            return _context.Attendances.ToList();
        }

        public Attendance? GetAttendance(int id)
        {
            return _context.Attendances.FirstOrDefault(x => x.Id == id);
        }

        public Attendance AddAttendance(Attendance attendance)
        {
            _context.Attendances.Add(attendance);
            _context.SaveChanges();

            return attendance;
        }

        public Attendance UpdateAttendance(Attendance attendance)
        {
            _context.Attendances.Update(attendance);
            _context.SaveChanges();

            return attendance;
        }

        public bool DeleteAttendance(int id)
        {
            var attendance = _context.Attendances.FirstOrDefault(x => x.Id == id);

            if (attendance == null)
                return false;

            _context.Attendances.Remove(attendance);
            _context.SaveChanges();

            return true;
        }
    }
}