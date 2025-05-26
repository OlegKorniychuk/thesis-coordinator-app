import { Component, Signal } from '@angular/core';
import { CurrentDiplomaCycleComponent } from './currentDiplomaCycle/currentDiplomaCycle.component';
import { CreateDiplomaCycleComponent } from './createDiplomaCycle/createDiplomaCycle.component';
import { DiplomaCycleService } from 'src/app/services/diplomaCycle.service';

@Component({
  selector: 'tc-diploma-cycle',
  imports: [CurrentDiplomaCycleComponent, CreateDiplomaCycleComponent],
  templateUrl: './diplomaCycle.component.html',
})
export class DiplomaCycleComponent {
  public isActiveCycle: Signal<boolean>;

  constructor(private diplomaCycleService: DiplomaCycleService) {
    this.isActiveCycle = this.diplomaCycleService.isActiveCycle;
  }
}
