import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {ProductService} from '../product/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductsModel} from '../product/products.model';
import {Observable} from 'rxjs';
import {ReviewOutputModel} from '../display-review/review.model';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  @Input() src: string;
  @Input() products$: Observable<ProductsModel[]>;
  @Input() fromWishList: boolean;
  @Output() clearSearchKeyword: EventEmitter<string> = new EventEmitter<string>();
  @Input() selfId: string;
  @Input() adminMode: boolean;
  @Input() restFilterValArr: Array<string>;
  @Input() citySelect: string;
  @Input() subCitySelect: string;
  @Input() priceRangeSelect: number;
  @Input() searchTerm: string;
  @Input() reviews$: Observable< ReviewOutputModel[]>;
  restId: string;
  constructor(private productService: ProductService,
              private router: Router,
              private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.productService.scrollToTop();
  }

  getProdDetails(id: string) {
    this.router.navigate(['/product-info', id]);
  }
  clearSearch(): void {
    this.clearSearchKeyword.emit('search');
  }
  clearSelection(): void {
    this.clearSearchKeyword.emit('dropdown');
  }
  checkDropDown(): boolean { // checks if any dropdown is selected and if so true else false
    return this.citySelect !== '' || !isNaN(this.priceRangeSelect) || this.subCitySelect !== '';
  }
  getBestReview(restId: string, reviews: ReviewOutputModel[]): string {
    const results = [];
    reviews.map((x) => {
      if (restId === x.restID) {
        // pushing all the reviews for spc restaurant in an empty array
        results.push(x);
      }
    });
    // sorting to find the rest review
    results.sort((a, b) => {
      return b.rating - a.rating;
    });
    const bestReview = results[0];
    const reviewMaxLength = 75;
    const minRating = 3;
    if (bestReview !== undefined && bestReview.rating > minRating) {
      if (bestReview.review.length > reviewMaxLength) {
        return `${bestReview.review.slice(0, reviewMaxLength)}...`;
      } else {
        return `"${bestReview.review}"`;
      }
    } else {
      return '';
    }
  }
}
