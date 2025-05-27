import { Component, computed, Signal } from '@angular/core';
import {
  BachelorUserData,
  SupervisionRequest,
  SupervisionRequestStatus,
} from 'src/app/models/bachelor.model';
import { AuthService } from 'src/app/services/auth.service';
import { BachelorService } from 'src/app/services/bachelor.service';
import { SupervisorsListComponent } from './supervisorsList/supervisorsList.component';

@Component({
  selector: 'tc-my-supervisor',
  templateUrl: './mySupervisor.component.html',
  imports: [SupervisorsListComponent],
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
}
