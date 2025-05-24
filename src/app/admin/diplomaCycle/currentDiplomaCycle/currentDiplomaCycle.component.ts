import { Component, computed, OnInit, Signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { BachelorInfoCardComponent } from 'src/app/components/bachelorInfoCard/bachelorInfoCard.component';
import { BachelorFullData } from 'src/app/models/bachelor.model';
import { SupervisorWithBachelors } from 'src/app/models/supervisor.model';
import { BachelorService } from 'src/app/services/bachelor.service';
import { SupervisorService } from 'src/app/services/supervisor.service';
import { AddStudentComponent } from './addStudent/addStudent.component';
import { AddSupervisorComponent } from './addSupervisor/addSupervisor.component';

@Component({
  selector: 'tc-current-diploma-cycle',
  templateUrl: './currentDiplomaCycle.component.html',
  styleUrl: './currentDiplomaCycle.component.scss',
  imports: [BachelorInfoCardComponent, MatButtonModule],
})
export class CurrentDiplomaCycleComponent implements OnInit {
  public supervisorsWithBachelors: Signal<SupervisorWithBachelors[]>;
  public bachelorsWithoutSupervisor: Signal<BachelorFullData[]>;

  constructor(
    private supervisorService: SupervisorService,
    private bachelorService: BachelorService,
    private dialog: MatDialog,
  ) {
    this.supervisorsWithBachelors = computed(() => {
      return this.supervisorService.supervisors().map((supervisor) => {
        const bachelorsOfSupervisor = this.bachelorService
          .bachelors()
          .filter((b) => b.supervisor_id === supervisor.supervisor_id);

        return {
          ...supervisor,
          bachelors: bachelorsOfSupervisor,
        };
      });
    });

    this.bachelorsWithoutSupervisor = computed(() =>
      this.bachelorService
        .bachelors()
        .filter((bachelor) => bachelor.supervisor_id === null),
    );
  }

  ngOnInit(): void {
    this.supervisorService
      .getSupervisors()
      .subscribe(() => this.bachelorService.getBachelors().subscribe());
  }

  openAddBachelorDialog(): void {
    const dialogRef = this.dialog.open(AddStudentComponent);
  }

  openAddSupervisorDialog(): void {
    const dialogRef = this.dialog.open(AddSupervisorComponent);
  }
}
