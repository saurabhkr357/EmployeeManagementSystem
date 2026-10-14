import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { authGuard } from './guards/auth-guard';
import { roleGuard } from './guards/role-guard';
import { Layout } from './components/layout/layout';
import { EmployeeComponent } from './components/employee/employee';
import { PayrollComponent } from './components/payroll/payroll';
import { AttendanceComponent } from './components/attendance/attendance';

export const routes: Routes = [
  {
    path: 'login',
    component: Login
  },
   {
    path: '',
    component: Layout,
    canActivate: [authGuard],
    children: [

      {
        path: 'dashboard',
        component: Dashboard
      },
      {
        path: 'employees',
        component: EmployeeComponent,
        canActivate: [roleGuard],
        data: {
          roles: ['Admin']
        }
      },
      {
        path: 'payroll',
        component: PayrollComponent
      },
      {
        path: 'attendance',
        component: AttendanceComponent
      }
      
    ]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];