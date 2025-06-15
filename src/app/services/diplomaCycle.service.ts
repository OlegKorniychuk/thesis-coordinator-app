import { HttpClient } from '@angular/common/http';
import { computed, Injectable, Signal, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { settings } from 'settings/dev.settings';
import { ApiResponse } from 'src/app/models/apiResponse.model';
import { DiplomaCycleData } from '../models/diplomaCycleData.model';

@Injectable({
  providedIn: 'root',
})
export class DiplomaCycleService {
  public diplomaCycleData = signal<DiplomaCycleData | null>(null);
  public isActiveCycle: Signal<boolean> = computed(
    () => !!this.diplomaCycleData(),
  );

  private diplomaCycleEndpoint: string = settings.apiUrl + '/diploma-cycles';

  constructor(private http: HttpClient) {}

  public getDiplomaCycleData(): Observable<DiplomaCycleData> {
    return this.http
      .get<ApiResponse>(this.diplomaCycleEndpoint + '/get-current')
      .pipe(
        tap((response: ApiResponse) => {
          this.diplomaCycleData.set(response.data.diplomaCycle);
        }),
        map((response: ApiResponse) => response.data.diplomaCycle),
      );
  }

  public startNewDiplomaCycle(
    year: number,
    start_date: Date,
    supervisor_selection_end_date: Date,
    topic_selection_end_date: Date,
  ): Observable<DiplomaCycleData> {
    return this.http
      .post<ApiResponse>(this.diplomaCycleEndpoint, {
        year,
        start_date,
        supervisor_selection_end_date,
        topic_selection_end_date,
      })
      .pipe(
        tap((response: ApiResponse) => {
          this.diplomaCycleData.set(response.data.newCycle);
        }),
        map((response: ApiResponse) => response.data.newCycle),
      );
  }

  public endDiplomaCycle() {
    return this.http
      .patch(this.diplomaCycleEndpoint + '/end-current-cycle', {})
      .pipe(tap(() => this.getDiplomaCycleData().subscribe()));
  }
}
