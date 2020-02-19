import {PipeTransform, Pipe} from '@angular/core';
import {ProductsModel} from '../../product/products.model';

@Pipe({
  name: 'prodFilter'
})
export class ProddisplayFilterPipe implements PipeTransform {
  transform($prod: ProductsModel[], filterType: string) {
    if (!$prod || !filterType) {
      return $prod;
    } else {
      // return $prod.filter(prod =>
        // prod.type.toLowerCase().indexOf(filterType.toLowerCase()) !== -1);
    }
  }
}
