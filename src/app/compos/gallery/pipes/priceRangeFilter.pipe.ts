import {PipeTransform, Pipe} from '@angular/core';
import {ProductsModel} from '../../product/products.model';

@Pipe({
    name: 'priceRangeFilter'
})
export class PriceRangeFilterPipe implements PipeTransform {
    transform(prodItems: ProductsModel[], priceRangeSelect: number) {
        if (!prodItems || !priceRangeSelect) {
            return prodItems;
        } else {
            return prodItems.filter(prod => {
                if (prod.priceRange === priceRangeSelect) {
                    return prod;
                }
            });
        }
    }
}
