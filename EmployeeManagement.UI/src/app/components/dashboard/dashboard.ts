import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { signal } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

totalEmployees = signal(0);
totalPayroll = signal(0);
presentToday = signal(0);
absentToday = signal(0);

  private apiUrl = `${environment.apiUrl}/Dashboard`;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    debugger;
    this.loadDashboard();
  }

  loadDashboard(): void {
    debugger;
    this.http.get<any>(this.apiUrl).subscribe({
      next: (response) => {
        this.totalEmployees.set(response.totalEmployees);
        this.totalPayroll.set(response.totalPayroll);
        this.presentToday.set(response.presentToday);
        this.absentToday.set(response.absentToday);
        console.log("response", response);
      },
      error: (error) => {
        console.error('Dashboard API error:', error);
      }
    });
  }
}