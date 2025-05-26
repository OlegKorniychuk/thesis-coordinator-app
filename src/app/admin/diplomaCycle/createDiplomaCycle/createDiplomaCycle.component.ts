import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DiplomaCycleService } from 'src/app/services/diplomaCycle.service';

@Component({
  selector: 'tc-create-diploma-cycle',
  templateUrl: './createDiplomaCycle.component.html',
  styleUrl: './createDiplomaCycle.component.scss',
  imports: [
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatButtonModule,
  ],
})
export class CreateDiplomaCycleComponent {
  public newCycleForm = new FormGroup({
    year: new FormControl<number | null>(null, [Validators.required]),
    start_date: new FormControl<Date | null>(null, [Validators.required]),
    supervisor_selection_end_date: new FormControl<Date | null>(null, [
      Validators.required,
    ]),
    topic_selection_end_date: new FormControl<Date | null>(null, [
      Validators.required,
    ]),
  });

  constructor(private diplomaCycleService: DiplomaCycleService) {}

  public onSubmit() {
    console.log('SUBMITTING');
    if (this.newCycleForm.invalid) {
      console.log('INVALID');
      this.newCycleForm.markAllAsTouched();
      return;
    }

    const {
      year,
      start_date,
      supervisor_selection_end_date,
      topic_selection_end_date,
    } = this.newCycleForm.value as {
      year: number;
      start_date: Date;
      supervisor_selection_end_date: Date;
      topic_selection_end_date: Date;
    };

    this.diplomaCycleService
      .startNewDiplomaCycle(
        year,
        start_date,
        supervisor_selection_end_date,
        topic_selection_end_date,
      )
      .subscribe();
  }
}
