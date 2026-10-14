import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface AttendanceModel {
  id: number;
  employeeId: number;
  attendanceDate: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class Attendance {

  private apiUrl = `${environment.apiUrl}/Attendance`;

  constructor(private http: HttpClient) {}

  getAttendance() {
    return this.http.get<AttendanceModel[]>(this.apiUrl);
  }

  addAttendance(attendance: AttendanceModel) {
    return this.http.post<AttendanceModel>(
      this.apiUrl,
      attendance
    );
  }

  updateAttendance(attendance: AttendanceModel) {
    return this.http.put<AttendanceModel>(
      `${this.apiUrl}/${attendance.id}`,
      attendance
    );
  }

  deleteAttendance(id: number) {
    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }
}