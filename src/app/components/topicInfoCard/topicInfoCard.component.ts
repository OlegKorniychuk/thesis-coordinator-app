import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { Topic, TopicStatus } from 'src/app/models/bachelor.model';

@Component({
  selector: 'tc-topic-info-card',
  templateUrl: './topicInfoCard.component.html',
  styleUrl: './topicInfoCard.component.scss',
  imports: [MatCardModule, MatDividerModule],
})
export class TopicInfoCardComponent {
  private topicStatusUkrainian: Record<
    TopicStatus,
    { status: string; class: string; comment: string }
  > = {
    [TopicStatus.pending]: {
      status: 'Розглядається керівником',
      class: 'status-pending',
      comment: 'Керівник розглядає запропоновану тему.',
    },
    [TopicStatus.on_confirmation]: {
      status: 'На затвердженні',
      class: 'status-on-confirmation',
      comment:
        'Керівник погодив вашу тему. Адміністратор перевіряє її формулювання.',
    },
    [TopicStatus.confirmed]: {
      status: 'Затверджено',
      class: 'status-confirmed',
      comment: 'Формулювання вашої теми затверджено.',
    },
    [TopicStatus.rejected]: {
      status: 'Відхилено керівником',
      class: 'status-rejected',
      comment:
        'Керівник відхилив вашу тему. Врахуйте його зауваження та запропонуйте нову.',
    },
  };

  public topic = input.required<Topic>();

  public getStatusData(): { status: string; class: string; comment: string } {
    return this.topicStatusUkrainian[this.topic().status];
  }

  public getCommentLabel(): string {
    return this.topic().status === TopicStatus.rejected
      ? 'Коментар керівника'
      : 'Коментар студента';
  }
}
