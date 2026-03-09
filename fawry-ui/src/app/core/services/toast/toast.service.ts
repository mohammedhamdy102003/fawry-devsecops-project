import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private snackBar: MatSnackBar) { }

  show(
    message: string,
    action: string = 'Ok',
    duration: number = 3000,
    panelClass: string[] = ['toast-default']
  ) {
    this.snackBar.open(message, action, {
      duration,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass
    });
  }

  success(message: string) {
    this.show(`✅ ${message}`, 'Ok', 3000, ['toast-success']);
  }

  error(message: string) {
    this.show(`❌ ${message}`, 'Close', 5000, ['toast-error']);
  }

  warning(message: string) {
    this.show(`⚠️ ${message}`, 'Close', 4000, ['toast-warning']);
  }

}
