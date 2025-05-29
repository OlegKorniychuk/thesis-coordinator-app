import { Component, computed, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { BachelorFullData, TopicStatus } from 'src/app/models/bachelor.model';
import { EditBachelorComponent } from './editBachelor/editBachelor.component';
import { ConfirmTopicComponent } from './confirmTopic/confirmTopic.component';
import { BachelorService } from 'src/app/services/bachelor.service';
import { SupervisorService } from 'src/app/services/supervisor.service';
import { RejectTopicComponent } from './rejectTopic/rejectTopic.component';

@Component({
  selector: 'tc-bachelor-info-card',
  templateUrl: './bachelorInfoCard.component.html',
  styleUrl: './bachelorInfoCard.component.scss',
  imports: [MatCardModule, MatButtonModule],
})
export class BachelorInfoCardComponent {
  private topicStatusUkrainian: Record<
    TopicStatus,
    { status: string; class: string }
  > = {
    [TopicStatus.confirmed]: {
      status: 'Затверджено',
      class: 'status-confirmed',
    },
    [TopicStatus.on_confirmation]: {
      status: 'Очікує на затвердження',
      class: 'status-on-confirmation',
    },
    [TopicStatus.pending]: {
      status: 'Узгоджується з керівником',
      class: 'status-in-progress',
    },
    [TopicStatus.rejected]: {
      status: 'Відхилено керівником',
      class: 'status-in-progress',
    },
  };

  public bachelorData = input.required<BachelorFullData>();
  public user = input.required<'supervisor' | 'admin'>();
  public addControlls = input<boolean>(false);
  public topicName = computed<string>(() =>
    this.bachelorData().topic
      ? this.bachelorData().topic!.name
      : 'Тему не визначено',
  );

  constructor(
    private dialog: MatDialog,
    private bachelorService: BachelorService,
    private supervisorService: SupervisorService,
  ) {}

  public getStatusData(): {
    status: string;
    class: string;
  } {
    const bachelor = this.bachelorData();
    if (!bachelor.topic)
      return { status: 'Тему не визначено', class: 'status-absent' };
    return this.topicStatusUkrainian[bachelor.topic.status];
  }

  public disableConfirmTopic(): boolean {
    return this.bachelorData().topic?.status !== TopicStatus.on_confirmation;
  }

  public onEditBachelorClick() {
    this.dialog.open(EditBachelorComponent, {
      data: {
        bachelorData: this.bachelorData(),
      },
    });
  }

  public onConfirmTopicClick() {
    this.dialog.open(ConfirmTopicComponent, {
      data: {
        bachelorData: this.bachelorData(),
      },
    });
  }

  public getCommentLabel(): string {
    return this.bachelorData().topic?.status === TopicStatus.rejected
      ? 'Коментар керівника:'
      : 'Коментар студента:';
  }

  public onAcceptTopicClick() {
    this.bachelorService
      .acceptTopic(
        this.bachelorData().bachelor_id,
        this.bachelorData().topic!.topic_id,
      )
      .subscribe(() => {
        this.bachelorService
          .getSupervisorsBachelors(
            this.supervisorService.supervisorUser()!.supervisor_id,
          )
          .subscribe();
      });
  }
  public onRejectTopicClick() {
    this.dialog.open(RejectTopicComponent, {
      data: { bachelorData: this.bachelorData() },
    });
  }
}
