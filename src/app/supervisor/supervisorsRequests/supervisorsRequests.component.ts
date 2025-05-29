import { Component, computed, effect, Signal } from '@angular/core';
import { SupervisionRequestCardComponent } from 'src/app/components/supervisionRequestCard/supervisionRequestCard.component';
import { SupervisionRequestStatus } from 'src/app/models/bachelor.model';
import { SupervisorsSupervisionRequest } from 'src/app/models/supervisor.model';
import { SupervisorService } from 'src/app/services/supervisor.service';

@Component({
  selector: 'tc-supervisors-requests',
  templateUrl: './supervisorsRequests.component.html',
  styleUrl: './supervisorsRequests.component.scss',
  imports: [SupervisionRequestCardComponent],
})
export class SupervisorsRequestsComponent {
  public supervisionRequests: Signal<SupervisorsSupervisionRequest[]>;
  public activeRequests = computed(() =>
    this.supervisionRequests().filter(
      (request) => request.status === SupervisionRequestStatus.pending,
    ),
  );
  public notActiveRequests = computed(() =>
    this.supervisionRequests().filter(
      (request) => request.status !== SupervisionRequestStatus.pending,
    ),
  );

  constructor(private supervisorService: SupervisorService) {
    this.supervisionRequests = computed(() =>
      this.supervisorService.supervisorUserRequests().reverse(),
    );
    effect(() => {
      const supervisorId =
        this.supervisorService.supervisorUser()?.supervisor_id;
      if (supervisorId) {
        this.supervisorService
          .getSupervisorUserRequests(supervisorId)
          .subscribe();
      }
    });
  }

  public wasRejected(bachelorId: string): boolean {
    return this.supervisionRequests().some(
      (request) =>
        request.bachelor_id === bachelorId &&
        request.status === SupervisionRequestStatus.rejected,
    );
  }
}
