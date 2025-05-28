import { Component, Signal } from '@angular/core';
import { TopicInfoCardComponent } from 'src/app/components/topicInfoCard/topicInfoCard.component';
import { BachelorUserData, TopicStatus } from 'src/app/models/bachelor.model';
import { BachelorService } from 'src/app/services/bachelor.service';
import { ProposeTopicComponent } from './proposeTopicForm/proposeTopic.component';

@Component({
  selector: 'tc-my-topic',
  templateUrl: './myTopic.component.html',
  styleUrl: './myTopic.component.scss',
  imports: [TopicInfoCardComponent, ProposeTopicComponent],
})
export class MyTopicComponent {
  public bachelorData: Signal<BachelorUserData | null>;

  constructor(private bachelorService: BachelorService) {
    this.bachelorData = this.bachelorService.bachelorUser;
  }

  public showForm(): boolean {
    return (
      !this.bachelorData()?.topic ||
      this.bachelorData()?.topic?.status === TopicStatus.rejected
    );
  }

  public showCard(): boolean {
    return !!this.bachelorData()?.topic;
  }
}
