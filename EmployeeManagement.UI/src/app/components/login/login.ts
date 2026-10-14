import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';
import { Employee } from '../../services/employee';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  username = '';
  password = '';
  errorMessage = '';

  constructor(
    private authService: Auth,
    private router: Router,
    private employeeService: Employee,
  ) {}

  login() {

    this.errorMessage = '';

    this.authService.login(this.username, this.password)
      .subscribe({
        next: (response) => {

          this.authService.saveToken(response.token);
          this.router.navigate(['/dashboard']);

          console.log('Login successful');
          console.log('JWT Token:', response.token);

          //  this.employeeService.getEmployees()
          //   .subscribe({
          //     next: (employees) => {
          //       console.log('Employee API response:', employees);
          //     },
          //     error: (error) => {
          //       console.error('Employee API error:', error);
          //     }
          //   });
        },

        error: (error) => {

          console.error('Login failed:', error);

          this.errorMessage = 'Invalid username or password.';
        }
      });
  }
}