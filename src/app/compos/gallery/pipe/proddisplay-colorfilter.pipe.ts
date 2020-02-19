import {PipeTransform, Pipe} from '@angular/core';
import {ProductsModel} from '../../product/products.model';

@Pipe({
  name: 'prodColorFilter'
})
export class ProddisplayColorFilterPipe implements PipeTransform {
  transform($prod: ProductsModel[], filterColor: string) {
    if (!$prod || !filterColor) {
      return $prod;
    } else {
      // return $prod.filter(prod => prod.primeColor.toLowerCase().indexOf(filterColor.toLowerCase()) !== -1);
    }
  }
}
