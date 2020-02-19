import {PipeTransform, Pipe} from '@angular/core';
import {ProductsModel} from '../../product/products.model';

@Pipe({
  name: 'prodPriceFilter'
})
export class ProddisplayPricefilterPipe implements PipeTransform {
  transform($prod: ProductsModel[], filterPrice: string) {
    if (!$prod || !filterPrice) {
      return $prod;
    } else {
      // return $prod.filter( (prod) =>  {
      //   switch (filterPrice) {
      //     case 'lessThan100':
      //       return prod.price <= 100;
      //     case '100-500':
      //       return prod.price > 100 && prod.price <= 500;
      //     case '500-1000':
      //       return prod.price > 500 && prod.price <= 1000;
      //     case 'MoreThan1000':
      //       return prod.price >= 1000;
      //   }
      // });
    }
  }
}
