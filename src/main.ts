import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from 'src/app/app.component';
import { routes } from 'src/app/app.routes';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpConfigInterceptor } from 'src/app/interceptors/httpConfig.interceptor';
import { authInterceptor } from 'src/app/interceptors/auth.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([httpConfigInterceptor, authInterceptor]),
    ),
  ],
}).catch((err) => console.error(err));
