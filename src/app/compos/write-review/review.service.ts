import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {map, switchMap, tap} from 'rxjs/operators';
import {MonthsEnum} from '../../enums/date.enum';
import {RawDateModel, ReviewInputModel, ReviewOutputModel} from '../display-review/review.model';
import {Observable} from 'rxjs';
import {ToastService} from "../shared-service/toast.service";

@Injectable({
    providedIn: 'root'
})
export class ReviewService {
    review$: Observable<ReviewOutputModel[]>;
    allReviews$: Observable<ReviewOutputModel[]>;
    reviewCollection = this.afs.collection('reviews');
    reviews$ = this.reviewCollection.snapshotChanges().pipe(
        map(changes => {
            return changes.map(a => {
                return a.payload.doc.data() as ReviewOutputModel;
            });
        })
    );
    constructor(private afs: AngularFirestore,
                private toastService: ToastService) {
    }
    addReview(review: ReviewInputModel): void {
       this.reviewCollection.add(review).then((i) => {
           this.toastService.showToast(`Thanks for reviewing "${review.restName}" :)`);
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
        this.review$ = this.afs.collection('reviews', ref => ref
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
        this.review$ = this.afs.collection('reviews', ref =>
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
        this.review$ = this.afs.collection('reviews', ref =>
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
