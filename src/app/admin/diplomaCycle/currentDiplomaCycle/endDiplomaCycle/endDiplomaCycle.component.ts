import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { DiplomaCycleService } from 'src/app/services/diplomaCycle.service';

@Component({
  selector: 'tc-end-diploma-cycle',
  templateUrl: './endDiplomaCycle.component.html',
  styleUrl: './endDiplomaCycle.component.scss',
  imports: [MatCardModule, MatButtonModule, MatDividerModule],
})
export class EndDiplomaCycleComponent {
  constructor(
    private diplomaCycleService: DiplomaCycleService,
    private dialogRef: MatDialogRef<EndDiplomaCycleComponent>,
  ) {}

  public onConfirm() {
    this.diplomaCycleService
      .endDiplomaCycle()
      .subscribe(() => this.dialogRef.close());
  }

  public onCancel() {
    this.dialogRef.close();
  }
}
