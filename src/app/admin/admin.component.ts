import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'tc-admin',
  templateUrl: './admin.component.html',
  imports: [RouterOutlet, RouterLink],
})
export class AdminComponent {}
