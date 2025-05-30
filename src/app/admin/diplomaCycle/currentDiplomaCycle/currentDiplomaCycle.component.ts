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
import { MatDividerModule } from '@angular/material/divider';
import { EndDiplomaCycleComponent } from './endDiplomaCycle/endDiplomaCycle.component';
import { MatIconModule } from '@angular/material/icon';
import { EditSupervisorLoadComponent } from './editSupervisorLoad/editSupervisorLoad.component';

@Component({
  selector: 'tc-current-diploma-cycle',
  templateUrl: './currentDiplomaCycle.component.html',
  styleUrl: './currentDiplomaCycle.component.scss',
  imports: [
    BachelorInfoCardComponent,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
  ],
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
      return this.supervisorService
        .supervisors()
        .map((supervisor) => {
          const bachelorsOfSupervisor = this.bachelorService
            .bachelors()
            .filter((b) => b.supervisor_id === supervisor.supervisor_id);

          return {
            ...supervisor,
            bachelors: bachelorsOfSupervisor,
          };
        })
        .sort((a, b) => a.teacher.last_name.localeCompare(b.teacher.last_name));
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

  openEndDiplomaCycleDialog(): void {
    const dialogRef = this.dialog.open(EndDiplomaCycleComponent);
  }

  openEditMaxLoadDialog(supervisorId: string, maxLoad: number) {
    this.dialog.open(EditSupervisorLoadComponent, {
      data: { supervisorId, maxLoad },
    });
  }

  downloadBachelorsCredentials() {
    this.bachelorService.getCredentials().subscribe((blob) => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'StudentsCredentials.xlsx';
      link.click();
    });
  }

  downloadSupervisorsCredentials() {
    this.supervisorService.getCredentials().subscribe((blob) => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'SupervisorsCredentials.xlsx';
      link.click();
    });
  }
}
