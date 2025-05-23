import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { settings } from 'settings/dev.settings';
import { ApiResponse } from 'src/app/models/apiResponse.model';
import { SupervisorWithLoad } from '../models/supervisor.model';

@Injectable({
  providedIn: 'root',
})
export class SupervisorService {
  public supervisors = signal<SupervisorWithLoad[]>([]);

  private supervisorsEndpoint: string = settings.apiUrl + '/supervisors';

  constructor(private http: HttpClient) {}

  public getSupervisors(): Observable<SupervisorWithLoad[]> {
    return this.http.get<ApiResponse>(this.supervisorsEndpoint).pipe(
      tap((response: ApiResponse) => {
        this.supervisors.set(response.data.supervisors);
      }),
      map((response: ApiResponse) => response.data.supervisors),
    );
  }
}
