import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from './auth.service';
import {Observable, of, Subscription} from 'rxjs';
import {ProductService} from '../product/product.service';
import {catchError, map} from 'rxjs/operators';
import {AddToFavModel} from '../../models/models';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {WriteReviewComponent} from '../write-review/write-review.component';
import {LoginModalComponent} from "../login-modal/login-modal.component";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  authenticatedUserInfo: any;
  userLoggedIn: boolean;
  authSub: Subscription;
  errMessage: string;
  cartLength: number;
  uuid: string;


  constructor(private authService: AuthService,
              private productService: ProductService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.authSub = this.authService.logStatus$.subscribe((user) => {
      this.authenticatedUserInfo = user;
      this.userLoggedIn = this.authenticatedUserInfo != null;

      if (this.userLoggedIn) {
        this.productService.uuid = user.uid;

        // Waiting 2 seconds for UUID to be in the productService
        // Todo: Find a way not to use Timeout
        setTimeout(() => {
          this.productService.getUserData();
          if (this.productService.cartItems$) {
            this.productService.cartItems$.subscribe(cart => {
              this.cartLength = cart.length;
            });
          }
        }, 2000);
      }
      // setting uuid after using log in the first time
      const sessionUuid = sessionStorage.getItem('uuid');
      const sessionAuth = sessionStorage.getItem('auth');
      if (!sessionUuid) {
        (this.userLoggedIn) ? sessionStorage.setItem('uuid', user.uid) :
          sessionStorage.setItem('uuid', null);
      }
      if (!sessionAuth) {
        (this.userLoggedIn) ? sessionStorage.setItem('auth', 'true') :
          sessionStorage.setItem('auth', 'false');
      }
    });
  }

  login(): void {
    this.authService.googleLogin();
  }
  logout(): void {
    this.authService.googleLogout();
  }
  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }
  openLoginModal(): void {
    const dialogConfig = new MatDialogConfig();
    const dialogRef = this.dialog.open(LoginModalComponent, {
      data: {
        name
      }
    });
  }
}
