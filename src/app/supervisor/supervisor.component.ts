import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { LogoutComponent } from '../components/logout/logout.component';

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
export class SupervisorComponent {}
