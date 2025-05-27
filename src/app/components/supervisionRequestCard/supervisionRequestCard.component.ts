import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import {
  SupervisionRequest,
  SupervisionRequestStatus,
} from 'src/app/models/bachelor.model';
import { SupervisorWithLoad } from 'src/app/models/supervisor.model';
import { SupervisorService } from 'src/app/services/supervisor.service';

@Component({
  selector: 'tc-supervision-request-card',
  templateUrl: './supervisionRequestCard.component.html',
  styleUrl: './supervisionRequestCard.component.scss',
  imports: [MatCardModule, MatButtonModule, MatDividerModule],
})
export class SupervisionRequestCardComponent {
  private supervisionRequestStatusUkrainian: Record<
    SupervisionRequestStatus,
    { status: string; class: string }
  > = {
    [SupervisionRequestStatus.pending]: {
      status: 'Розглядається',
      class: 'status-pending',
    },
    [SupervisionRequestStatus.accepted]: {
      status: 'Прийнято',
      class: 'status-accepted',
    },
    [SupervisionRequestStatus.rejected]: {
      status: 'Відхилено',
      class: 'status-rejected',
    },
  };
  public supervisionRequest = input.required<SupervisionRequest>();

  constructor(private supervisorService: SupervisorService) {}

  public getSueprvisorFullName(): string {
    const supervisor: SupervisorWithLoad | undefined = this.supervisorService
      .supervisors()
      .find(
        (supervisor) =>
          supervisor.supervisor_id === this.supervisionRequest().supervisor_id,
      );

    if (!supervisor) return 'Невідомий Викладач';
    return `${supervisor.teacher.last_name} ${supervisor.teacher.first_name} ${supervisor.teacher.second_name}`;
  }

  public isRejected() {
    return (
      this.supervisionRequest().status === SupervisionRequestStatus.rejected
    );
  }

  public getStatusData(): { status: string; class: string } {
    return this.supervisionRequestStatusUkrainian[
      this.supervisionRequest().status
    ];
  }
}
