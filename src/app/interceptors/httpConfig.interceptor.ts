import {
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { SnackbarService } from '../services/snackbar.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export function httpConfigInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const snackbarService = inject(SnackbarService);
  const authService = inject(AuthService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      const httpCode: number = err.status;

      const isRefreshRequest = req.url.includes('/auth/refresh');

      switch (httpCode) {
        case 500:
          console.error(err.error);
          snackbarService.showErrorSnackbar('Невідома серверна помилка');
          return of();

        case 403:
          snackbarService.showErrorSnackbar(
            'Ви не маєте дозволу на виконання цієї дії',
          );
          return of();

        case 401:
          if (isRefreshRequest) {
            snackbarService.showErrorSnackbar(
              'Сесія закінчилась. Авторизуйтесь повторно',
            );
            router.navigate(['/login']);
            return of();
          }

          return authService.refresh().pipe(
            switchMap(() => {
              return next(req);
            }),
            catchError(() => {
              snackbarService.showErrorSnackbar(
                'Сесія закінчилась. Авторизуйтесь повторно',
              );
              router.navigate(['/login']);
              return of();
            }),
          );

        default:
          console.error(err.error);
          snackbarService.showErrorSnackbar('Помилка запиту');
          return throwError(() => err);
      }
    }),
  );
}
