import { Component, computed, OnInit, Signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { LogoutComponent } from '../components/logout/logout.component';
import { BachelorService } from '../services/bachelor.service';
import { AuthService } from '../services/auth.service';
import { Student } from '../models/bachelor.model';
import { DiplomaCycleService } from '../services/diplomaCycle.service';
import { DiplomaCycleData } from '../models/diplomaCycleData.model';
import { DiplomaCycleInfoComponent } from '../components/diplomaCycleInfo/diplomaCycleInfo.component';

@Component({
  selector: 'tc-bachelor',
  templateUrl: './bachelor.component.html',
  styleUrl: './bachelor.component.scss',
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
export class BachelorComponent implements OnInit {
  public bachelorFullName: Signal<string>;
  public diplomaCycle: Signal<DiplomaCycleData | null>;

  constructor(
    private bachelorService: BachelorService,
    private authService: AuthService,
    private diplomaCycleService: DiplomaCycleService,
  ) {
    this.diplomaCycle = this.diplomaCycleService.diplomaCycleData;
    this.bachelorFullName = computed(() => {
      const student: Student | undefined =
        this.bachelorService.bachelorUser()?.student;
      if (!student) return 'Невідомий студент';
      return `${student.last_name} ${student.first_name[0]}. ${student.second_name[0]}.`;
    });
  }

  ngOnInit(): void {
    const userId: string = this.authService.userData()!.user_id;
    this.bachelorService.getBachelorUser(userId).subscribe();
  }
}
