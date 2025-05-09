import { Routes } from '@angular/router';
import { AuthComponent } from 'src/app/auth/auth.component';
import { isAuthGuard } from 'src/app/guards/isAuth.guard';
import { DiplomaCycleComponent } from 'src/app/admin/diplomaCycle/diplomaCycle.component';
import { TeachersComponent } from 'src/app/admin/teachers/teachers.component';
import { ArchiveComponent } from 'src/app/admin/archive/archive.component';
import { AdminComponent } from 'src/app/admin/admin.component';
import { canLogin } from './guards/canLogin.guard';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [canLogin],
    loadComponent: () =>
      import('src/app/auth/auth.component').then((c) => AuthComponent),
  },
  {
    path: 'admin',
    canActivate: [isAuthGuard],
    loadComponent: () =>
      import('src/app/admin/admin.component').then((c) => AdminComponent),
    children: [
      {
        path: 'diploma-cycle',
        loadComponent: () =>
          import('src/app/admin/diplomaCycle/diplomaCycle.component').then(
            (c) => DiplomaCycleComponent,
          ),
      },
      {
        path: 'teachers',
        loadComponent: () =>
          import('src/app/admin/teachers/teachers.component').then(
            (c) => TeachersComponent,
          ),
      },
      {
        path: 'archive',
        loadComponent: () =>
          import('src/app/admin/archive/archive.component').then(
            (c) => ArchiveComponent,
          ),
      },
      {
        path: '**',
        redirectTo: 'diploma-cycle',
      },
    ],
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
