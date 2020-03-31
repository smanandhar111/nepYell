import {Component, OnInit} from '@angular/core';
import {ProductService} from '../product/product.service';
import {catchError, map} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {AddToFavModel} from '../../models/models';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {WriteReviewComponent} from '../write-review/write-review.component';
import {LoginModalComponent} from '../login-modal/login-modal.component';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit {
  productId = this.activeRoute.snapshot.paramMap.get('id');
  sessionStoreAuth = sessionStorage.getItem('auth');
  imgCaro = 1;
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
      catchError(err => this.errMessage = err)
    );

  constructor(private productService: ProductService,
              private activeRoute: ActivatedRoute,
              private authService: AuthService,
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
}
