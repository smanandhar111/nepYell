import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ProductService} from './product.service';
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
  onChangeFoodType(foodType: any, isChecked: boolean): void {
    if (isChecked) {
      this.restFilterValArr.push(foodType);
    } else {
      const index = this.restFilterValArr.findIndex(x => x === foodType);
      this.restFilterValArr.splice(index, 1);
    }
  }
  onSubmit(restFilterForm: NgForm) {
    console.log(restFilterForm);
  }
}
