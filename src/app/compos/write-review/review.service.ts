import {Injectable} from '@angular/core';
import {ReviewModel} from '../../models/models';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class ReviewService {

    constructor(private afs: AngularFirestore) {
    }
    addReview(review: ReviewModel, restID: string): void {
       // const reviewCollection = this.afs.collection(`restaurants/${restID}/review`);
       // reviewCollection.add(review).then((i) => {
       //     console.log('added');
       // });
    }
}
