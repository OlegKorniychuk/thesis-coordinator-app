import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'tc-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss',
  imports: [MatButtonModule],
})
export class LogoutComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  public onLogout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
