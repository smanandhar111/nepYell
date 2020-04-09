import {Injectable, OnDestroy} from '@angular/core';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {ProductService} from '../product/product.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {catchError, map, shareReplay, take, tap} from 'rxjs/operators';
import {UserModel} from '../../models/models';
import {Subscription, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  login: Promise<any>;
  logStatus$ = this.af.user;
  usersCollection = this.afs.collection('users');
  usersSub: Subscription;
  userAdded: boolean;

  constructor(private af: AngularFireAuth,
              private afs: AngularFirestore,
              private productService: ProductService) {
  }

  googleLogin() {
    this.login = this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(() => {
      sessionStorage.setItem('auth', 'true');

      this.logStatus$.subscribe((user) => {
        // this function add the new users to the users Collection
        this.archiveUser(user.uid, user.displayName, user.photoURL, user.email);
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

  archiveUser(uid: string, userName: string, avatarUrl: string, email: string): void {
    const userData = { // getting data ready for adding to firebase fireStore
      uid,
      userName,
      avatarUrl,
      email
    };
    const users$ = this.usersCollection.snapshotChanges().pipe(
        map(changes => {
          return changes.map(a => {
            const users = a.payload.doc.data() as UserModel;
            users.id = a.payload.doc.id;
            return users;
          });
        }),
        map(users => {
          let bool: boolean;
          // tslint:disable-next-line:prefer-for-of
          for (let x = 0; x < users.length; x++) {
            if (email === users[x].email) {
              bool = true;
              break;
            } else {
              bool = false;
            }
          }
          if (!this.userAdded) {
            if (bool === true) {
              // this fn validates and updated the photoUrl
            } else {
              addToDb();
              this.userAdded = true;
            }
          }
          return 'this should only return once';
        }),
        tap(data => console.log(JSON.stringify(data))),
        shareReplay(1),
        take(1),
        catchError(this.productService.handleError)
    ).subscribe();
    const addToDb = () => {
      this.usersCollection.add(userData);
    };
  }
}


