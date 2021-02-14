import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  msg = 'Hello';
  constructor(private matSnackBar: MatSnackBar) { }

  showToast(message: string, action?: string): void {
    this.matSnackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: ['app-snackbar-bg']
    });
  }

}
