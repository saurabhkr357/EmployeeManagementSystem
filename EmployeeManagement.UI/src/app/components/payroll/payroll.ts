import { Component, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  Payroll,
  PayrollModel
} from '../../services/payroll';

@Component({
  selector: 'app-payroll',
  imports: [ReactiveFormsModule],
  templateUrl: './payroll.html',
  styleUrl: './payroll.css'
})
export class PayrollComponent implements OnInit {

  payrolls = signal<PayrollModel[]>([]);

  payrollForm: FormGroup;

  isEditMode = false;
  selectedPayrollId = 0;

  constructor(
    private payrollService: Payroll,
    private fb: FormBuilder
  ) {
    this.payrollForm = this.fb.group({
      employeeId: [0, [Validators.required, Validators.min(1)]],
      basicSalary: [0, [Validators.required, Validators.min(0)]],
      hra: [0, [Validators.required, Validators.min(0)]],
      bonus: [0, [Validators.required, Validators.min(0)]],
      deduction: [0, [Validators.required, Validators.min(0)]],
      netSalary: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.loadPayrolls();
  }

  loadPayrolls(): void {
    this.payrollService.getPayrolls()
      .subscribe({
        next: (response) => {
          this.payrolls.set(response);
        },
        error: (error) => {
          console.error('Error loading payrolls:', error);
        }
      });
  }

  savePayroll(): void {

    if (this.payrollForm.invalid) {
      this.payrollForm.markAllAsTouched();
      return;
    }

    const payroll: PayrollModel = {
      id: this.selectedPayrollId,
      ...this.payrollForm.value
    };

    if (this.isEditMode) {

      this.payrollService.updatePayroll(payroll)
        .subscribe({
          next: () => {
            this.loadPayrolls();
            this.resetForm();
          },
          error: (error) => {
            console.error('Error updating payroll:', error);
          }
        });

    } else {

      this.payrollService.addPayroll(payroll)
        .subscribe({
          next: () => {
            this.loadPayrolls();
            this.resetForm();
          },
          error: (error) => {
            console.error('Error adding payroll:', error);
          }
        });
    }
  }

  editPayroll(payroll: PayrollModel): void {

    this.isEditMode = true;
    this.selectedPayrollId = payroll.id;

    this.payrollForm.patchValue(payroll);
  }

  deletePayroll(id: number): void {

    if (!confirm('Are you sure you want to delete this payroll record?')) {
      return;
    }

    this.payrollService.deletePayroll(id)
      .subscribe({
        next: () => {
          this.loadPayrolls();
        },
        error: (error) => {
          console.error('Error deleting payroll:', error);
        }
      });
  }

  resetForm(): void {

    this.payrollForm.reset({
      employeeId: 0,
      basicSalary: 0,
      hra: 0,
      bonus: 0,
      deduction: 0,
      netSalary: 0
    });

    this.isEditMode = false;
    this.selectedPayrollId = 0;
  }
}