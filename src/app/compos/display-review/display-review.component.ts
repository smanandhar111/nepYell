import {Component, Input, OnInit} from '@angular/core';
import {map} from 'rxjs/operators';
import {ReviewService} from '../write-review/review.service';
import {ReviewModel} from '../../models/models';
import {MatDialog} from '@angular/material/dialog';

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
  constructor(private reviewService: ReviewService,
              private dialog: MatDialog) { }
  @Input() restId: string;
  @Input() restName: string;
  ngOnInit() {}
}
