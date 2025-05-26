import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from 'src/app/layout/header/header.component';
import { DiplomaCycleService } from './services/diplomaCycle.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public title = 'thesis-coordinator-app';

  constructor(private diplomaCycleService: DiplomaCycleService) {}

  public ngOnInit(): void {
    this.diplomaCycleService.getDiplomaCycleData().subscribe();
  }
}
