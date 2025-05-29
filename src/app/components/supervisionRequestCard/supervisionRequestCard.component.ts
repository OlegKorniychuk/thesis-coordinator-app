import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import {
  Student,
  SupervisionRequest,
  SupervisionRequestStatus,
} from 'src/app/models/bachelor.model';
import { SupervisorWithLoad } from 'src/app/models/supervisor.model';
import { SupervisorService } from 'src/app/services/supervisor.service';
import { RejectSupervisionRequestComponent } from './rejectSupervisionRequest/rejectSupervisionRequest.component';
import { BachelorService } from 'src/app/services/bachelor.service';

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
  public fromStudent = input<Student | null>(null);
  public addSupervisorControls = input<boolean>(false);
  public wasRejected = input<boolean>(false);

  constructor(
    private supervisorService: SupervisorService,
    private bachelorService: BachelorService,
    private dialog: MatDialog,
  ) {}

  private updateBachelorsCount() {
    this.supervisorService.supervisorUser.update((current) => {
      if (!current) return current;

      return {
        ...current,
        _count: {
          bachelors: current._count.bachelors + 1,
        },
      };
    });
  }

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

  public onAcceptRequestClick() {
    this.bachelorService
      .acceptSupervisionRequest(
        this.supervisionRequest().bachelor_id,
        this.supervisionRequest().supervision_request_id,
      )
      .subscribe(() => {
        this.supervisorService
          .getSupervisorUserRequests(
            this.supervisorService.supervisorUser()!.supervisor_id,
          )
          .subscribe(() =>
            this.bachelorService
              .getSupervisorsBachelors(
                this.supervisorService.supervisorUser()!.supervisor_id,
              )
              .subscribe(() => this.updateBachelorsCount()),
          );
      });
  }
  public onRejectRequestClick() {
    this.dialog.open(RejectSupervisionRequestComponent, {
      data: { supervisionRequest: this.supervisionRequest() },
    });
  }
}
