import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {RateStarModel, ReviewModel} from '../../models/models';
import {ReviewService} from './review.service';

@Component({
  selector: 'app-write-review',
  templateUrl: './write-review.component.html',
  styleUrls: ['./write-review.component.scss']
})
export class WriteReviewComponent implements OnInit {
  name: string;
  restID: string;
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
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.name = data.name;
    this.restID = data.restID;
  }

  ngOnInit() {
    console.log(this.restID);
  }
  rated(numb: number): void {
    this.rateStars.forEach((i) => {
      i.clicked = i.numb <= numb;
    });
    this.rating = numb;
  }
  submitReview(): void {
    const reviewData: ReviewModel = {
      postedDate : new Date(),
      userID : sessionStorage.getItem('uuid'),
      rating: this.rating,
      review: this.review
    };
    this.reviewService.addReview(reviewData, this.restID);
    // Clear the UI after submit
    this.rateStars.forEach((i) => {
      i.clicked = false;
    });
    this.review = '';
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