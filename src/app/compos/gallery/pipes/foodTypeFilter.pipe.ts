import { Pipe, PipeTransform } from '@angular/core';
import { ProductsModel } from '../../product/products.model';

@Pipe({
    name: 'foodTypeFilter'
})

export class FoodTypeFilterPipe implements PipeTransform {
    transform(prodItems: ProductsModel[], restFilterValArr: Array<string>): any {
        if (!prodItems || restFilterValArr.length === 0) {
            return prodItems;
        } else {
            console.log('hello', restFilterValArr);
            let ree;
            return prodItems.filter(prod => {
                restFilterValArr.forEach((i) => {
                    if (i === prod.foodType) {
                        ree = prod;
                        // return ree;
                    }
                });
                // console.log(ree);
                return ree;
            });

        }
    }
}
