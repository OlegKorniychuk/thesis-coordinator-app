import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { settings } from 'settings/dev.settings';
import { ApiResponse } from 'src/app/models/apiResponse.model';
import { UserData } from 'src/app/models/userData.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuthenticated = signal<boolean>(false);
  public userData = signal<UserData | null>(null);

  private authEndpoint: string = settings.apiUrl + '/auth';

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {}

  public login(login: string, password: string): Observable<UserData> {
    return this.http
      .post<ApiResponse>(this.authEndpoint + '/login', { login, password })
      .pipe(
        tap((response: ApiResponse) => {
          this.userData.set(response.data.user);
          this.isAuthenticated.set(true);
        }),
        map((response: ApiResponse) => response.data.user),
      );
  }

  public logout(): Observable<object> {
    return this.http.post(this.authEndpoint + '/logout', {}).pipe(
      tap(() => {
        this.userData.set(null);
        this.isAuthenticated.set(false);
      }),
    );
  }

  public refresh(): Observable<object> {
    return this.http.post(this.authEndpoint + '/refresh', {});
  }

  public pullUserData(): Observable<UserData> {
    return this.http.get<ApiResponse>(this.authEndpoint + '/me').pipe(
      tap((response: ApiResponse) => {
        this.userData.set(response.data.user);
        this.isAuthenticated.set(true);
      }),
      map((response: ApiResponse) => response.data.user),
    );
  }
}
