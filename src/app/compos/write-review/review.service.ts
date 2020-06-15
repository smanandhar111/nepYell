import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {map, switchMap, tap} from 'rxjs/operators';
import {MonthsEnum} from '../../enums/date.enum';
import {RawDateModel, ReviewInputModel, ReviewOutputModel} from '../display-review/review.model';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ReviewService {
    res$: Observable<ReviewOutputModel[]>;
    allReviews$: Observable<ReviewOutputModel[]>;
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
    getAllReviews(restId: string): void {
        this.allReviews$ = this.afs.collection('reviews', ref => ref
            .where('restID', '==', restId)).snapshotChanges().pipe(
            map(changes => {
                return changes.map(a => {
                    const review = a.payload.doc.data() as ReviewOutputModel;
                    review.id = a.payload.doc.id;
                    return review;
                });
            })
        );
    }
    getReviews(restId: string, limit: number): void {
        this.res$ = this.afs.collection('reviews', ref => ref
            .orderBy('rawDate', 'desc')
            .where('restID', '==', restId).limit(limit))
            .snapshotChanges().pipe(
            map(changes => {
                return changes.map(a => {
                    const review = a.payload.doc.data() as ReviewOutputModel;
                    review.id = a.payload.doc.id;
                    return review;
                });
            })
        );
    }
    loadNext(startAt: number, limit: number, restId: string): void {
        this.res$ = this.afs.collection('reviews', ref =>
                ref.where('restID', '==', restId)
                    .orderBy('rawDate', 'desc')
                    .startAfter(startAt).limit(limit)).snapshotChanges().pipe(
            map(changes => {
                return changes.map(a => {
                    const review = a.payload.doc.data() as ReviewOutputModel;
                    review.id = a.payload.doc.id;
                    return review;
                });
            })
        );
    }
    loadPrevious(endBefore: number, limit: number, restId: string): void {
        this.res$ = this.afs.collection('reviews', ref =>
            ref.where('restID', '==', restId)
                .orderBy('rawDate', 'desc')
                .endBefore(endBefore).limitToLast(limit)).snapshotChanges().pipe(
            map(changes => {
                return changes.map(a => {
                    const review = a.payload.doc.data() as ReviewOutputModel;
                    review.id = a.payload.doc.id;
                    return review;
                });
            })
        );
    }
}
