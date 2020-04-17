import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {MonthsEnum} from '../../enums/date.enum';
import {ReviewInputModel, ReviewOutputModel} from '../display-review/review.model';

@Injectable({
    providedIn: 'root'
})
export class ReviewService {
    reviewCollection = this.afs.collection('reviews');
    reviews$ = this.reviewCollection.snapshotChanges().pipe(
        map(changes => {
            return changes.map(a => {
                return a.payload.doc.data() as ReviewOutputModel;
            });
        })
    );
    constructor(private afs: AngularFirestore) {
    }
    addReview(review: ReviewInputModel): void {
       this.reviewCollection.add(review).then((i) => {
           console.log('added');
       });
    }
    convertDate(date: Date): string {
        const dd = date.getDate();
        const mm = MonthsEnum[date.getMonth()];
        const yyyy = date.getFullYear();
        return `${dd} ${mm}, ${yyyy}`;
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
