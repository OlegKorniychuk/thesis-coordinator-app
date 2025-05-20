import { Component, Signal } from '@angular/core';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { TeachersService } from './teachers.service';
import { Teacher } from 'src/app/models/teacher.model';
import { MyCustomPaginatorIntl } from 'src/app/components/localizedPaginator.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddTeacherComponent } from './addTeacher/addTeacher.component';

@Component({
  selector: 'tc-teachers',
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.scss',
  imports: [
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl }],
})
export class TeachersComponent {
  public teachers: Signal<Teacher[]>;
  public totalCount: Signal<number>;

  constructor(
    private teachersService: TeachersService,
    private dialog: MatDialog,
  ) {
    this.teachers = teachersService.teachers;
    this.totalCount = teachersService.totalCount;
    this.teachersService.getTeachers().subscribe();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddTeacherComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
