import {
  Component,
  computed,
  ElementRef,
  Signal,
  ViewChild,
} from '@angular/core';
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
import { SupervisorService } from 'src/app/services/supervisor.service';
import { TeachersService } from 'src/app/services/teachers.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SupervisorWithLoad } from 'src/app/models/supervisor.model';

@Component({
  selector: 'tc-add-supervisor',
  templateUrl: './addSupervisor.component.html',
  styleUrl: './addSupervisor.component.scss',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
  ],
})
export class AddSupervisorComponent {
  private supervisors: Signal<SupervisorWithLoad[]>;
  @ViewChild('input') public input!: ElementRef<HTMLInputElement>;
  public teacherOptions: Signal<{ id: string; name: string }[]>;
  public filteredOptions: { id: string; name: string }[];

  public newSupervisorForm = new FormGroup({
    teacherFullName: new FormControl<string | null>(null, [
      Validators.required,
    ]),
    maxLoad: new FormControl<string | null>(null, [Validators.required]),
  });

  constructor(
    private dialogRef: MatDialogRef<AddSupervisorComponent>,
    private supervisorService: SupervisorService,
    private teacherService: TeachersService,
  ) {
    this.supervisors = this.supervisorService.supervisors;
    this.teacherService.getTeachers().subscribe();
    this.teacherOptions = computed(() =>
      this.teacherService
        .teachers()
        .filter(
          (teacher) =>
            !this.supervisors().some(
              (supervisor) =>
                supervisor.teacher.teacher_id === teacher.teacher_id,
            ),
        )
        .map((teacher) => ({
          id: teacher.teacher_id,
          name: `${teacher.last_name} ${teacher.first_name} ${teacher.second_name}`,
        })),
    );
    this.filteredOptions = this.teacherOptions();
    console.log(this.filteredOptions);
  }

  filter(): void {
    const filterValue = this.input.nativeElement.value.toLowerCase();
    this.filteredOptions = this.teacherOptions().filter((o) =>
      o.name.toLowerCase().includes(filterValue),
    );
  }

  public onSubmit() {
    console.log('SUBMITTING');
    if (this.newSupervisorForm.invalid) {
      console.log('INVALID');
      this.newSupervisorForm.markAllAsTouched();
      return;
    }

    const { teacherFullName, maxLoad } = this.newSupervisorForm.value as {
      teacherFullName: string;
      maxLoad: string;
    };

    const teacherId: string = this.teacherOptions().find(
      (teacher) => teacher.name === teacherFullName,
    )!.id;

    console.log(teacherId);
    console.log(maxLoad);

    this.supervisorService
      .createSupervisor(teacherId, parseInt(maxLoad))
      .subscribe();
    this.dialogRef.close();
  }

  public onCancelClick(): void {
    this.dialogRef.close();
  }
}
