import { Component, computed, OnInit, Signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { LogoutComponent } from '../components/logout/logout.component';
import { SupervisorService } from '../services/supervisor.service';
import { AuthService } from '../services/auth.service';
import { SupervisorWithLoad } from '../models/supervisor.model';

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
  public supervisor: Signal<SupervisorWithLoad | null>;

  constructor(
    private supervisorService: SupervisorService,
    private authService: AuthService,
  ) {
    this.supervisor = this.supervisorService.supervisorUser;
  }

  ngOnInit(): void {
    const userId: string = this.authService.userData()!.user_id;
    this.supervisorService.getSupervisorUser(userId).subscribe();
  }
}
