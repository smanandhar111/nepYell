import {Component, Input, OnInit} from '@angular/core';
import {map} from 'rxjs/operators';
import {ReviewService} from '../write-review/review.service';
import {MatDialog} from '@angular/material/dialog';
import {ReviewOutputModel} from './review.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {SelectType} from '../../models/models';


@Component({
  selector: 'app-display-review',
  templateUrl: './display-review.component.html',
  styleUrls: ['./display-review.component.scss']
})
export class DisplayReviewComponent implements OnInit {
  numbItems = 5;
  numbItemRepeater: SelectType[] = [
        {valNumber: 5, viewValue: '5'},
        {valNumber: 10, viewValue: '10'}
    ];
  totalReviews: number;
  reviewLimit: number;
  fromHelper = 0;
  daFrom = this.figureDaFrom(this.fromHelper, this.numbItems);
  toHelper = 1;
  daTo = this.figureDaTo(this.toHelper, this.numbItems);
  constructor(private reviewService: ReviewService,
              private dialog: MatDialog) { }
  @Input() restId: string;
  @Input() restName: string;
  res$: Observable<ReviewOutputModel[]>;
  allReviews$: Observable<ReviewOutputModel[]>;
  disableNext = false;
  ngOnInit() {
      this.getReviews();
      this.getAllReviews();
  }
  getAllReviews(): void {
      this.reviewService.getAllReviews(this.restId);
      this.allReviews$ = this.reviewService.allReviews$;
  }
  getReviews(): void {
      this.reviewService.getReviews(this.restId, this.numbItems);
      if (this.reviewService.res$) {
          this.res$ = this.reviewService.res$;
      }
  }
  getReviewLength(reviewLength: number): void {
      this.totalReviews = reviewLength;
  }
  figureDaTo(toHelper: number, numbItems: number): number {
      const result = toHelper * numbItems;
      if (result >= this.totalReviews) {
          this.disableNext = true;
          return this.totalReviews;
      } else {
          this.disableNext = false;
          return result;
      }
  }
  figureDaFrom(fromHelper: number, numbItems: number): number {
      return  1 + (numbItems * this.fromHelper);
  }

  nextPage(reviews: ReviewOutputModel[]): void {
      const startAfter = reviews[reviews.length - 1].rawDate;
      this.reviewService.loadNext(startAfter, this.numbItems, this.restId);
      this.res$ = this.reviewService.res$;
      this.toHelper++;
      this.fromHelper++;
      this.daFrom = this.figureDaFrom(this.fromHelper, this.numbItems);
      this.daTo = this.figureDaTo(this.toHelper, this.numbItems);
  }
  prevPage(reviews: ReviewOutputModel[]): void {
      const endBefore = reviews[0].rawDate;
      this.reviewService.loadPrevious(endBefore, this.numbItems, this.restId);
      this.res$ = this.reviewService.res$;
      this.toHelper--;
      this.fromHelper--;
      this.daFrom = this.figureDaFrom(this.fromHelper, this.numbItems);
      this.daTo = this.figureDaTo(this.toHelper, this.numbItems);
  }
  onChangeSelect() {
      this.getReviews();
      this.daFrom = this.figureDaFrom(this.fromHelper, this.numbItems);
      this.daTo = this.figureDaTo(this.toHelper, this.numbItems);
  }
}
