import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface EmployeeModel {
  id: number;
  employeeCode: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
}

@Injectable({
  providedIn: 'root'
})
export class Employee {

  private apiUrl = `${environment.apiUrl}/Employee`;

  constructor(private http: HttpClient) {}

  getEmployees() {
    return this.http.get<EmployeeModel[]>(this.apiUrl);
  }

  addEmployee(employee: EmployeeModel) {
    return this.http.post<EmployeeModel>(this.apiUrl, employee);
  }

  updateEmployee(employee: EmployeeModel) {
    return this.http.put<EmployeeModel>(this.apiUrl, employee);
  }

  deleteEmployee(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}