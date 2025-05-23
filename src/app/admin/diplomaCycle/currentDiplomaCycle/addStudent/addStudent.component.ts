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
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BachelorService } from 'src/app/services/bachelor.service';

@Component({
  selector: 'tc-add-student',
  templateUrl: './addStudent.component.html',
  styleUrl: './addStudent.component.scss',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
  ],
})
export class AddStudentComponent {
  constructor(
    private dialogRef: MatDialogRef<AddStudentComponent>,
    private bachelorService: BachelorService,
  ) {}

  public newBachelorForm = new FormGroup({
    first_name: new FormControl<string | null>(null, [Validators.required]),
    second_name: new FormControl<string | null>(null, [Validators.required]),
    last_name: new FormControl<string | null>(null, [Validators.required]),
    group: new FormControl<string | null>(null, [Validators.required]),
    specialty: new FormControl<string | null>(null, [Validators.required]),
    academic_program: new FormControl<string | null>(null, [
      Validators.required,
    ]),
  });

  public onSubmit() {
    console.log('SUBMITTING');
    if (this.newBachelorForm.invalid) {
      console.log('INVALID');
      this.newBachelorForm.markAllAsTouched();
      return;
    }

    const {
      first_name,
      second_name,
      last_name,
      group,
      specialty,
      academic_program,
    } = this.newBachelorForm.value as {
      first_name: string;
      second_name: string;
      last_name: string;
      group: string;
      specialty: string;
      academic_program: string;
    };

    this.bachelorService
      .createBachelor(
        first_name,
        second_name,
        last_name,
        group,
        specialty,
        academic_program,
      )
      .subscribe();
    this.dialogRef.close();
  }

  public onCancelClick(): void {
    this.dialogRef.close();
  }
}
