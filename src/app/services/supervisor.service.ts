import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { settings } from 'settings/dev.settings';
import { ApiResponse } from 'src/app/models/apiResponse.model';
import {
  SupervisorsSupervisionRequest,
  SupervisorWithLoad,
} from '../models/supervisor.model';

@Injectable({
  providedIn: 'root',
})
export class SupervisorService {
  public supervisors = signal<SupervisorWithLoad[]>([]);
  public supervisorUser = signal<SupervisorWithLoad | null>(null);
  public supervisorUserRequests = signal<SupervisorsSupervisionRequest[]>([]);

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

  public createSupervisor(teacherId: string, maxLoad: number) {
    return this.http
      .post<ApiResponse>(this.supervisorsEndpoint, {
        teacherId: teacherId,
        maxLoad: maxLoad,
      })
      .pipe(
        tap((response) => {
          this.getSupervisors().subscribe();
        }),
        map((response) => response.data.newSupervisor),
      );
  }

  public getSupervisorUser(userId: string) {
    return this.http
      .get<ApiResponse>(this.supervisorsEndpoint + `/by-user-id/${userId}`)
      .pipe(
        tap((response) => {
          this.supervisorUser.set(response.data.supervisor);
        }),
        map((response) => response.data.supervisor),
      );
  }

  public getSupervisorUserRequests(
    supervisorId: string,
  ): Observable<SupervisorsSupervisionRequest[]> {
    return this.http
      .get<ApiResponse>(
        this.supervisorsEndpoint + `/${supervisorId}/supervision-requests`,
      )
      .pipe(
        tap((response) =>
          this.supervisorUserRequests.set(response.data.supervisionRequests),
        ),
        map((response) => response.data.supervisionRequests),
      );
  }

  public changeSupervisorMaxLoad(supervisorId: string, maxLoad: number) {
    return this.http
      .patch<ApiResponse>(
        this.supervisorsEndpoint + `/${supervisorId}/change-max-load`,
        { maxLoad },
      )
      .pipe(map((response) => response.data.updatedSupervisor));
  }
}
