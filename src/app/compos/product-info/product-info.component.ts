import {Component, OnInit} from '@angular/core';
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
export class ProductInfoComponent implements OnInit {
  productId = this.activeRoute.snapshot.paramMap.get('id');
  sessionStoreAuth = sessionStorage.getItem('auth');
  imgCaro = 1;
  inCart: boolean;
  wished: boolean;
  errMessage: string;
  addToFav: AddToFavModel = {
    uid: ''
  };
  imgHovered = false;

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

    // this.authService.logStatus$.subscribe((user) => {
    //   if (user != null) {
    //
    //   } else {
    //     this.inCart = false;
    //     this.wished = false;
    //   }
    // });
  }
  imgCaros(numb) {
    this.imgCaro = numb;
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
  toggleImg(): void {
    // this.imgHovered = true;
  }
}
