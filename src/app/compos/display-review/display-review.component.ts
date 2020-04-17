import {Component, Input, OnInit} from '@angular/core';
import {map} from 'rxjs/operators';
import {ReviewService} from '../write-review/review.service';
import {ReviewModel} from '../../models/models';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {LoginModalComponent} from '../login-modal/login-modal.component';

@Component({
  selector: 'app-display-review',
  templateUrl: './display-review.component.html',
  styleUrls: ['./display-review.component.scss']
})
export class DisplayReviewComponent implements OnInit {
  currentDate = this.reviewService.convertDate(new Date());
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
  ngOnInit() {
  }
  areaFocused(): void {
    const sessionAuth = sessionStorage.getItem('auth');
    if (sessionAuth === 'true') {
        // pop up Write Review Dialog
    } else {
        const dialogConfig = new MatDialogConfig();
        const dialogRef = this.dialog.open(LoginModalComponent, {
            data: {
                note: `Please Sign in to Post a review for ${this.restName}`,
            }
        });
    }
  }
}
