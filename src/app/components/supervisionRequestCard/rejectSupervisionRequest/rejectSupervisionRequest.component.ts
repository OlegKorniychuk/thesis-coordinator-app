import { Component, Inject } from '@angular/core';
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
import { SupervisionRequest } from 'src/app/models/bachelor.model';
import { BachelorService } from 'src/app/services/bachelor.service';
import { SupervisorService } from 'src/app/services/supervisor.service';

@Component({
  selector: 'tc-reject-supervision-request-form',
  templateUrl: './rejectSupervisionRequest.component.html',
  styleUrl: './rejectSupervisionRequest.component.scss',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDividerModule,
  ],
})
export class RejectSupervisionRequestComponent {
  public rejectSupervisionRequestForm = new FormGroup({
    comment: new FormControl<string | null>(null, [Validators.required]),
  });

  constructor(
    private bachelorService: BachelorService,
    private supervisorService: SupervisorService,
    private dialogRef: MatDialogRef<RejectSupervisionRequestComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { supervisionRequest: SupervisionRequest },
  ) {}

  public onSubmit() {
    if (this.rejectSupervisionRequestForm.invalid) {
      console.log('INVALID');
      this.rejectSupervisionRequestForm.markAllAsTouched();
      return;
    }

    const bachelorId: string = this.data.supervisionRequest.bachelor_id;
    const supervisionRequestId: string =
      this.data.supervisionRequest.supervision_request_id;
    const comment: string = this.rejectSupervisionRequestForm.value.comment!;

    this.bachelorService
      .rejectSupervisionRequest(bachelorId, supervisionRequestId, comment)
      .subscribe(() =>
        this.supervisorService
          .getSupervisorUserRequests(
            this.supervisorService.supervisorUser()!.supervisor_id,
          )
          .subscribe(() => this.dialogRef.close()),
      );
  }
  public onCancel() {
    this.dialogRef.close();
  }
}
