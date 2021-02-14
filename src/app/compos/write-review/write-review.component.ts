import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {RateStarModel} from '../../models/models';
import {ReviewService} from './review.service';
import {ReviewInputModel} from '../display-review/review.model';
import {ProductService} from "../product/product.service";


@Component({
  selector: 'app-write-review',
  templateUrl: './write-review.component.html',
  styleUrls: ['./write-review.component.scss']
})
export class WriteReviewComponent implements OnInit {
  name: string;
  restID: string;
  displayName: string;
  photoURL: string;
  oldRating: number;
  reviewLength: number;
  rateStars: RateStarModel[] = [
    {des: 'I have seen better', numb: 1, hover: false, clicked: false},
    {des: 'Could have been better', numb: 2, hover: false, clicked: false},
    {des: 'We pretty good', numb: 3, hover: false, clicked: false},
    {des: 'Awesome place, I recommend it', numb: 4, hover: false, clicked: false},
    {des: 'Biggest Fan, will be there for all my meals', numb: 5, hover: false, clicked: false},
  ];
  rating = null;
  review = '';
  constructor(public dialogRef: MatDialogRef<WriteReviewComponent>,
              private reviewService: ReviewService,
              private productService: ProductService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.name = data.name;
    this.restID = data.restID;
    this.displayName = data.displayName;
    this.photoURL = data.photoURL;
    this.oldRating = data.oldRating;
    this.reviewLength = data.reviewLength;
  }

  ngOnInit() {}
  rated(numb: number): void {
    this.rateStars.forEach((i) => {
      i.clicked = i.numb <= numb;
    });
    this.rating = numb;
  }
  submitReview(): void {
    const reviewData: ReviewInputModel = {
      rawDate: new Date().getTime(),
      postedDate : this.reviewService.convertDate(new Date()),
      userID : sessionStorage.getItem('uuid'),
      rating: this.rating,
      review: this.review,
      restID: this.restID,
      displayName: this.displayName,
      photoURL: this.photoURL,
      restName: this.name
    };
    const updatedRating = this.ratingCalculator(reviewData.rating);
    setTimeout(() => {
      this.productService.updateRating(reviewData.restID, updatedRating);
    }, 500);
    this.reviewService.addReview(reviewData);
    // Clear the UI after submit
    this.rateStars.forEach((i) => {
      i.clicked = false;
    });
    this.review = '';
    this.dialogRef.close();
  }
  ratingCalculator(newRating: number): number {
    // const reviewLength = this.reviewLength + 1; // adding one to adjust for the base Rating given @ init
    // const t = 0.99 - (reviewLength / 100);
    // const optNewRating = newRating *  t;
    // const addRating = this.oldRating + optNewRating;
    // return addRating / (reviewLength + 1);
    const sumedRating = this.oldRating + newRating;
    return sumedRating / 2;

  }
  checkDisability(): boolean {
    return this.review === '' || this.rating === null;
  }
  starHovered(rateStar): void {
    const numb = rateStar.numb;
    this.rateStars.forEach((i) => {
      if (i.numb <= numb) {
        i.hover = true;
      }
    });
  }
  starUnHovered(): void {
    this.rateStars.forEach((i) => {
      i.hover = false;
    });
  }
}
