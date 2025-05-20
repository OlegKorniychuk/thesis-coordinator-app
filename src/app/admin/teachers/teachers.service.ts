import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { first, map, Observable, tap } from 'rxjs';
import { settings } from 'settings/dev.settings';
import { ApiResponse } from 'src/app/models/apiResponse.model';
import { Teacher } from 'src/app/models/teacher.model';

@Injectable({
  providedIn: 'root',
})
export class TeachersService {
  private readonly teachersEndpoint = settings.apiUrl + '/teachers';
  public teachers: WritableSignal<Teacher[]> = signal([]);
  public totalCount: WritableSignal<number> = signal(0);

  constructor(private http: HttpClient) {}

  public getTeachers(
    page: number = 1,
    resultsPerPage: number = 10,
  ): Observable<Teacher[]> {
    return this.http
      .get<ApiResponse>(this.teachersEndpoint, {
        params: { page, resultsPerPage },
      })
      .pipe(
        tap((response: ApiResponse) => {
          this.teachers.set(response.data.teachers);
          this.totalCount.set(response.data.total);
        }),
        map((response: ApiResponse) => response.data.teachers),
      );
  }

  public createTeacher(
    firstName: string,
    secondName: string,
    lastName: string,
    academicDegree: string,
    position: string,
  ): Observable<Teacher> {
    return this.http
      .post<ApiResponse>(this.teachersEndpoint, {
        first_name: firstName,
        second_name: secondName,
        last_name: lastName,
        academic_degree: academicDegree,
        position: position,
      })
      .pipe(
        tap((response: ApiResponse) => {
          this.teachers.set([response.data.newTeacher, ...this.teachers()]);
          this.totalCount.set(this.totalCount() + 1);
        }),
        map((response: ApiResponse) => response.data.newTeacher),
      );
  }
}
