import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ProductService} from './product.service';
import {NgForm} from '@angular/forms';
import {RestaurantFilterModel, SelectType} from '../../models/models';
import {BehaviorSubject, combineLatest} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {ProductsModel} from './products.model';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  subCitiesArray = [];
  newArray = [];
  citySelected = false;
  errMessage: string;
  letsGetSticky: boolean;
  private categorySelectedSubject = new BehaviorSubject<string>('All');
  categorySelectedAction$ = this.categorySelectedSubject.asObservable();
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
  // Todo: Unsubscribe
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
  restFilter: RestaurantFilterModel = {
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

  constructor(public router: Router,
              private productService: ProductService) { }

  ngOnInit() {}
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
  optClick(city) {
    if (city) {
      this.citySelected = true;
      this.restFilter.locationType.allSubCities = '';
    } else {
      this.citySelected = false;
    }
  }
  clearFitler(e) {
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

  // @HostListener('window:scroll', [])
  // onWindowScroll() {
  //   this.letsGetSticky = window.pageYOffset > 1;
  // }
}
