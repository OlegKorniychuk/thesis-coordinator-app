import { Routes } from '@angular/router';
import { AuthComponent } from 'src/app/auth/auth.component';
import { isAuthGuard } from 'src/app/guards/isAuth.guard';
import { DiplomaCycleComponent } from 'src/app/admin/diplomaCycle/diplomaCycle.component';
import { TeachersComponent } from 'src/app/admin/teachers/teachers.component';
import { ArchiveComponent } from 'src/app/admin/archive/archive.component';
import { AdminComponent } from 'src/app/admin/admin.component';
import { canLogin } from './guards/canLogin.guard';
import { BachelorComponent } from 'src/app/bachelor/bachelor.component';
import { MySupervisorComponent } from 'src/app/bachelor/mySupervisor/mySupervisor.component';
import { MyTopicComponent } from './bachelor/myTopic/myTopic.component';
import { MyRequestsComponent } from 'src/app/bachelor/myRequests/myRequests.component';
import { SupervisorComponent } from 'src/app/supervisor/supervisor.component';
import { SupervisorsBachelorsComponent } from 'src/app/supervisor/supervisorsBachelors/supervisorsBachelors.component';
import { SupervisorsRequestsComponent } from './supervisor/supervisorsRequests/supervisorsRequests.component';

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
    canActivate: [isAuthGuard],
    loadComponent: () =>
      import('src/app/supervisor/supervisor.component').then(
        (c) => SupervisorComponent,
      ),
    children: [
      {
        path: 'my-bachelors',
        loadComponent: () =>
          import(
            'src/app/supervisor/supervisorsBachelors/supervisorsBachelors.component'
          ).then((c) => SupervisorsBachelorsComponent),
      },
      {
        path: 'my-requests',
        loadComponent: () =>
          import(
            'src/app/supervisor/supervisorsRequests/supervisorsRequests.component'
          ).then((c) => SupervisorsRequestsComponent),
      },
      {
        path: '**',
        redirectTo: 'my-bachelors',
      },
    ],
  },
  {
    path: 'bachelor',
    canActivate: [isAuthGuard],
    loadComponent: () =>
      import('src/app/bachelor/bachelor.component').then(
        (c) => BachelorComponent,
      ),
    children: [
      {
        path: 'my-supervisor',
        loadComponent: () =>
          import('src/app/bachelor/mySupervisor/mySupervisor.component').then(
            (c) => MySupervisorComponent,
          ),
      },
      {
        path: 'my-topic',
        loadComponent: () =>
          import('src/app/bachelor/myTopic/myTopic.component').then(
            (c) => MyTopicComponent,
          ),
      },
      {
        path: 'my-requests',
        loadComponent: () =>
          import('src/app/bachelor/myRequests/myRequests.component').then(
            (c) => MyRequestsComponent,
          ),
      },
      {
        path: '**',
        redirectTo: 'my-topic',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
