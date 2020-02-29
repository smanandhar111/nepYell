import { Component, OnInit } from '@angular/core';
import {SelectType} from '../../models/models';
import {Router} from '@angular/router';
import {ProductService} from './product.service';
import {map} from 'rxjs/operators';
import {Observable, from} from 'rxjs';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
    foodTypeArray = [];
  foodTypes$ = this.productService.foodTypes$.pipe(
      map((categories) => {
        categories.map((d) => {
          const something = Object.values(d);
          from(something).subscribe((types) => {
              console.log('***', types);
              this.foodTypeArray = types;
          });
        });
      }),
  ).subscribe();
  constructor(public router: Router,
              private productService: ProductService) { }

  ngOnInit() {

  }

  showInfo() {
    this.router.navigate(['/login']);
  }
}
