import { Routes } from '@angular/router';
import { SupervisorComponent } from 'src/app/supervisor/supervisor.component';

export default [
  {
    path: '',
    loadComponent: () =>
      import('src/app/supervisor/supervisor.component').then(
        (c) => SupervisorComponent,
      ),
  },
] as Routes;
