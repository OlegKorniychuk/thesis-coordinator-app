import { Component, computed, input, InputSignal, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BachelorFullData, TopicStatus } from 'src/app/models/bachelor.model';

@Component({
  selector: 'tc-bachelor-info-card',
  templateUrl: './bachelorInfoCard.component.html',
  styleUrl: './bachelorInfoCard.component.scss',
  imports: [MatCardModule, MatButtonModule],
})
export class BachelorInfoCardComponent implements OnInit {
  public bachelorData = input.required<BachelorFullData>();
  public topicName = computed<string>(() =>
    this.bachelorData().topic
      ? this.bachelorData().topic!.name
      : 'Тему не визначено',
  );

  ngOnInit(): void {
    console.log(this.bachelorData());
  }
}
