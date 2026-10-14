import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  Employee,
  EmployeeModel
} from '../../services/employee';

@Component({
  selector: 'app-employee',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee.html',
  styleUrl: './employee.css'
})
export class EmployeeComponent implements OnInit {

  employees = signal<EmployeeModel[]>([]);

  employeeForm: FormGroup;

  isEditMode = false;

  selectedEmployeeId = 0;

  constructor(
    private employeeService: Employee,
    private fb: FormBuilder
  ) {

    this.employeeForm = this.fb.group({

      employeeCode: ['', Validators.required],

      name: ['', Validators.required],

      email: ['', [
        Validators.required,
        Validators.email
      ]],

      phone: ['', Validators.required],

      department: ['', Validators.required],

      designation: ['', Validators.required]

    });
  }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {

    this.employeeService.getEmployees()
      .subscribe({
        next: (response) => {
          this.employees.set(response);
        },

        error: (error) => {
          console.error('Error loading employees:', error);
        }
      });
  }

  saveEmployee(): void {

    if (this.employeeForm.invalid) {

      this.employeeForm.markAllAsTouched();

      return;
    }

    const employee: EmployeeModel = {
      id: this.selectedEmployeeId,

      ...this.employeeForm.value
    };

    if (this.isEditMode) {

      this.employeeService.updateEmployee(employee)
        .subscribe({
          next: () => {

            this.loadEmployees();

            this.resetForm();
          },

          error: (error) => {
            console.error('Error updating employee:', error);
          }
        });

    } else {

      this.employeeService.addEmployee(employee)
        .subscribe({
          next: () => {

            this.loadEmployees();

            this.resetForm();
          },

          error: (error) => {
            console.error('Error adding employee:', error);
          }
        });
    }
  }

  editEmployee(employee: EmployeeModel): void {

    this.isEditMode = true;

    this.selectedEmployeeId = employee.id;

    this.employeeForm.patchValue(employee);
  }

  deleteEmployee(id: number): void {

    if (!confirm('Are you sure you want to delete this employee?')) {
      return;
    }

    this.employeeService.deleteEmployee(id)
      .subscribe({
        next: () => {
          this.loadEmployees();
        },

        error: (error) => {
          console.error('Error deleting employee:', error);
        }
      });
  }

  resetForm(): void {

    this.employeeForm.reset();

    this.isEditMode = false;

    this.selectedEmployeeId = 0;
  }
}