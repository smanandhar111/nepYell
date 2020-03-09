import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';

import {ProductService} from '../product/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {catchError, map} from 'rxjs/operators';
import {ProductsModel} from '../product/products.model';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  @Input() fromWishList: boolean;
  @Output() notify: EventEmitter<string> = new EventEmitter();
  @Input() selfId: string;
  @Input() adminMode: boolean;
  @Input() restFilterValArr: Array<string>;
  @Input() citySelect: string;
  @Input() subCitySelect: string;
  errMessage: string;
  openingTime: string;
  closingTime: string;
  closedToday = false;
  nextOpenDay: string;

  products$ = this.productService.products$
    .pipe(
        map((products) => {
          return products.map((prod) => ({
            ...prod,
            isOpen: this.checkIfOpen(prod.storeHours),
          }) as ProductsModel);
        }),
        catchError(err => this.errMessage = err)
    );
  constructor(private productService: ProductService,
              private router: Router,
              private route: ActivatedRoute) { }


  ngOnInit(): void {
  }

  getProdDetails(id: string) {
    this.router.navigate(['/product-info', id]);
  }

  checkIfOpen(storeHours): boolean {
    const date = new Date();
    const day = date.getDay();
    const hour = date.getHours();
    let hoursArr = [];
    // creating new Object with sorted days in a week
    const sortedWeek = {
      monday: storeHours.monday,
      tuesday: storeHours.tuesday,
      wednesday: storeHours.wednesday,
      thursday: storeHours.thursday,
      friday: storeHours.friday,
      saturday: storeHours.saturday,
      sunday: storeHours.sunday,
    };
    const sortedKeys = Object.keys(sortedWeek);
    for (let i = 0; i < sortedKeys.length; i++) {
      if (day === i + 1) {
        const dayHours = storeHours[sortedKeys[i]];
        if (dayHours === 'closed') {
          // add a function that takes the storeHours and sortedKeys and figure out
          // opening and closing time
          const nextDayArr = storeHours[sortedKeys[i + 1]].split('-');
          const amPm = (nextDayArr) ? 'AM' : 'PM';
          this.closedToday = true;
          this.nextOpenDay = `${sortedKeys[i + 1]} ${nextDayArr[0]} ${amPm}`;
          return false;
        } else {
          hoursArr = dayHours.split('-');
          this.openingTime = hoursArr[0];
          this.closingTime = hoursArr[1];
          const openingTime = parseInt(hoursArr[0], 10);
          const closingTime = parseInt(hoursArr[1], 10) + 12;

          if (hour < openingTime) {
            return false;
          } else if (hour >= openingTime && hour < closingTime) {
            return true;
          }
        }

      }
    }

  }
}
