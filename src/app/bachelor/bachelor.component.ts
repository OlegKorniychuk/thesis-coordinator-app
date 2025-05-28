import { Component, OnInit, Signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { LogoutComponent } from '../components/logout/logout.component';
import { BachelorService } from '../services/bachelor.service';
import { AuthService } from '../services/auth.service';

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
  ],
})
export class BachelorComponent implements OnInit {
  constructor(
    private bachelorService: BachelorService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    const userId: string = this.authService.userData()!.user_id;
    this.bachelorService.getBachelorUser(userId).subscribe();
  }
}
