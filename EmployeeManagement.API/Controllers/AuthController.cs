using EmployeeManagement.API.Models;
using EmployeeManagement.API.Models.Entities;
using EmployeeManagement.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public IActionResult Login(User user)
        {
            var token = _authService.Login(user);

            if (token == null)
                return Unauthorized("Invalid Username or Password");

            return Ok(new
            {
                Token = token
            });
        }
    }
}