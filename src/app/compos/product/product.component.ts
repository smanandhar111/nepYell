import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ProductService} from './product.service';
import {NgForm} from '@angular/forms';
import {RestaurantFilterModel} from '../../models/models';
import {BehaviorSubject, combineLatest} from 'rxjs';
import {map} from 'rxjs/operators';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  subCitiesArray = [];
  newArray = [];
  citySelected = false;
  foodTypes$ = this.productService.foodTypes$.pipe();
  locations$ = this.productService.locations$.pipe();
  private categorySelectedSubject = new BehaviorSubject<string>('All');
  categorySelectedAction$ = this.categorySelectedSubject.asObservable();
  locationSubCity$ = combineLatest([
      this.productService.locations$, this.categorySelectedAction$
  ]).pipe(
      map(([products, selectedCategoryId]) =>
          products.filter(product => selectedCategoryId ? product.city === selectedCategoryId : true)),
      map(x => x.map((y) => {
        return y.subCity.split(',');
      })),
  );
  allSubCity = this.productService.locations$.pipe(
      map(locations => {
        locations.map((location) => {
          this.configAllSubCities(location.subCity);
        });
      })
  ).subscribe();
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
    }
  };
  restFilterValArr =  [];

  constructor(public router: Router,
              private productService: ProductService) { }

  ngOnInit() {}
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
  }
  optClick(city) {
    if (city) {
      this.citySelected = true;
      if (this.restFilter.locationType.allSubCities) {
        this.restFilter.locationType.allSubCities = '';
      } else {
        this.citySelected = false;
      }
    }
  }
  clearFitler(e) {
    const elementName = e.target.previousElementSibling.lastElementChild
        .firstElementChild.firstElementChild.firstElementChild
        .getAttribute('name');

    if (elementName === 'citySelect') {
      this.restFilter.locationType.area = '';
      this.citySelected = false;
    }
    if (elementName === 'toalSelect') {
      this.restFilter.locationType.toal = '';
    }
    if (elementName === 'allSubCities') {
      this.restFilter.locationType.allSubCities = '';
    }
  }
}
