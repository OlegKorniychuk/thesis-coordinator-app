import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { settings } from 'settings/dev.settings';
import { ApiResponse } from 'src/app/models/apiResponse.model';
import { BachelorFullData, BachelorUpdateData } from '../models/bachelor.model';

@Injectable({
  providedIn: 'root',
})
export class BachelorService {
  public bachelors = signal<BachelorFullData[]>([]);

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
}
