import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { settings } from 'settings/dev.settings';
import { ApiResponse } from 'src/app/models/apiResponse.model';
import { ArchivedBachelor } from 'src/app/models/archiveData.model';

@Injectable({
  providedIn: 'root',
})
export class ArchiveService {
  private readonly archiveEndpoint = settings.apiUrl + '/archive';
  public years: WritableSignal<number[]> = signal([]);
  public bachelors: WritableSignal<ArchivedBachelor[]> = signal([]);
  public selectedYear: WritableSignal<number | null> = signal(null);

  constructor(private http: HttpClient) {}

  public updateArchivedYears(): Observable<number[]> {
    return this.http.get<ApiResponse>(this.archiveEndpoint + '/years').pipe(
      tap((response) => {
        this.years.set(response.data.years.sort());
      }),
      map((response) => response.data.years),
    );
  }

  public updateArchivedBachelorsByYear(
    year: number,
  ): Observable<ArchivedBachelor[]> {
    return this.http
      .get<ApiResponse>(this.archiveEndpoint + `/years/${year}`)
      .pipe(
        tap((response) => {
          this.bachelors.set(response.data.archivedBachelors);
          this.selectedYear.set(year);
        }),
        map((response) => response.data.archivedBachelors),
      );
  }
}
