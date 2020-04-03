import {Injectable} from '@angular/core';
import {ReviewModel} from '../../models/models';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ReviewService {
    reviewCollection = this.afs.collection('reviews');
    reviews$ = this.reviewCollection.snapshotChanges().pipe(
        map(changes => {
            return changes.map(a => {
                return a.payload.doc.data() as ReviewModel;
            });
        })
    );
    constructor(private afs: AngularFirestore) {
    }
    addReview(review: ReviewModel): void {
       this.reviewCollection.add(review).then((i) => {
           console.log('added');
       });
    }
}


// products$ = this.restCollection.snapshotChanges().pipe(
//     map(changes => {
//         return changes.map(a => {
//             const resp = a.payload.doc.data() as ProductsModel;
//             resp.id = a.payload.doc.id;
//             return resp;
//         });
//     }),
//     tap(data => console.log('restaurants', JSON.stringify(data))),
//     shareReplay(1),
//     catchError(this.handleError)
// );
