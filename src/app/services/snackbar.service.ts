import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  public showErrorSnackbar(message: string = 'Невідома помилка') {
    this.snackBar.open(message, undefined, {
      duration: 5000,
      panelClass: ['error-snackbar'],
    });
  }
}
