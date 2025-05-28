import { Component, computed, Signal, signal } from '@angular/core';
import { SupervisionRequestCardComponent } from 'src/app/components/supervisionRequestCard/supervisionRequestCard.component';
import {
  SupervisionRequest,
  SupervisionRequestStatus,
} from 'src/app/models/bachelor.model';
import { BachelorService } from 'src/app/services/bachelor.service';
import { SupervisorService } from 'src/app/services/supervisor.service';

@Component({
  selector: 'tc-my-requests',
  templateUrl: './myRequests.component.html',
  styleUrl: './myRequests.component.scss',
  imports: [SupervisionRequestCardComponent],
})
export class MyRequestsComponent {
  public supervisionRequests: Signal<SupervisionRequest[]>;
  public activeRequest: Signal<SupervisionRequest | undefined> = computed(() =>
    this.supervisionRequests().find(
      (request) => request.status !== SupervisionRequestStatus.rejected,
    ),
  );
  public rejectedRequests: Signal<SupervisionRequest[]> = computed(() =>
    this.supervisionRequests().filter(
      (request) => request.status === SupervisionRequestStatus.rejected,
    ),
  );

  constructor(
    private bachelorService: BachelorService,
    private supervisorService: SupervisorService,
  ) {
    this.supervisionRequests = computed(() =>
      this.bachelorService.bachelorUser()!.supervision_requests.reverse(),
    );
    this.supervisorService.getSupervisors().subscribe();
  }
}
