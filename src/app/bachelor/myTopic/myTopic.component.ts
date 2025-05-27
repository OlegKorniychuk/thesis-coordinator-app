import { Component, Signal } from '@angular/core';
import { BachelorUserData } from 'src/app/models/bachelor.model';
import { AuthService } from 'src/app/services/auth.service';
import { BachelorService } from 'src/app/services/bachelor.service';

@Component({
  selector: 'tc-my-topic',
  templateUrl: './myTopic.component.html',
})
export class MyTopicComponent {
  public bachelorData: Signal<BachelorUserData | null>;

  constructor(private bachelorService: BachelorService) {
    this.bachelorData = this.bachelorService.bachelorUser;
  }
}
