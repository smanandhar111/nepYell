import {Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges} from '@angular/core';
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

export class GalleryComponent implements OnInit, OnChanges {
  @Output() clearSearchKeyword: EventEmitter<string> = new EventEmitter<string>();
  @Input() reviews$: Observable< ReviewOutputModel[]>;
  @Input() products$: Observable<ProductsModel[]>;
  @Input() restFilterValArr: Array<string>;
  @Input() priceRangeSelect: number;
  @Input() fromWishList: boolean;
  @Input() subCitySelect: string;
  @Input() adminMode: boolean;
  @Input() citySelect: string;
  @Input() searchTerm: string;
  @Input() selfId: string;
  @Input() src: string;
  restaurants: ProductsModel[];
  filteredRestaurants: ProductsModel[] = [];
  restId: string;
  cityFilter = '';
  subCityFilter = '';
  priceRangeFilter = 0;
  constructor(private productService: ProductService,
              private router: Router,
              private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.productService.scrollToTop();
    this.products$.subscribe(prods => {
      this.restaurants = prods;
      this.filteredRestaurants = this.restaurants;
    });
  }

  clearAllFilters(): void {
    this.filteredRestaurants = this.restaurants;
  }

  updatingSomeFilter(key): void {
    this.clearAllFilters();
    const filterKeysArray = ['citySelect', 'priceRangeSelect', 'subCitySelect'];
    filterKeysArray.forEach(key => {
      this.allFilters(key);
    })
  }

  chooseFilterType(key, changeKey): void {
    if (key === 'priceRangeSelect') {
      if (changeKey.currentValue !== 0 && changeKey.previousValue === 0) {
        this.allFilters(key);
      } else if (changeKey.currentValue !== 0 && changeKey.previousValue !== 0) {
        console.log('filterNextFilter');
        this.updatingSomeFilter(key);
      } else if (changeKey.currentValue === 0 && changeKey.previousValue !== 0) {
        console.log('filterNoFilter');
        this.updatingSomeFilter(key);
      }
    } else {
      if (changeKey.currentValue !== '' && changeKey.previousValue === '') {
        this.allFilters(key);
        console.log('noFilterFilter');
      } else if (changeKey.currentValue !== '' && changeKey.previousValue !== '') {
        this.updatingSomeFilter(key);
        console.log('filterNextFilter');
      }  else if (changeKey.currentValue === '' && changeKey.previousValue !== '') {
        this.updatingSomeFilter(key);
        console.log('filterNoFilter');
      }
    }

  }

  allFilters(src): void {
    switch (src) {
      case 'citySelect':
        if (this.cityFilter !== '') {
          this.filteredRestaurants = this.filteredRestaurants
              .filter(item => item.location.area === this.cityFilter);
        }
        break;
      case 'subCitySelect':
        if (this.subCityFilter !== '') {
          this.filteredRestaurants = this.filteredRestaurants.filter(item => {
            return item.location.toal === this.subCityFilter;
          });
        }
        break;

      case 'priceRangeSelect':
        if (this.priceRangeFilter !== 0) {
          this.filteredRestaurants = this.filteredRestaurants.filter(item => {
            return item.priceRange === this.priceRangeFilter;
          });
        }
        break;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const changesLength = Object.keys(changes).length;
    if (changesLength < 3) {
      const keyArray = Object.keys(changes);
      keyArray.forEach(key => {
        switch (key) {
          case 'citySelect':
            this.cityFilter = changes[key].currentValue;
            this.chooseFilterType(key, changes[key]);
            break;

          case 'subCitySelect':
            this.subCityFilter = changes[key].currentValue;
            this.chooseFilterType(key, changes[key]);
            break;

          case 'priceRangeSelect':
            this.priceRangeFilter = changes[key].currentValue;
            this.chooseFilterType(key, changes[key]);
            break;
        }
        console.log('$$', this.filteredRestaurants);
      })
    }
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
