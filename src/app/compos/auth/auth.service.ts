import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {ProductService} from '../product/product.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  login: Promise<any>;
  logStatus$ = this.af.user;
  constructor(private af: AngularFireAuth,
              private productService: ProductService) {}

  googleLogin() {
    this.login = this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(() => {
      sessionStorage.setItem('auth', 'true');

      this.logStatus$.subscribe((user) => {
        const sessionAuth = sessionStorage.getItem('auth');
        if (sessionAuth === 'true') {
          sessionStorage.setItem('uuid', user.uid);
          this.productService.uuid = user.uid;
        }
      });
    });
  }
  googleLogout() {
    this.af.auth.signOut().then(() => {
      sessionStorage.setItem('auth', 'false');
      sessionStorage.setItem('uuid', null);
    });
  }
}




