import {
  Component,
  computed,
  ElementRef,
  Inject,
  OnInit,
  Signal,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  BachelorFullData,
  BachelorUpdateData,
} from 'src/app/models/bachelor.model';
import { BachelorService } from 'src/app/services/bachelor.service';
import { SupervisorService } from 'src/app/services/supervisor.service';

@Component({
  selector: 'tc-edit-bachelor',
  templateUrl: './editBachelor.component.html',
  styleUrl: './editBachelor.component.scss',
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
export class EditBachelorComponent implements OnInit {
  // public bachelorData = input.required<BachelorFullData>();
  @ViewChild('input') public input!: ElementRef<HTMLInputElement>;
  public supervisorOptions: Signal<{ id: string; name: string }[]>;
  public filteredOptions: { id: string; name: string }[];
  public updateBachelorForm = new FormGroup({
    supervisorFullName: new FormControl<string | null>(null),
    firstName: new FormControl<string | null>(null),
    secondName: new FormControl<string | null>(null),
    lastName: new FormControl<string | null>(null),
    group: new FormControl<string | null>(null),
    specialty: new FormControl<string | null>(null),
    academicProgram: new FormControl<string | null>(null),
  });

  constructor(
    private supervisorService: SupervisorService,
    private bachelorService: BachelorService,
    private dialogRef: MatDialogRef<EditBachelorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { bachelorData: BachelorFullData },
  ) {
    this.supervisorOptions = computed(() =>
      this.supervisorService
        .supervisors()
        .filter(
          (supervisor) =>
            supervisor._count.bachelors < supervisor.max_load &&
            supervisor.supervisor_id !== this.data.bachelorData.supervisor_id,
        )
        .map((supervisor) => ({
          id: supervisor.supervisor_id,
          name: `${supervisor.teacher.last_name} ${supervisor.teacher.first_name} ${supervisor.teacher.second_name}`,
        })),
    );

    this.filteredOptions = this.supervisorOptions();
  }

  ngOnInit(): void {
    const bachelorData: BachelorFullData = this.data.bachelorData;

    this.updateBachelorForm.setValue({
      supervisorFullName: 'Поточний керівник',
      firstName: bachelorData.student.first_name,
      secondName: bachelorData.student.second_name,
      lastName: bachelorData.student.last_name,
      group: bachelorData.student.group,
      specialty: bachelorData.student.specialty,
      academicProgram: bachelorData.student.academic_program,
    });

    console.log(this.updateBachelorForm.value);
  }

  public filter(): void {
    const filterValue = this.input.nativeElement.value.toLowerCase();
    this.filteredOptions = this.supervisorOptions().filter((o) =>
      o.name.toLowerCase().includes(filterValue),
    );
  }

  public onSubmit() {
    const updateData: BachelorUpdateData = {};
    const formValue = this.updateBachelorForm.value;
    const bachelorData: BachelorFullData = this.data.bachelorData;
    const supervisorId: string = this.supervisorOptions().find(
      (supervisor) => supervisor.name === formValue.supervisorFullName,
    )!.id;

    if (
      formValue.firstName &&
      formValue.firstName !== bachelorData.student.first_name
    ) {
      updateData.firstName = formValue.firstName;
    }
    if (
      formValue.secondName &&
      formValue.secondName !== bachelorData.student.second_name
    ) {
      updateData.secondName = formValue.secondName;
    }
    if (
      formValue.lastName &&
      formValue.lastName !== bachelorData.student.last_name
    ) {
      updateData.lastName = formValue.lastName;
    }
    if (formValue.group && formValue.group !== bachelorData.student.group) {
      updateData.group = formValue.group;
    }
    if (
      formValue.specialty &&
      formValue.specialty !== bachelorData.student.specialty
    ) {
      updateData.specialty = formValue.specialty;
    }
    if (
      formValue.academicProgram &&
      formValue.academicProgram !== bachelorData.student.academic_program
    ) {
      updateData.academicProgram = formValue.academicProgram;
    }
    if (
      formValue.supervisorFullName &&
      formValue.supervisorFullName !== 'Поточний керівник'
    ) {
      updateData.supervisorId = supervisorId;
    }

    this.bachelorService
      .updateBachelor(bachelorData.bachelor_id, updateData)
      .subscribe(() => this.dialogRef.close());
  }
  public onCancelClick() {
    this.dialogRef.close();
  }
}
