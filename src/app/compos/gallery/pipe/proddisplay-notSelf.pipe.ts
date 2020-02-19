import {PipeTransform, Pipe} from '@angular/core';
import {ProductsModel} from '../../product/products.model';

@Pipe({
  name: 'notSelf'
})
export class ProddisplayNotSelfPipe implements PipeTransform {
  transform($prod: ProductsModel[], selfId: string) {

    if (!$prod || !selfId) {
      return $prod;
    } else {
      return $prod.filter(prod => prod.id !== selfId);
    }
  }
}
