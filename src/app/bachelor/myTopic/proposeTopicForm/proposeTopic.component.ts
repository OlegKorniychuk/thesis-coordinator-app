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
import { ProposeTopicData } from 'src/app/models/bachelor.model';
import { AuthService } from 'src/app/services/auth.service';
import { BachelorService } from 'src/app/services/bachelor.service';

@Component({
  selector: 'tc-propose-topic-form',
  templateUrl: './proposeTopic.component.html',
  styleUrl: './proposeTopic.component.scss',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class ProposeTopicComponent {
  public proposeTopicForm = new FormGroup({
    name: new FormControl<string | null>(null, [Validators.required]),
    comment: new FormControl<string | null>(null),
  });

  constructor(
    private bachelorService: BachelorService,
    private authService: AuthService,
  ) {}

  public onSubmit() {
    if (this.proposeTopicForm.invalid) {
      console.log('INVALID');
      this.proposeTopicForm.markAllAsTouched();
      return;
    }

    const payload: ProposeTopicData = {
      name: this.proposeTopicForm.value.name!,
    };
    if (this.proposeTopicForm.value.comment)
      payload.comment = this.proposeTopicForm.value.comment;
    const bachelorId = this.bachelorService.bachelorUser()!.bachelor_id;

    this.bachelorService.proposeTopic(bachelorId, payload).subscribe(() => {
      const userId = this.authService.userData()!.user_id;
      this.bachelorService.getBachelorUser(userId).subscribe();
    });
  }
}
