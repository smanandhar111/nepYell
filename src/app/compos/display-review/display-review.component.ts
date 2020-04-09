import {Component, Input, OnInit} from '@angular/core';
import {map} from 'rxjs/operators';
import {ReviewService} from '../write-review/review.service';
import {ReviewModel} from '../../models/models';

@Component({
  selector: 'app-display-review',
  templateUrl: './display-review.component.html',
  styleUrls: ['./display-review.component.scss']
})
export class DisplayReviewComponent implements OnInit {
  reviews$ = this.reviewService.reviews$.pipe(
      map(reviews => reviews.filter(review => {
        if (this.restId === review.restID) {
          return review as ReviewModel;
        }
      }))
  );
  constructor(private reviewService: ReviewService) { }
  @Input() restId: string;
  ngOnInit() {
  }

}
