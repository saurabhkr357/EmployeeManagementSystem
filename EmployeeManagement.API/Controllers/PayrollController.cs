using EmployeeManagement.API.Models;
using EmployeeManagement.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeManagement.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PayrollController : ControllerBase
    {
        private readonly PayrollService _payrollService;

        public PayrollController(PayrollService payrollService)
        {
            _payrollService = payrollService;
        }

        [HttpGet]
        public IActionResult GetPayrolls()
        {
            return Ok(_payrollService.GetPayrolls());
        }

        [HttpGet("{id}")]
        public IActionResult GetPayroll(int id)
        {
            var payroll = _payrollService.GetPayroll(id);

            if (payroll == null)
                return NotFound();

            return Ok(payroll);
        }

        [HttpPost]
        public IActionResult AddPayroll(Payroll payroll)
        {
            return Ok(_payrollService.AddPayroll(payroll));
        }

        [HttpPut]
        public IActionResult UpdatePayroll(Payroll payroll)
        {
            return Ok(_payrollService.UpdatePayroll(payroll));
        }

        [HttpDelete("{id}")]
        public IActionResult DeletePayroll(int id)
        {
            if (!_payrollService.DeletePayroll(id))
                return NotFound();

            return NoContent();
        }
    }
}