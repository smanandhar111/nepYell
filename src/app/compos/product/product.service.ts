import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {ProductsModel} from './products.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {catchError, map, shareReplay, tap} from 'rxjs/operators';
import {AddToFavModel, LocationModel, SelectType} from '../../models/models';
import {throwError } from 'rxjs';

interface FoodTypes {
  foodType: string;
}

@Injectable({
    providedIn: 'root'
})
export class ProductService {
  uuid: string;
  restCollection = this.afs.collection('restaurants');
  foodTypeCollection = this.afs.collection('foodTypes');
  locationCollection = this.afs.collection('locations');
  cartItems$: Observable<AddToFavModel[]>;
  wishList$: Observable<AddToFavModel[]>;
  // Static Array to be shared with Multiple Components
  priceRangeType: SelectType[] = [
    {value: 'affordable', viewValue: 'Affordable', valNumber: 1},
    {value: 'reasonable', viewValue: 'Reasonable', valNumber: 2},
    {value: 'expensive', viewValue: 'Expensive', valNumber: 3},
  ];
  foodTypeFilSub = new BehaviorSubject<string[]>([]);
  foodTypeFil$ = this.foodTypeFilSub.asObservable();
  clearAllFiltersSub = new BehaviorSubject<boolean>(false);
  clearAllFilters$ = this.clearAllFiltersSub.asObservable();
  restNameSub = new BehaviorSubject<string>('');
  restName$ = this.restNameSub.asObservable();
  constructor(private afs: AngularFirestore) {
      this.getUserData();
  }

  products$ = this.restCollection.snapshotChanges().pipe(
    map(changes => {
      return changes.map(a => {
        const resp = a.payload.doc.data() as ProductsModel;
        resp.id = a.payload.doc.id;
        return resp;
      });
    }),
    // tap(data => console.log('restaurants', JSON.stringify(data))),
    shareReplay(1),
    catchError(this.handleError)
  );

  foodTypes$ = this.foodTypeCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          return a.payload.doc.data() as FoodTypes;
        });
      }),
      // tap(data => console.log('foodType', JSON.stringify(data))),
      shareReplay(1),
      catchError(this.handleError)
  );

  locations$ = this.locationCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          return a.payload.doc.data() as LocationModel;
        });
      }),
      // tap(data => console.log(JSON.stringify(data))),
      shareReplay(1),
      catchError(this.handleError)
  );

  getUserData(): void {
    this.cartItems$ = this.afs.collection(`userData/${this.uuid}/cart`).snapshotChanges()
      .pipe(
        map(changes => {
        return changes.map(a => {
          return a.payload.doc.data() as AddToFavModel;
        });
      }),
        catchError(this.handleError)
      );

    this.wishList$ = this.afs.collection(`userData/${this.uuid}/wish`).snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(a => {
            return a.payload.doc.data() as AddToFavModel;
          });
        }),
        catchError(this.handleError)
      );
  }

  handleError(err: any) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

  addToWish(addToFav: AddToFavModel) {
    this.afs.collection(`userData/${this.uuid}/wish`).add(addToFav);
  }

  addItem(restItem: ProductsModel) {
    this.restCollection.add(restItem);
  }

  addToCart(addToFav: AddToFavModel) {
    this.afs.collection(`userData/${this.uuid}/cart`).add(addToFav);
  }
  scrollToTop(): void {
      window.scroll(0, 0);
  }
  updateRating(restId: string, updatedRating: number): void {
      this.restCollection.doc(restId).update({
          rating: updatedRating
      });
  }
}
