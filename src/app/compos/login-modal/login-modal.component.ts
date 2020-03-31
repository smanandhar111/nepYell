import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<LoginModalComponent>,
              private authService: AuthService) { }

  ngOnInit() {
  }
  loginGoogle(): void {
    this.authService.googleLogin();
    this.dialogRef.close();
  }
}
