import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ProductService} from './product.service';
import {map} from 'rxjs/operators';
import {NgForm} from '@angular/forms';
import {RestaurantFilterModel} from '../../models/models';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  foodTypes$ = this.productService.foodTypes$.pipe();
  locations$ = this.productService.locations$.pipe();
  restFilter: RestaurantFilterModel = {
    Chinese: '',
    WesternFusion: '',
    TraditionalNepali: '',
    MomoSpeciality: '',
    Japanese: '',
    Newari: ''
  };
  restFilterValArr =  [];
  constructor(public router: Router,
              private productService: ProductService) { }

  ngOnInit() {}
  showInfo() {
    this.router.navigate(['/login']);
  }
  onChangeFoodType(val): void {
    const play = val.source.value;
    if (val.checked === true) {
      this.restFilterValArr.push(play);
    } else {
      this.restFilterValArr = this.restFilterValArr.filter(i => i !== play);
    }
  }
  onSubmit(restFilterForm: NgForm) {
    console.log(restFilterForm);
  }
}
