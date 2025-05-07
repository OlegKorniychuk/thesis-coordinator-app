import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { settings } from 'settings/dev.settings';
import { ApiResponse } from 'src/models/apiResponse.model';
import { UserData } from 'src/models/userData.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuthenticated = signal<boolean>(false);
  public userData = signal<UserData | null>(null);

  private authEndpoint: string = settings.apiUrl + '/auth';

  constructor(private http: HttpClient) {}

  public login(login: string, password: string) {
    this.http
      .post<ApiResponse>(this.authEndpoint + '/login', { login, password })
      .pipe(
        tap((response) => {
          this.userData.set(response.data.user);
          this.isAuthenticated.set(true);
        }),
      );
  }

  public logout() {
    this.http.post(this.authEndpoint + '/login', {}).pipe(
      tap(() => {
        this.userData.set(null);
        this.isAuthenticated.set(false);
      }),
    );
  }

  public refresh() {
    this.http.post(this.authEndpoint + '/refresh', {});
  }
}
