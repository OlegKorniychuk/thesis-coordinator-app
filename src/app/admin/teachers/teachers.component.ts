import { Component, computed, Signal } from '@angular/core';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { TeachersService } from 'src/app/services/teachers.service';
import { Teacher } from 'src/app/models/teacher.model';
import { MyCustomPaginatorIntl } from 'src/app/components/localizedPaginator.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddTeacherComponent } from './addTeacher/addTeacher.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'tc-teachers',
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.scss',
  imports: [
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatCardModule,
    MatButtonModule,
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl }],
})
export class TeachersComponent {
  public teachers: Signal<Teacher[]>;
  public totalCount: Signal<number>;
  public resultsPerPage: number = 4;

  constructor(
    private teachersService: TeachersService,
    private dialog: MatDialog,
  ) {
    this.teachers = teachersService.teachers;
    this.totalCount = this.teachersService.totalCount;
    this.teachersService.getTeachers(1, this.resultsPerPage).subscribe();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddTeacherComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  onPageChange(event: PageEvent) {
    this.teachersService
      .getTeachers(event.pageIndex + 1, this.resultsPerPage)
      .subscribe();
  }
}
