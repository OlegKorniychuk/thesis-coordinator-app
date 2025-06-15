/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from 'src/app/app.component';
import { routes } from 'src/app/app.routes';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpConfigInterceptor } from 'src/app/interceptors/httpConfig.interceptor';
import { authInterceptor } from 'src/app/interceptors/auth.interceptor';
import { inject, provideAppInitializer } from '@angular/core';
import { AuthService } from './app/services/auth.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([httpConfigInterceptor, authInterceptor]),
    ),
    provideAppInitializer(() => {
      const authService = inject(AuthService);
      return authService.pullUserData();
    }),
  ],
}).catch((err) => console.error(err));
