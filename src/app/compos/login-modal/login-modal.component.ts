import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {
  note: string;
  restName: string;
  restId: string;
  constructor(public dialogRef: MatDialogRef<LoginModalComponent>,
              private authService: AuthService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.note = data.note;
    this.restName = data.restName;
    this.restId = data.restId;
  }

  ngOnInit() {}
  loginGoogle(): void {
    if (this.note !== undefined) {
      this.authService.googleLogin(true, this.restName, this.restId);
      this.dialogRef.close();
    } else {
      this.authService.googleLogin(false, this.restName, this.restId);
      this.dialogRef.close();
    }
  }
}
