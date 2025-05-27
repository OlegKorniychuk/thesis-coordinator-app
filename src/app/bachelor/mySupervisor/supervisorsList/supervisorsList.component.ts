import { Component, computed, Signal } from '@angular/core';
import { SupervisorService } from 'src/app/services/supervisor.service';
import { SupervisorWithLoad } from 'src/app/models/supervisor.model';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { BachelorService } from 'src/app/services/bachelor.service';
import { SupervisionRequestStatus } from 'src/app/models/bachelor.model';
import { MatDialog } from '@angular/material/dialog';
import { SendSupervisionRequestComponent } from './sendSupervisionRequest/sendSupervisionRequest.component';

@Component({
  selector: 'tc-supervisors-list',
  standalone: true,
  imports: [MatPaginatorModule, MatCardModule, MatButtonModule],
  templateUrl: './supervisorsList.component.html',
  styleUrl: './supervisorsList.component.scss',
})
export class SupervisorsListComponent {
  public supervisors: Signal<SupervisorWithLoad[]>;

  constructor(
    private supervisorService: SupervisorService,
    private bachelorService: BachelorService,
    private dialog: MatDialog,
  ) {
    this.supervisors = computed(() =>
      this.supervisorService
        .supervisors()
        .filter(
          (supervisor) => supervisor._count.bachelors < supervisor.max_load,
        ),
    );
    this.supervisorService.getSupervisors().subscribe();
  }

  public wasRejected(supervisorId: string) {
    return this.bachelorService
      .bachelorUser()
      ?.supervision_requests.some(
        (request) =>
          request.status === SupervisionRequestStatus.rejected &&
          request.supervisor_id === supervisorId,
      );
  }

  public onSendRequestClick(supervisorId: string) {
    this.dialog.open(SendSupervisionRequestComponent, {
      data: { supervisorId },
    });
  }
}
