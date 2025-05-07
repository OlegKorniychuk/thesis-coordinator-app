import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
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
    return this.http
      .post<ApiResponse>(this.authEndpoint + '/login', { login, password })
      .subscribe({
        next: (response: ApiResponse) => {
          this.userData.set(response.data.user);
          this.isAuthenticated.set(true);
        },
      });
  }

  public logout() {
    return this.http.post(this.authEndpoint + '/login', {}).subscribe({
      next: () => {
        this.userData.set(null);
        this.isAuthenticated.set(false);
      },
    });
  }

  public refresh() {
    return this.http.post(this.authEndpoint + '/refresh', {}).subscribe();
  }
}
