import { NgClass } from '@angular/common';
import { Component, Signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { LogoutComponent } from '../components/logout/logout.component';
import { DiplomaCycleService } from '../services/diplomaCycle.service';
import { DiplomaCycleData } from '../models/diplomaCycleData.model';
import { DiplomaCycleInfoComponent } from '../components/diplomaCycleInfo/diplomaCycleInfo.component';

@Component({
  selector: 'tc-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatDividerModule,
    LogoutComponent,
    DiplomaCycleInfoComponent,
  ],
})
export class AdminComponent {
  public diplomaCycle: Signal<DiplomaCycleData | null>;

  constructor(private diplomaCycleService: DiplomaCycleService) {
    this.diplomaCycle = this.diplomaCycleService.diplomaCycleData;
  }
}
