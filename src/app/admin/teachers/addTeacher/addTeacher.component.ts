import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TeachersService } from '../../../services/teachers.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'tc-add-teacher',
  templateUrl: './addTeacher.component.html',
  styleUrl: './addTeacher.component.scss',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatInputModule,
  ],
})
export class AddTeacherComponent {
  constructor(
    private dialogRef: MatDialogRef<AddTeacherComponent>,
    private teacherService: TeachersService,
  ) {}

  public newTeacherForm = new FormGroup({
    first_name: new FormControl<string | null>(null, [Validators.required]),
    second_name: new FormControl<string | null>(null, [Validators.required]),
    last_name: new FormControl<string | null>(null, [Validators.required]),
    academic_degree: new FormControl<string | null>(null, [
      Validators.required,
    ]),
    position: new FormControl<string | null>(null, [Validators.required]),
  });

  public onSubmit() {
    console.log('SUBMITTING');
    if (this.newTeacherForm.invalid) {
      console.log('INVALID');
      this.newTeacherForm.markAllAsTouched();
      return;
    }

    const { first_name, second_name, last_name, academic_degree, position } =
      this.newTeacherForm.value as {
        first_name: string;
        second_name: string;
        last_name: string;
        academic_degree: string;
        position: string;
      };

    this.teacherService
      .createTeacher(
        first_name,
        second_name,
        last_name,
        academic_degree,
        position,
      )
      .subscribe();
    this.dialogRef.close();
  }

  public onCancelClick(): void {
    this.dialogRef.close();
  }
}
