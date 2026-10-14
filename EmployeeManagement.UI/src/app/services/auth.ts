import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private apiUrl = `${environment.apiUrl}/Auth`;

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<{ token: string }>(
      `${this.apiUrl}/login`,
      {
        username: username,
        password: password
      }
    );
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getRole(): string | null {

    const token = this.getToken();

    if (!token) {
      return null;
    }

    try {

      const payload = JSON.parse(
        atob(token.split('.')[1])
      );

      return payload[
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
      ] ?? null;

    } catch {

      return null;

    }
  }

  logout() {
    localStorage.removeItem('token');
  }
}