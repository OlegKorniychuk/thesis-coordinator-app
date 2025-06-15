import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { DiplomaCycleData } from 'src/app/models/diplomaCycleData.model';

@Component({
  selector: 'tc-diploma-cycle-info',
  templateUrl: './diplomaCycleInfo.component.html',
  styleUrl: './diplomaCycleInfo.component.scss',
  imports: [DatePipe],
})
export class DiplomaCycleInfoComponent {
  public diplomaCycle = input.required<DiplomaCycleData | null>();
}
