import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  BachelorFullData,
  Topic,
  TopicConfirmData,
} from 'src/app/models/bachelor.model';
import { BachelorService } from 'src/app/services/bachelor.service';

@Component({
  selector: 'tc-confirm-topic',
  templateUrl: './confirmTopic.component.html',
  styleUrl: './confirmTopic.component.scss',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDividerModule,
  ],
})
export class ConfirmTopicComponent implements OnInit {
  public confirmTopicForm = new FormGroup({
    refinedTopic: new FormControl<string | null>(null),
  });

  constructor(
    private bachelorService: BachelorService,
    private dialogRef: MatDialogRef<ConfirmTopicComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { bachelorData: BachelorFullData },
  ) {}

  ngOnInit(): void {
    this.confirmTopicForm.setValue({
      refinedTopic: this.data.bachelorData.topic!.name,
    });
  }

  public onSubmit() {
    const refinedTopic = this.confirmTopicForm.value.refinedTopic;
    const updateData: TopicConfirmData = {
      bachelorId: this.data.bachelorData.bachelor_id,
      topicId: this.data.bachelorData.topic!.topic_id,
    };
    if (refinedTopic && refinedTopic !== this.data.bachelorData.topic!.name)
      updateData.refinedTopic = refinedTopic;

    this.bachelorService
      .confirmTopic(updateData)
      .subscribe(() => this.dialogRef.close());
  }
  public onCancel() {
    this.dialogRef.close();
  }
}
