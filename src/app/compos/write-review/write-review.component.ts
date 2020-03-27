import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {RateStarModel} from '../../models/models';

@Component({
  selector: 'app-write-review',
  templateUrl: './write-review.component.html',
  styleUrls: ['./write-review.component.scss']
})
export class WriteReviewComponent implements OnInit {
  name: string;
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
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.name = data.name;
  }

  ngOnInit() {
    console.log(this.name);
  }
  rated(numb: number): void {
    this.rateStars.forEach((i) => {
      i.clicked = i.numb <= numb;
    });
    this.rating = numb;
  }
  submitReview(): void {
    this.rateStars.forEach((i) => {
      i.clicked = false;
    });
    this.review = '';
  }
  checkDisability(): boolean {
    if (this.review === '' || this.rating === null) {
      return true;
    } else {
      return false;
    }
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
