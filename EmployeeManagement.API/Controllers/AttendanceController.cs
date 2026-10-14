using EmployeeManagement.API.Models;
using EmployeeManagement.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeManagement.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AttendanceController : ControllerBase
    {
        private readonly AttendanceService _attendanceService;

        public AttendanceController(AttendanceService attendanceService)
        {
            _attendanceService = attendanceService;
        }

        [HttpGet]
        public IActionResult GetAttendances()
        {
            return Ok(_attendanceService.GetAttendances());
        }

        [HttpGet("{id}")]
        public IActionResult GetAttendance(int id)
        {
            var attendance = _attendanceService.GetAttendance(id);

            if (attendance == null)
                return NotFound();

            return Ok(attendance);
        }

        [HttpPost]
        public IActionResult AddAttendance(Attendance attendance)
        {
            return Ok(_attendanceService.AddAttendance(attendance));
        }

        [HttpPut]
        public IActionResult UpdateAttendance(Attendance attendance)
        {
            return Ok(_attendanceService.UpdateAttendance(attendance));
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteAttendance(int id)
        {
            if (!_attendanceService.DeleteAttendance(id))
                return NotFound();

            return NoContent();
        }
    }
}