import {Injectable} from '@angular/core';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {ProductService} from '../product/product.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {catchError, map, shareReplay, take, tap} from 'rxjs/operators';
import {UserModel} from '../../models/models';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {WriteReviewComponent} from '../write-review/write-review.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  login: Promise<any>;
  logStatus$ = this.af.user;
  usersCollection = this.afs.collection('users');
  userAdded: boolean;

  constructor(private af: AngularFireAuth,
              private afs: AngularFirestore,
              private dialog: MatDialog,
              private productService: ProductService) {
  }

  googleLogin(hasNote?: boolean, restName?: string, restId?: string): void {
    this.login = this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(() => {
      this.returnAuthPromise(hasNote, restName, restId);
    });
  }
  facebookLogin(hasNote?: boolean, restName?: string, restId?: string): void {
    this.login = this.af.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then((xx) => {
      this.returnAuthPromise(hasNote, restName, restId);
    });
  }

  googleLogout() {
    this.af.auth.signOut().then(() => {
      sessionStorage.setItem('auth', 'false');
      sessionStorage.setItem('uuid', null);
    });
  }
  // both login src google and facebook go through these functions
  returnAuthPromise(hasNote?: boolean, restName?: string, restId?: string): void {
    sessionStorage.setItem('auth', 'true');
    // TODO : Unsubscribe too
    this.logStatus$.subscribe((user) => {
      if (hasNote) {
        const dialogConfig = new MatDialogConfig();
        const dialogRef = this.dialog.open(WriteReviewComponent, {
          data: {
            name: restName,
            restID: restId,
            displayName: user.displayName,
            photoURL: user.photoURL
          }
        });
      }
      // this function add the new users to the users Collection
      this.archiveUser(user.uid, user.displayName, user.photoURL, user.email);
      const sessionAuth = sessionStorage.getItem('auth');
      if (sessionAuth === 'true') {
        sessionStorage.setItem('uuid', user.uid);
        this.productService.uuid = user.uid;
      }
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
            if (uid === users[x].uid) {
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


