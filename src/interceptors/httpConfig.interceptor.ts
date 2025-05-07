import {
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

export function httpConfigInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      const httpCode: number = err.status;

      switch (httpCode) {
        default:
          console.error(err.error);
          return throwError(() => err);
      }
    }),
  );
}
