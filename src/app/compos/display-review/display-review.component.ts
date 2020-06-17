import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ReviewService} from '../write-review/review.service';
import {MatDialog} from '@angular/material/dialog';
import {ReviewOutputModel} from './review.model';
import {Observable} from 'rxjs';
import {SelectType} from '../../models/models';

@Component({
  selector: 'app-display-review',
  templateUrl: './display-review.component.html',
  styleUrls: ['./display-review.component.scss']
})
export class DisplayReviewComponent implements OnInit {
  constructor(private reviewService: ReviewService,
              private dialog: MatDialog) { }
  @Input() restId: string;
  @Input() restName: string;
  @ViewChild('reviewComp', {static: false}) reviewCompEle: ElementRef;
  numbItems = 5;
  numbItemRepeater: SelectType[] = [
      {valNumber: 5, viewValue: '5'},
      {valNumber: 10, viewValue: '10'}
  ];
  totalReviews: number;
  fromHelper = 0;
  toHelper = 1;
  daFrom = this.figureDaFrom(this.fromHelper, this.numbItems);
  daTo = this.figureDaTo(this.toHelper, this.numbItems);
  review$: Observable<ReviewOutputModel[]>;
  allReviews$: Observable<ReviewOutputModel[]>;
  disableNext = false;
  reviewCompTop: number;
  reviewCompHeight: string;
  reviewCompHeightVal: string;
  ngOnInit() {
      this.getReviews();
      this.getAllReviews();
      setTimeout(() => {
          const elementInfo = this.reviewCompEle.nativeElement.getBoundingClientRect();
          this.reviewCompTop = elementInfo.y;
          this.reviewCompHeightVal = `${elementInfo.height}px`;
          this.reviewCompHeight = this.reviewCompHeightVal;
          }, 300);
  }
  getAllReviews(): void {
      this.reviewService.getAllReviews(this.restId);
      this.allReviews$ = this.reviewService.allReviews$;
  }
  getReviews(): void {
      this.reviewService.getReviews(this.restId, this.numbItems);
      if (this.reviewService.review$) {
          this.review$ = this.reviewService.review$;
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
      this.prevNextCommon('next');
  }
  prevPage(reviews: ReviewOutputModel[]): void {
      const endBefore = reviews[0].rawDate;
      this.reviewService.loadPrevious(endBefore, this.numbItems, this.restId);
      this.prevNextCommon('previous');
  }
  prevNextCommon(src: string): void {
      this.review$ = this.reviewService.review$;
      if (src === 'next') {
          this.toHelper++;
          this.fromHelper++;
          const diff = this.totalReviews - this.daTo;
          if (diff >= 5) {
              this.reviewCompHeight = this.reviewCompHeightVal;
          } else {
              this.reviewCompHeight = 'auto';
          }
      } else {
          this.toHelper--;
          this.fromHelper--;
      }
      this.daFrom = this.figureDaFrom(this.fromHelper, this.numbItems);
      this.daTo = this.figureDaTo(this.toHelper, this.numbItems);
      const headerHeightNPadding = 74; // 64px height of header 10px padding
      const finalReviewCompTop = this.reviewCompTop - headerHeightNPadding;
      if (this.reviewCompTop) {
          window.scroll(0, finalReviewCompTop );
      }
      console.log(this.daTo, 'and', this.totalReviews);

  }
  onChangeSelect() {
      this.getReviews();
      this.daFrom = this.figureDaFrom(this.fromHelper, this.numbItems);
      this.daTo = this.figureDaTo(this.toHelper, this.numbItems);
  }
}
