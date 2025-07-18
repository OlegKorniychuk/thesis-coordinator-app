import { Component, computed, Signal } from '@angular/core';
import {
  BachelorUserData,
  SupervisionRequest,
  SupervisionRequestStatus,
} from 'src/app/models/bachelor.model';
import { AuthService } from 'src/app/services/auth.service';
import { BachelorService } from 'src/app/services/bachelor.service';
import { SupervisorsListComponent } from './supervisorsList/supervisorsList.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'tc-my-supervisor',
  templateUrl: './mySupervisor.component.html',
  styleUrl: './mySupervisor.component.scss',
  imports: [SupervisorsListComponent, MatCardModule, MatDividerModule],
})
export class MySupervisorComponent {
  public bachelorData: Signal<BachelorUserData | null>;
  public activeRequest: Signal<SupervisionRequest | undefined> = computed(() =>
    this.bachelorData()?.supervision_requests.find(
      (request) => request.status === SupervisionRequestStatus.pending,
    ),
  );

  constructor(
    private bachelorService: BachelorService,
    private authService: AuthService,
  ) {
    this.bachelorData = this.bachelorService.bachelorUser;
    const userId: string = this.authService.userData()!.user_id;
    this.bachelorService.getBachelorUser(userId).subscribe();
  }

  public getSupervisorFullName() {
    return `${this.bachelorData()?.supervisor?.teacher?.last_name} ${this.bachelorData()?.supervisor?.teacher?.first_name} ${this.bachelorData()?.supervisor?.teacher?.second_name}`;
  }
}
