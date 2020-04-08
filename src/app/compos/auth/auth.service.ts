import {Injectable, OnDestroy} from '@angular/core';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {ProductService} from '../product/product.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {UserModel} from '../../models/models';
import {Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  login: Promise<any>;
  logStatus$ = this.af.user;
  usersCollection = this.afs.collection('users');
  usersSub: Subscription;
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
    const emailArray = []; // empty array to store added uids
    const users$ = this.usersCollection.snapshotChanges().pipe(
        map(changes => {
          return changes.map(a => {
            return a.payload.doc.data() as UserModel;
          });
        }),
    );
    this.usersSub = users$.subscribe((users) => {
      users.forEach(user => {
        // Todo : the identifier should probably change to email instead of uid
        // Todo: Check after FB is also integrated to the app
        emailArray.push(user.email); // pushing added uids to Array
      });
    });
    // can't call this function under subscribe as it ends in an endless loop
    // could use on stream complete but firebase Observables don't return complete
    setTimeout(() => {
      let isThere: boolean;
      // loops over entire array of uids, after if not there adds to the list else nothing
      // tslint:disable-next-line:prefer-for-of
      for (let x = 0; x < emailArray.length; x++) {
        if (emailArray[x] === email) {
          isThere = true;
          break;
        } else {
          isThere = false;
        }
      }
      if (isThere)  {
        this.validatePhotoUrl(); // This function makes sure the PhotoUrl is upToDate
        this.usersSub.unsubscribe();
        // Todo: add a function that checkout if photoUrl matches the one we have on file
      } else {
        this.usersCollection.add(userData).then(() => {
          this.usersSub.unsubscribe();
        });
      }
    }, 5000);
  }
  validatePhotoUrl(): void {

  }
}


