import {Component, OnInit} from '@angular/core';
import {ProductService} from '../product/product.service';
import {catchError, map} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {WriteReviewComponent} from '../write-review/write-review.component';
import {LoginModalComponent} from '../login-modal/login-modal.component';
import {ReviewService} from '../write-review/review.service';
import {StoreHoursModel} from '../open-closed/storeHours.model';
import {ProductsModel} from '../product/products.model';
import {ReviewOutputModel} from '../display-review/review.model';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit {
  productId = this.activeRoute.snapshot.paramMap.get('id');
  errMessage: string;
  currentDate = this.reviewService.convertDate(new Date());
  product$ = this.productService.products$.pipe(
      map(product =>
        product.filter(prod => {
          if (prod.id === this.productId) {
            return prod;
          }
        })),
      catchError(err => this.errMessage = err)
    );
  logStatus$ = this.authService.logStatus$.pipe();
  reviews$ = this.reviewService.reviews$.pipe(
      map(reviews => reviews.filter(review => {
        if (this.productId === review.restID) {
          return review as ReviewOutputModel;
        }
      }))
  );

  constructor(private productService: ProductService,
              private activeRoute: ActivatedRoute,
              private authService: AuthService,
              private reviewService: ReviewService,
              private dialog: MatDialog) { }

  ngOnInit() {}
  getSessionAuth(): boolean {
    const sessionAuth = sessionStorage.getItem('auth');
    return sessionAuth === 'true';
  }
  openRatingDialog(name, restID, displayName, photoURL): void {
      const dialogConfig = new MatDialogConfig();
      const dialogRef = this.dialog.open(WriteReviewComponent, {
        data: {
          name,
          restID,
          displayName,
          photoURL
        }
      });
  }
  firstLogIn(restName: string, restId: string): void {
    const dialogConfig = new MatDialogConfig();
    const dialogRef = this.dialog.open(LoginModalComponent, {
      data: {
        note: `Please Sign in to Post a review for ${restName}`,
        restName,
        restId,
      }
    });
  }

  // Todo: openclosedComp also has one
  splitter(hour: string): Array<number> {
    const splitArr = hour.split('-');
    return [parseInt(splitArr[0], 10), parseInt(splitArr[1], 10)];
  }
  // Todo: Fix its returning st

  areaFocused(restName: string, restId: string): void {
    const sessionAuth = sessionStorage.getItem('auth');
    if (sessionAuth === 'true') {
      // pop up Write Review Dialog
    } else {
      this.firstLogIn(restName, restId);
    }
  }
  getPlaceHolder(restName: string, reviewLength: number): string {
    if (reviewLength === 0) {
      return `Be the 1st one to review ${restName}`;
    } else {
      return `Please review ${restName}`;
    }
  }
}
