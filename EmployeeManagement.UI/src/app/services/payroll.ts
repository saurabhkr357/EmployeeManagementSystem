import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface PayrollModel {
  id: number;
  employeeId: number;
  basicSalary: number;
  hra: number;
  bonus: number;
  deduction: number;
  netSalary: number;
}

@Injectable({
  providedIn: 'root'
})
export class Payroll {

  private apiUrl = `${environment.apiUrl}/Payroll`;

  constructor(private http: HttpClient) {}

  getPayrolls() {
    return this.http.get<PayrollModel[]>(this.apiUrl);
  }

  addPayroll(payroll: PayrollModel) {
    return this.http.post<PayrollModel>(this.apiUrl, payroll);
  }

  updatePayroll(payroll: PayrollModel) {
    return this.http.put<PayrollModel>(
      `${this.apiUrl}/${payroll.id}`,
      payroll
    );
  }

  deletePayroll(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}