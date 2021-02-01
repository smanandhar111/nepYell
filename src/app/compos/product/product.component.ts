import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {ProductService} from './product.service';
import {NgForm} from '@angular/forms';
import {RestaurantFilterModel, SelectType} from '../../models/models';
import {BehaviorSubject, combineLatest} from 'rxjs';
import {catchError, delay, map} from 'rxjs/operators';
import {ProductsModel} from './products.model';
import {ReviewService} from '../write-review/review.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  options: string[] = [];
  subCitiesArray = [];
  newArray = [];
  citySelected = false;
  errMessage: string;
  restFilter: RestaurantFilterModel = {
    searchInput: '',
    restType : {
      Chinese: '',
      WesternFusion: '',
      TraditionalNepali: '',
      MomoSpeciality: '',
      Japanese: '',
      Newari: ''
    },
    locationType: {
      area: '',
      toal: '',
      allSubCities: '',
    },
    priceRangeType: ''
  };
  restFilterValArr =  [];
  priceRangeType: SelectType[] = this.productService.priceRangeType;
  searchTerm: string;
  @ViewChild('searchInput', {static: false}) searchInputEle: ElementRef;
  private categorySelectedSubject = new BehaviorSubject<string>('All');
  categorySelectedAction$ = this.categorySelectedSubject.asObservable();

  reviews$ = this.reviewService.reviews$.pipe();
  foodTypes$ = this.productService.foodTypes$.pipe();
  locations$ = this.productService.locations$.pipe();
  locationSubCity$ = combineLatest([
      this.productService.locations$, this.categorySelectedAction$
  ]).pipe(
      map(([products, selectedCategoryId]) =>
          products.filter(product => selectedCategoryId ? product.city === selectedCategoryId : true)),
      map(x => x.map((y) => {
        return y.subCity.split(',');
      })),
  );
  // Todo: Unsubscribe or see if we can call this from the template
  allSubCity = this.productService.locations$.pipe(
      map(locations => {
        locations.map((location) => {
          this.configAllSubCities(location.subCity);
        });
      })
  ).subscribe();
  products$ = this.productService.products$
      .pipe(
          map((products) => {
            return products.map((prod) => ({
              ...prod
            }) as ProductsModel);
          }),
          catchError(err => this.errMessage = err)
      );
  constructor(public router: Router,
              private reviewService: ReviewService,
              private productService: ProductService) { }

  ngOnInit() {
    const sessionTerm = sessionStorage.getItem('term');
    if (sessionTerm !== null) {
      this.options = JSON.parse(sessionStorage.term);
    }
  }
  // Todo: Fix naming conventions
  configAllSubCities(subCity) {
    this.subCitiesArray.push(subCity.split(','));
    this.subCitiesArray.forEach((sub) => {
      sub.forEach((i) => {
        this.newArray.push(i);
      });
    });
  }
  showInfo() {
    this.router.navigate(['/login']);
  }
  onChangeFoodType(foodType: any, isChecked: boolean): void {
    if (isChecked) {
      this.restFilterValArr.push(foodType);
    } else {
      const index = this.restFilterValArr.findIndex(x => x === foodType);
      this.restFilterValArr.splice(index, 1);
    }
  }
  onSubmit(restFilterForm: NgForm) {}
  onChangeSelect(value) {
    this.categorySelectedSubject.next(value);
    if (this.restFilter.locationType.toal) {
      this.restFilter.locationType.toal = '';
    }
  }

  onSubCitySelect(event): void {
    this.productService.subCitySelectSub.next(event.source.value);
  }
  onCitySelect(event): void {
    this.productService.citySelectSub.next(event.source.value);
  }
  onPriceRangeSelect(event): void {
    this.productService.priceRangeSelectSub.next(event.source.value);
  }

  optClick(city) {
    if (city) {
      this.citySelected = true;
      this.restFilter.locationType.allSubCities = '';
    } else {
      this.citySelected = false;
    }
  }
  clearFilter(e) {
    const elementName = e.target.previousElementSibling.lastElementChild
        .firstElementChild.firstElementChild.firstElementChild
        .getAttribute('name');

    if (elementName === 'citySelect') {
      this.restFilter.locationType.area = '';
      this.citySelected = false;
      this.restFilter.locationType.toal = '';
    }
    if (elementName === 'toalSelect') {
      this.restFilter.locationType.toal = '';
    }
    if (elementName === 'allSubCities') {
      this.restFilter.locationType.allSubCities = '';
    }
    if (elementName === 'priceRange') {
      this.restFilter.priceRangeType = '';
    }
  }
  // returns selected toal or allSubCities whichever is available
  // as UI wise there can only be either a toal or all city selection
  // both these select have the same data toal is specific to selected city
  getThis(): string {
    if (this.restFilter.locationType.toal) {
      return this.restFilter.locationType.toal;
    } else {
      return this.restFilter.locationType.allSubCities;
    }
  }
  convertToNumber(arg: string) {
    return parseInt(arg, 10);
  }
  search(): void {
    this.searchTerm = this.restFilter.searchInput;
    // adding the term to recent searches
    setTimeout(() => {
      this.addToSearchHistory();
    }, 2000);
  }
  addToSearchHistory(): void {
    this.options = JSON.parse(sessionStorage.term);
  }
  clearSearch(): void {
    this.restFilter.searchInput = '';
    this.searchTerm = '';
  }
  // after recent search options are click it automatically searches the keyword
  graduallySearch(): void {
    setTimeout(() => {
      this.search(); }, 200);
  }
  keydownSearch(): void {
    setTimeout(() => {
      if (this.restFilter.searchInput.length === 0) {
        this.searchTerm = '';
      }
    }, 200);
  }
  clearSearchGalleryChild(e): void {
    if (e === 'search') {
      this.clearSearch();
      this.searchInputEle.nativeElement.focus();
    }
    if (e === 'dropdown') {
      this.restFilter.priceRangeType = '';
      this.restFilter.locationType.allSubCities = '';
      this.restFilter.locationType.toal = '';
      this.restFilter.locationType.area = '';
      this.citySelected = false;
    }

  }
}
//  Create Wishlist
// Show wishlist resturant on the gallery 2nd or 4th in the top of the page to
// create a AI feel
