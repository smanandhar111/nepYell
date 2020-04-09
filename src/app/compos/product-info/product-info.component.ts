import {Component, OnInit} from '@angular/core';
import {ProductService} from '../product/product.service';
import {catchError, map} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {AddToFavModel} from '../../models/models';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {WriteReviewComponent} from '../write-review/write-review.component';
import {LoginModalComponent} from '../login-modal/login-modal.component';
import {ReviewService} from '../write-review/review.service';
import {StoreHoursModel} from '../open-closed/storeHours.model';
import {ProductsModel} from '../product/products.model';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit {
  productId = this.activeRoute.snapshot.paramMap.get('id');
  sessionStoreAuth = sessionStorage.getItem('auth');
  errMessage: string;
  addToFav: AddToFavModel = {
    uid: ''
  };
  product$ = this.productService.products$
    .pipe(
      map(product =>
        product.filter(prod => {
          if (prod.id === this.productId) {
            return prod;
          }
        })),
        map(restaurant => {
          return restaurant.map(rest => ({
            ...rest,
            storeHoursString: this.configStoreHours(rest.storeHours)
          }) as unknown as ProductsModel);
        }),
      catchError(err => this.errMessage = err)
    );

    week = [
      {day: 'Monday', i: 1, status: ''},
      {day: 'Tuesday', i: 2, status: ''},
      {day: 'Wednesday', i: 3, status: ''},
      {day: 'Thursday', i: 4, status: ''},
      {day: 'Friday', i: 5, status: ''},
      {day: 'Saturday', i: 6, status: ''},
      {day: 'Sunday', i: 7, status: ''},
    ];
  constructor(private productService: ProductService,
              private activeRoute: ActivatedRoute,
              private authService: AuthService,
              private reviewService: ReviewService,
              private dialog: MatDialog) { }

  ngOnInit() {
  }

  addToFavClick(id: string, src: string) {
    this.addToFav.uid = id;
    if (this.sessionStoreAuth === 'true') {
      if (src === 'wish') {
        this.productService.addToWish(this.addToFav);
      } else {
        this.productService.addToCart(this.addToFav);
      }
    } else {
      this.authService.googleLogin();
    }
  }

  openRatingDialog(name, restID): void {
    const auth = sessionStorage.getItem('auth');
    if (auth === 'true') {
      const dialogConfig = new MatDialogConfig();
      const dialogRef = this.dialog.open(WriteReviewComponent, {
        data: {
          name,
          restID
        }
      });
    } else {
      const dialogConfig = new MatDialogConfig();
      const dialogRef = this.dialog.open(LoginModalComponent, {});
    }
  }
  configStoreHours(storeHours): StoreHoursModel {
    return {
      monday: this.sortHours(storeHours.monday),
      tuesday: this.sortHours(storeHours.tuesday),
      wednesday: this.sortHours(storeHours.wednesday),
      thursday: this.sortHours(storeHours.thursday),
      friday: this.sortHours(storeHours.friday),
      saturday: this.sortHours(storeHours.saturday),
      sunday: this.sortHours(storeHours.sunday)
    };
  }
  sortHours(hours: string): string {
    if (hours === 'closed') {
      return 'closed';
    } else {
      let openString;
      let closeString;
      const storeHoursArr = this.splitter(hours);
      let openTime = storeHoursArr[0];
      let closeTime = storeHoursArr[1];

      if (openTime === 12) {
        openString = `${openTime} pm`;
      }
      if (openTime > 12 && openTime !== 12) {
        openTime = openTime - 12;
        openString = `${openTime} pm`;
      } else if (openTime < 12) {
         openString = `${openTime} am`;
      }
      if (closeTime > 12) {
        closeTime = closeTime - 12;
        closeString = `${closeTime} pm`;
      } else {
        closeString = `${closeTime} am`;
      }
      return `${openString} - ${closeString}`;
    }
  }
  openClose(day: string, hour: string): void {
    const date = new Date();
    const today =  date.getDay();
    const currentHour = date.getHours();
    const storeHoursArr = this.splitter(hour);
    const evalOpnCls = () => {
      if (currentHour > storeHoursArr[0] && currentHour < storeHoursArr[1]) {
        return 'open';
      } else {
        return 'closed';
      }
    };
    this.week.forEach(daz => {
      if (today === daz.i) {
        daz.status = evalOpnCls();
      }
    });
  }
  splitter(hour: string): Array<number> {
    const splitArr = hour.split('-');
    return [parseInt(splitArr[0], 10), parseInt(splitArr[1], 10)];
  }
  // Todo: Fix its returning st
  getHoursClass(status: string): string {
    if (status !== '') {
      if (status === 'open') {
        return 'active open';
      } else {
        return 'active closed';
      }
    }
  }
}
