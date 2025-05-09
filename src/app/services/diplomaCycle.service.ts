import { HttpClient } from '@angular/common/http';
import { computed, Injectable, Signal, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { settings } from 'settings/dev.settings';
import { ApiResponse } from 'src/app/models/apiResponse.model';
import { UserData } from 'src/app/models/userData.model';
import { DiplomaCycleData } from '../models/diplomaCycleData.model';

@Injectable({
  providedIn: 'root',
})
export class DiplomaCycleService {
  public diplomaCycleData = signal<UserData | null>(null);
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
}
