import { Component, Signal } from '@angular/core';
import { ArchiveService } from './archive.service';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MyCustomPaginatorIntl } from 'src/app/components/localizedPaginator.component';
import { ArchivedBachelor } from 'src/app/models/archiveData.model';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'tc-archive',
  templateUrl: './archive.component.html',
  styleUrl: './archive.component.scss',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDividerModule,
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl }],
})
export class ArchiveComponent {
  public archivedYears: Signal<number[]>;
  public archivedBachelors: Signal<ArchivedBachelor[]>;
  public selectedYear: Signal<number | null>;

  constructor(private archiveService: ArchiveService) {
    this.archivedYears = this.archiveService.years;
    this.archivedBachelors = this.archiveService.bachelors;
    this.selectedYear = this.archiveService.selectedYear;
    this.archiveService.updateArchivedYears().subscribe(() => {
      this.archiveService
        .updateArchivedBachelorsByYear(this.archivedYears()[0])
        .subscribe();
    });
  }

  public onPageChange(event: PageEvent): void {
    this.archiveService
      .updateArchivedBachelorsByYear(this.archivedYears()[event.pageIndex])
      .subscribe();
  }
}
