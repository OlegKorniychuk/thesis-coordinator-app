import { Routes } from '@angular/router';
import { AuthComponent } from 'src/app/auth/auth.component';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('src/app/auth/auth.component').then((c) => AuthComponent),
  },
  {
    path: 'admin',
    loadChildren: () => import('src/app/admin/admin.routes'),
  },
  {
    path: 'supervisor',
    loadChildren: () => import('src/app/supervisor/supervisor.routes'),
  },
  {
    path: 'bachelor',
    loadChildren: () => import('src/app/bachelor/bachelor.routes'),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
