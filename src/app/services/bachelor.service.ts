import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { settings } from 'settings/dev.settings';
import { ApiResponse } from 'src/app/models/apiResponse.model';
import {
  BachelorFullData,
  BachelorUpdateData,
  BachelorUserData,
  SupervisionRequest,
  SupervisionRequestCreateData,
  TopicConfirmData,
} from '../models/bachelor.model';

@Injectable({
  providedIn: 'root',
})
export class BachelorService {
  public bachelors = signal<BachelorFullData[]>([]);
  public bachelorUser = signal<BachelorUserData | null>(null);

  private bachelorsEndpoint: string = settings.apiUrl + '/bachelors';

  constructor(private http: HttpClient) {}

  public getBachelors(): Observable<BachelorFullData[]> {
    return this.http.get<ApiResponse>(this.bachelorsEndpoint).pipe(
      tap((response: ApiResponse) => {
        this.bachelors.set(response.data.bachelors);
      }),
      map((response: ApiResponse) => response.data.bachelors),
    );
  }

  public createBachelor(
    firstName: string,
    secondName: string,
    lastName: string,
    group: string,
    specialty: string,
    academicProgram: string,
  ) {
    return this.http
      .post<ApiResponse>(this.bachelorsEndpoint, {
        first_name: firstName,
        second_name: secondName,
        last_name: lastName,
        group: group,
        specialty: specialty,
        academic_program: academicProgram,
      })
      .pipe(
        tap((response: ApiResponse) => {
          this.getBachelors().subscribe();
        }),
        map((response: ApiResponse) => response.data.newBachelor),
      );
  }

  public updateBachelor(bachelorId: string, updateData: BachelorUpdateData) {
    return this.http
      .patch<ApiResponse>(this.bachelorsEndpoint + `/${bachelorId}`, updateData)
      .pipe(
        tap((response: ApiResponse) => {
          this.getBachelors().subscribe();
        }),
        map((response: ApiResponse) => response.data.updatedBachelor),
      );
  }

  public confirmTopic(updateData: TopicConfirmData) {
    const { bachelorId, topicId, refinedTopic } = updateData;
    const body = refinedTopic ? { refinedTopic } : {};
    return this.http
      .patch<ApiResponse>(
        this.bachelorsEndpoint + `/${bachelorId}/topics/${topicId}/confirm`,
        body,
      )
      .pipe(tap(() => this.getBachelors().subscribe()));
  }

  public getBachelorUser(userId: string): Observable<BachelorUserData> {
    return this.http
      .get<ApiResponse>(this.bachelorsEndpoint + `/by-user-id/${userId}`)
      .pipe(
        tap((response) => {
          this.bachelorUser.set(response.data.bachelor);
        }),
        map((response) => response.data.bachelor),
      );
  }

  public sendSupervisionRequest(
    bachelorId: string,
    payload: SupervisionRequestCreateData,
  ): Observable<SupervisionRequest> {
    return this.http
      .post<ApiResponse>(
        this.bachelorsEndpoint + `/${bachelorId}/supervision-requests`,
        payload,
      )
      .pipe(map((response) => response.data.newSupervisionRequest));
  }
}
