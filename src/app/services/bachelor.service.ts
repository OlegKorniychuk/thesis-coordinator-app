import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { settings } from 'settings/dev.settings';
import { ApiResponse } from 'src/app/models/apiResponse.model';
import {
  BachelorFullData,
  BachelorUpdateData,
  BachelorUserData,
  ProposeTopicData,
  SupervisionRequest,
  SupervisionRequestCreateData,
  Topic,
  TopicConfirmData,
} from '../models/bachelor.model';

@Injectable({
  providedIn: 'root',
})
export class BachelorService {
  public bachelors = signal<BachelorFullData[]>([]);
  public bachelorUser = signal<BachelorUserData | null>(null);
  public supervisorsBachelors = signal<BachelorFullData[]>([]);

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

  public proposeTopic(
    bachelorId: string,
    payload: ProposeTopicData,
  ): Observable<Topic> {
    return this.http
      .patch<ApiResponse>(
        this.bachelorsEndpoint + `/${bachelorId}/topics`,
        payload,
      )
      .pipe(map((response) => response.data.newTopic));
  }

  public getSupervisorsBachelors(supervisorId: string) {
    return this.http
      .get<ApiResponse>(
        this.bachelorsEndpoint + `/by-supervisor-id/${supervisorId}`,
      )
      .pipe(
        tap((response) =>
          this.supervisorsBachelors.set(response.data.bachelors),
        ),
        map((response) => response.data.bachelors),
      );
  }

  public acceptTopic(bachelorId: string, topicId: string) {
    return this.http
      .patch<ApiResponse>(
        this.bachelorsEndpoint + `/${bachelorId}/topics/${topicId}/accept`,
        {},
      )
      .pipe(map((response) => response.data.updatedTopic));
  }

  public rejectTopic(bachelorId: string, topicId: string, comment: string) {
    return this.http
      .patch<ApiResponse>(
        this.bachelorsEndpoint + `/${bachelorId}/topics/${topicId}/reject`,
        { comment },
      )
      .pipe(map((response) => response.data.updatedTopic));
  }

  public acceptSupervisionRequest(
    bachelorId: string,
    supervisionRequestId: string,
  ) {
    return this.http
      .patch<ApiResponse>(
        this.bachelorsEndpoint +
          `/${bachelorId}/supervision-requests/${supervisionRequestId}/accept`,
        {},
      )
      .pipe(map((response) => response.data.updatedSupervisionRequest));
  }

  public rejectSupervisionRequest(
    bachelorId: string,
    supervisionRequestId: string,
    comment: string,
  ) {
    return this.http
      .patch<ApiResponse>(
        this.bachelorsEndpoint +
          `/${bachelorId}/supervision-requests/${supervisionRequestId}/reject`,
        { comment },
      )
      .pipe(map((response) => response.data.updatedSupervisionRequest));
  }
}
