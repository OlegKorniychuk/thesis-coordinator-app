import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Subject } from 'rxjs';

@Injectable()
export class MyCustomPaginatorIntl implements MatPaginatorIntl {
  changes = new Subject<void>();

  firstPageLabel = `Перша сторінка`;
  itemsPerPageLabel = `Записів на сторінці:`;
  lastPageLabel = `Остання сторінка`;

  nextPageLabel = 'Наступна сторінка';
  previousPageLabel = 'Попередня сторінка';

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return `Сторінка 1 з 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return `Сторінка ${page + 1} з ${amountPages}`;
  }
}
