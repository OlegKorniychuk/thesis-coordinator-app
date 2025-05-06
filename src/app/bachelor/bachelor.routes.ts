import { Routes } from '@angular/router';
import { BachelorComponent } from 'src/app/bachelor/bachelor.component';

export default [
  {
    path: '',
    loadComponent: () =>
      import('src/app/bachelor/bachelor.component').then(
        (c) => BachelorComponent,
      ),
  },
] as Routes;
