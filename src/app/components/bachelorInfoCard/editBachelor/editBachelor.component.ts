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
import { BachelorFullData } from 'src/app/models/bachelor.model';
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
    private dialogRef: MatDialogRef<EditBachelorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { bachelorData: BachelorFullData },
  ) {
    this.supervisorOptions = computed(() =>
      this.supervisorService
        .supervisors()
        .filter(
          (supervisor) => supervisor._count.bachelors < supervisor.max_load,
        )
        .map((supervisor) => ({
          id: supervisor.supervisor_id,
          name: `${supervisor.teacher.last_name} ${supervisor.teacher.first_name} ${supervisor.teacher.second_name}`,
        })),
    );

    this.filteredOptions = this.supervisorOptions();
  }

  ngOnInit(): void {
    console.log(this.data);

    this.updateBachelorForm.setValue({
      supervisorFullName: 'Поточний керівник',
      firstName: this.data.bachelorData.student.first_name,
      secondName: this.data.bachelorData.student.second_name,
      lastName: this.data.bachelorData.student.last_name,
      group: this.data.bachelorData.student.group,
      specialty: this.data.bachelorData.student.specialty,
      academicProgram: this.data.bachelorData.student.academic_program,
    });

    console.log(this.updateBachelorForm.value);
  }

  public filter(): void {
    const filterValue = this.input.nativeElement.value.toLowerCase();
    this.filteredOptions = this.supervisorOptions().filter((o) =>
      o.name.toLowerCase().includes(filterValue),
    );
  }

  public onSubmit() {}
  public onCancelClick() {
    this.dialogRef.close();
  }
}
