import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from '../product/product.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ProductsModel} from '../product/products.model';

@Component({
  selector: 'app-similar-ones',
  templateUrl: './similar-ones.component.html',
  styleUrls: ['./similar-ones.component.scss']
})
export class SimilarOnesComponent implements OnInit {
  @Input() foodType: string;
  @Input() area: string;
  @Input() toal: string;
  @Input() priceRange: number;
  @Input() restId: string;
  constructor(private productService: ProductService) { }
  SimilarRestaurants$: Observable<ProductsModel[]>;
  ngOnInit() {
      this.SimilarRestaurants$ = this.productService.products$.pipe(
          map(rest => rest.filter(res => {
              if (res.foodType === this.foodType) {
                return res;
              }
          })),
          map(restFil => restFil.filter(r => {
              if (r.id !== this.restId) {
                  return r;
              }
          }))
      );
  }

}
