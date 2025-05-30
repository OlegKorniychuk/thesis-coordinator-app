import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SupervisorService } from 'src/app/services/supervisor.service';

@Component({
  selector: 'tc-edit-supervisor-load',
  templateUrl: './editSupervisorLoad.component.html',
  styleUrl: './editSupervisorLoad.component.scss',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
  ],
})
export class EditSupervisorLoadComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<EditSupervisorLoadComponent>,
    private supervisorService: SupervisorService,
    @Inject(MAT_DIALOG_DATA)
    public data: { supervisorId: string; maxLoad: number },
  ) {}

  public updatedLoad = new FormGroup({
    maxLoad: new FormControl<number | null>(null, [Validators.required]),
  });

  ngOnInit(): void {
    this.updatedLoad.setValue({
      maxLoad: this.data.maxLoad,
    });
  }

  public onSubmit() {
    if (this.updatedLoad.invalid) {
      console.log('INVALID');
      this.updatedLoad.markAllAsTouched();
      return;
    }

    const newMaxLoad = this.updatedLoad.value.maxLoad;
    if (newMaxLoad && newMaxLoad !== this.data.maxLoad) {
      this.supervisorService
        .changeSupervisorMaxLoad(this.data.supervisorId, newMaxLoad)
        .subscribe(() =>
          this.supervisorService
            .getSupervisors()
            .subscribe(() => this.dialogRef.close()),
        );
    } else {
      this.dialogRef.close();
    }
  }

  public onCancelClick(): void {
    this.dialogRef.close();
  }
}
