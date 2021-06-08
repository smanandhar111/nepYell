import {Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, OnDestroy} from '@angular/core';
import {ProductService} from '../product/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductsModel} from '../product/products.model';
import {Observable, Subscription} from 'rxjs';
import {ReviewOutputModel} from '../display-review/review.model';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})

export class GalleryComponent implements OnInit, OnChanges, OnDestroy {
  @Output() clearSearchKeyword: EventEmitter<string> = new EventEmitter<string>();
  @Input() reviews$: Observable< ReviewOutputModel[]>;
  @Input() products$: Observable<ProductsModel[]>;
  @Input() priceRangeSelect: number;
  @Input() fromWishList: boolean;
  @Input() subCitySelect: string;
  @Input() adminMode: boolean;
  @Input() citySelect: string;
  @Input() searchTerm: string;
  @Input() selfId: string;
  @Input() src: string;
  clearAllFiltersSubscription: Subscription;
  restaurants: ProductsModel[];
  filteredRestaurants: ProductsModel[] = [];
  restId: string;
  cityFilter = '';
  subCityFilter = '';
  priceRangeFilter = 0;
  foodTypeFil = [];
  filterKeyListArray = ['citySelect', 'priceRangeSelect', 'subCitySelect'];
  searchTermFil = undefined;
  constructor(private productService: ProductService,
              private router: Router,
              private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.productService.scrollToTop();
    this.products$.subscribe(prods => {
      this.restaurants = prods;
      this.filteredRestaurants = this.restaurants;
    });
    this.productService.foodTypeFil$.subscribe(foodTypeArray => {
      this.foodTypeFil = foodTypeArray;
      this.chooseFilterTypeCheckbox(foodTypeArray);
    });

    this.clearAllFiltersSubscription = this.productService.clearAllFilters$.subscribe(isCleared => {
      if (isCleared) {
        this.clearAllFilters();
      }
    });
  }

  clearAllFilters(): void {
    this.filteredRestaurants = this.restaurants;
  }

  updatingSameFilter(): void {
    this.clearAllFilters();
    this.updateAllDropdownFilters();
  }

  updateAllDropdownFilters(): void {
    this.filterKeyListArray.forEach(filterKey => {
      this.allFilters(filterKey);
    });
  }

  chooseFilterTypeCheckbox(foodTypeArray): void {
    const finalArray = [];
    if (foodTypeArray.length > 0) {
      foodTypeArray.forEach(foodType => {
        this.restaurants.filter(item => {
          if (item.foodType === foodType) {
            finalArray.push(item);
          }
        });
        this.filteredRestaurants = finalArray;
      });
      this.updateAllDropdownFilters();
    } else {
      if (this.cityFilter === '' && this.subCityFilter === '' && this.priceRangeFilter === 0) {
        this.filteredRestaurants = this.restaurants;
      } else {
        this.updatingSameFilter();
      }
    }

    // console.log(this.filteredRestaurants);
  }

  chooseFilterType(key, changeKey): void {
    if (key === 'priceRangeSelect') {
      if (changeKey.currentValue !== 0 && changeKey.previousValue === 0) {
        this.allFilters(key);
      } else {
        this.updatingSameFilter();
      }
    } else if (key === 'searchTerm') {
      if ((changeKey.currentValue !== undefined && changeKey.previousValue === undefined) ||
          (changeKey.currentValue !== '' && changeKey.previousValue === '')) {
        this.allFilters(key);
      } else if (changeKey.currentValue === '' && changeKey.previousValue !== '') {
        this.clearAllFilters();
      }
    } else {
      if (changeKey.currentValue !== '' && changeKey.previousValue === '') {
        this.allFilters(key);
      } else {
        this.updatingSameFilter();
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

      case 'searchTerm':
        if (this.searchTermFil !== '') {
          this.filteredRestaurants = this.filteredRestaurants.filter(item => {
            return item.name === this.searchTermFil;
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

          case 'searchTerm':
            this.searchTermFil = changes[key].currentValue;
            this.chooseFilterType(key, changes[key]);
            break;
        }
      });
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

  ngOnDestroy(): void {
    this.clearAllFiltersSubscription.unsubscribe();
  }
}
