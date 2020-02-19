import { Component, OnInit } from '@angular/core';
import {SelectType} from '../../models/models';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  filterType: string;
  filterPrice: string;
  filterColor: string;

  prodTypes: SelectType[] = [
    {value: 'earring', viewValue: 'Earring'},
    {value: 'necklace', viewValue: 'Necklace'},
    {value: 'bracelet', viewValue: 'Bracelet'},
    {value: 'clothing', viewValue: 'Clothing'},
  ];
  prodPrices: SelectType[] = [
    {value: 'lessThan100', viewValue: 'Less Than Rs.100'},
    {value: '100-500', viewValue: 'Rs.100 - Rs.500'},
    {value: '500-1000', viewValue: 'Rs.500 - Rs1000'},
    {value: 'MoreThan1000', viewValue: 'More Than Rs.1000'}
  ];
  prodColors: SelectType[] = [
    {value: 'gold', viewValue: 'Gold'},
    {value: 'silver', viewValue: 'Silver'},
    {value: 'blue', viewValue: 'Blue'},
    {value: 'pink', viewValue: 'Pink'}
  ];
  constructor(public router: Router) { }
  ngOnInit() {
  }

  clearFilterType(e) {
    const elementName = e.target.previousElementSibling.lastElementChild
      .firstElementChild.firstElementChild.firstElementChild
      .getAttribute('name');
    if (elementName === 'type') {
      this.filterType = '';
    }
    if (elementName === 'price') {
      this.filterPrice = '';
    }
    if (elementName === 'color') {
      this.filterColor = '';
    }
  }

  showInfo() {
    this.router.navigate(['/login']);

  }
}
