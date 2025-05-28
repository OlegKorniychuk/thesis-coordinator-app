import { Component, computed, OnInit, Signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { LogoutComponent } from '../components/logout/logout.component';
import { SupervisorService } from '../services/supervisor.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'tc-supervisor',
  templateUrl: './supervisor.component.html',
  styleUrl: './supervisor.component.scss',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatDividerModule,
    LogoutComponent,
  ],
})
export class SupervisorComponent implements OnInit {
  public lastName: Signal<string>;

  constructor(
    private supervisorService: SupervisorService,
    private authService: AuthService,
  ) {
    this.lastName = computed(
      () =>
        this.supervisorService.supervisorUser()?.teacher.last_name ||
        'Невідомий керівник',
    );
  }

  ngOnInit(): void {
    const userId: string = this.authService.userData()!.user_id;
    this.supervisorService.getSupervisorUser(userId).subscribe();
  }
}
