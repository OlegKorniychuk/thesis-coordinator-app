import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BachelorFullData } from 'src/app/models/bachelor.model';
import { BachelorService } from 'src/app/services/bachelor.service';
import { SupervisorService } from 'src/app/services/supervisor.service';

@Component({
  selector: 'tc-reject-topic',
  templateUrl: './rejectTopic.component.html',
  styleUrl: './rejectTopic.component.scss',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDividerModule,
  ],
})
export class RejectTopicComponent {
  public rejectTopicForm = new FormGroup({
    comment: new FormControl<string | null>(null, [Validators.required]),
  });

  constructor(
    private bachelorService: BachelorService,
    private supervisorService: SupervisorService,
    private dialogRef: MatDialogRef<RejectTopicComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { bachelorData: BachelorFullData },
  ) {}

  public onSubmit() {
    if (this.rejectTopicForm.invalid) {
      console.log('INVALID');
      this.rejectTopicForm.markAllAsTouched();
      return;
    }

    const bachelorId: string = this.data.bachelorData.bachelor_id;
    const topicId: string = this.data.bachelorData.topic!.topic_id;
    const comment: string = this.rejectTopicForm.value.comment!;

    this.bachelorService
      .rejectTopic(bachelorId, topicId, comment)
      .subscribe(() =>
        this.bachelorService
          .getSupervisorsBachelors(
            this.supervisorService.supervisorUser()!.supervisor_id,
          )
          .subscribe(() => this.dialogRef.close()),
      );
  }
  public onCancel() {
    this.dialogRef.close();
  }
}
