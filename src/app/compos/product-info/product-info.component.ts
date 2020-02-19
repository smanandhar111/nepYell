import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../product/product.service';
import {catchError, map} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {AddToFavModel} from '../../models/models';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit, OnDestroy {
  productId = this.activeRoute.snapshot.paramMap.get('id');
  sessionStoreAuth = sessionStorage.getItem('auth');
  imgCaro = 1;
  inCart: boolean;
  wished: boolean;
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
              private authService: AuthService) { }

  ngOnInit() {
    // getting cartData
    setTimeout(() => {
      this.getCartData();
      }, 2000);

    this.authService.logStatus$.subscribe((user) => {
      if (user != null) {
        this.getCartData();
      } else {
        this.inCart = false;
        this.wished = false;
      }
    });
  }
  imgCaros(numb) {
    this.imgCaro = numb;
  }

  getCartData(): void {
    this.productService.getUserData();
    // Getting CartItems
    this.productService.cartItems$.pipe(
      map((cartItems) => {
        for (let i = 0; i < cartItems.length; i++) {
          if (cartItems[i].uid === this.productId) {
            this.inCart = true;
            break;
          } else {
            this.inCart = false;
          }
        }
      })
    ).subscribe(cart => {
    });

    this.productService.wishList$.pipe(
      map((wishLists) => {
        for (let i = 0; i < wishLists.length; i++) {
          if (wishLists[i].uid === this.productId) {
            this.wished = true;
            break;
          } else {
            this.wished = false;
          }
        }
      })
    ).subscribe();
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
  ngOnDestroy(): void {
  }

  addCartDisabled(src): boolean {
    // Todo: initially this.inCart returned undefined for 2 secounds until
    // Todo: but returns a boolean after the uuid is set and cartItems$ fires
    if (this.sessionStoreAuth === 'true') {
      if (src === 'cart') {
        return this.inCart ?  true : false;
      } else {
        return this.wished ? true : false;
      }
    } else {
      return false;
    }
  }
}
