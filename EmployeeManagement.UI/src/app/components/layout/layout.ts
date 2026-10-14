import { Component } from '@angular/core';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-layout',
  imports: [RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {

  constructor(private authService: Auth) {}

  isAdmin(): boolean {
    return this.authService.getRole() === 'Admin';
  }

  logout(): void {
    this.authService.logout();
    window.location.href = '/login';
  }
}