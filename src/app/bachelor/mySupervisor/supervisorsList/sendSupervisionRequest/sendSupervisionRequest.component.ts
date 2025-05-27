import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SupervisionRequestCreateData } from 'src/app/models/bachelor.model';
import { AuthService } from 'src/app/services/auth.service';
import { BachelorService } from 'src/app/services/bachelor.service';

@Component({
  selector: 'tc-send-supervision-request',
  templateUrl: './sendSupervisionRequest.component.html',
  styleUrl: './sendSupervisionRequest.component.scss',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
  ],
})
export class SendSupervisionRequestComponent {
  public requestForm = new FormGroup({
    comment: new FormControl<string | null>(null),
    proposedTopic: new FormControl<string | null>(null),
  });
  public commentPlaceholder: string =
    'Хочу працювати над дипломом під Вашим керівництвом';

  constructor(
    private bachelorService: BachelorService,
    private authService: AuthService,
    private dialogRef: MatDialogRef<SendSupervisionRequestComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { supervisorId: string },
  ) {}

  public onSubmit() {
    const formValue = this.requestForm.value;
    const payload: SupervisionRequestCreateData = {
      supervisor_id: this.data.supervisorId,
      comment: this.commentPlaceholder,
    };

    if (formValue.comment) payload.comment = formValue.comment;
    if (formValue.proposedTopic)
      payload.proposed_topic = formValue.proposedTopic;

    this.bachelorService
      .sendSupervisionRequest(
        this.bachelorService.bachelorUser()!.bachelor_id,
        payload,
      )
      .subscribe(() =>
        this.bachelorService
          .getBachelorUser(this.authService.userData()!.user_id)
          .subscribe(() => this.dialogRef.close()),
      );
  }
  public onCancelClick() {
    this.dialogRef.close();
  }
}
