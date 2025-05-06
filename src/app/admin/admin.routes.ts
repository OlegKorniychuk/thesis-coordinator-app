import { Routes } from '@angular/router';
import { AdminComponent } from 'src/app/admin/admin.component';

export default [
  {
    path: '',
    loadComponent: () =>
      import('src/app/admin/admin.component').then((c) => AdminComponent),
  },
] as Routes;
