import { Routes } from '@angular/router';
import { AuthComponent } from 'src/app/auth/auth.component';
import { isAuthGuard } from './guards/isAuth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('src/app/auth/auth.component').then((c) => AuthComponent),
  },
  {
    path: 'admin',
    loadChildren: () => import('src/app/admin/admin.routes'),
    canActivate: [isAuthGuard],
  },
  {
    path: 'supervisor',
    loadChildren: () => import('src/app/supervisor/supervisor.routes'),
    canActivate: [isAuthGuard],
  },
  {
    path: 'bachelor',
    loadChildren: () => import('src/app/bachelor/bachelor.routes'),
    canActivate: [isAuthGuard],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
