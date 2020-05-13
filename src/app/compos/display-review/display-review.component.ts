import {Component, Input, OnInit} from '@angular/core';
import {map} from 'rxjs/operators';
import {ReviewService} from '../write-review/review.service';
import {MatDialog} from '@angular/material/dialog';
import {ReviewOutputModel} from './review.model';

@Component({
  selector: 'app-display-review',
  templateUrl: './display-review.component.html',
  styleUrls: ['./display-review.component.scss']
})
export class DisplayReviewComponent implements OnInit {
  reviews$ = this.reviewService.reviews$.pipe(
      map(reviews => reviews.filter(review => {
        if (this.restId === review.restID) {
          return review as ReviewOutputModel;
        }
      })),
      // sorting the review accord to date and time
      map(result => result.sort((a, b) => {
          return b.rawDate.seconds - a.rawDate.seconds;
      }))
  );
  constructor(private reviewService: ReviewService,
              private dialog: MatDialog) { }
  @Input() restId: string;
  @Input() restName: string;
  ngOnInit() {}
}
