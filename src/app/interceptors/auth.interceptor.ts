import { HttpHandlerFn, HttpRequest } from '@angular/common/http';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) {
  const authRequest = req.clone({
    withCredentials: true,
  });

  return next(authRequest);
}
