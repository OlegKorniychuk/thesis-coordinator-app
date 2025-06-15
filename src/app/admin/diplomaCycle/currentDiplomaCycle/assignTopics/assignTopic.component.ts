import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { BachelorService } from 'src/app/services/bachelor.service';

@Component({
  selector: 'tc-assign-topics',
  templateUrl: './assignTopic.component.html',
  styleUrl: './assignTopic.component.scss',
  imports: [MatCardModule, MatButtonModule, MatDividerModule],
})
export class AssignTopicsComponent {
  constructor(
    private bachelorService: BachelorService,
    private dialogRef: MatDialogRef<AssignTopicsComponent>,
  ) {}

  public onConfirm() {
    this.bachelorService
      .assignTopics()
      .subscribe(() =>
        this.bachelorService
          .getBachelors()
          .subscribe(() => this.dialogRef.close()),
      );
  }

  public onCancel() {
    this.dialogRef.close();
  }
}
