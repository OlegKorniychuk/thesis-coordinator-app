import {
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { SnackbarService } from '../services/snackbar.service';

export function httpConfigInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const snackbarService = inject(SnackbarService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      const httpCode: number = err.status;

      switch (httpCode) {
        default:
          console.error(err.error);
          snackbarService.showErrorSnackbar();
          return throwError(() => err);
      }
    }),
  );
}
