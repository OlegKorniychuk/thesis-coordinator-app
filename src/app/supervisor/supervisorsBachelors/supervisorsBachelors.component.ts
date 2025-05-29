import { Component, computed, effect, OnInit, Signal } from '@angular/core';
import { BachelorInfoCardComponent } from 'src/app/components/bachelorInfoCard/bachelorInfoCard.component';
import { BachelorFullData, TopicStatus } from 'src/app/models/bachelor.model';
import { SupervisorWithLoad } from 'src/app/models/supervisor.model';
import { BachelorService } from 'src/app/services/bachelor.service';
import { SupervisorService } from 'src/app/services/supervisor.service';

@Component({
  selector: 'tc-supervisors-bachelors',
  templateUrl: './supervisorsBachelors.component.html',
  styleUrl: './supervisorsBachelors.component.scss',
  imports: [BachelorInfoCardComponent],
})
export class SupervisorsBachelorsComponent {
  public bachelors: Signal<BachelorFullData[]>;
  public pendingBachelors = computed(() =>
    this.bachelors().filter(
      (bachelor) => bachelor.topic?.status === TopicStatus.pending,
    ),
  );
  public notPendingBachelors = computed(() =>
    this.bachelors().filter(
      (bachelor) => bachelor.topic?.status !== TopicStatus.pending,
    ),
  );

  constructor(
    private supervisorService: SupervisorService,
    private bachelorService: BachelorService,
  ) {
    this.bachelors = this.bachelorService.supervisorsBachelors;
    effect(() => {
      const supervisorUser: SupervisorWithLoad | null =
        this.supervisorService.supervisorUser();
      if (supervisorUser) {
        this.bachelorService
          .getSupervisorsBachelors(supervisorUser.supervisor_id)
          .subscribe();
      }
    });
  }
}
