import {PipeTransform, Pipe} from '@angular/core';
import {ProductsModel} from '../../product/products.model';

@Pipe({
    name: 'subCitySelectFilter'
})
export class SubCityFilterPipe implements PipeTransform {
    transform(prodItems: ProductsModel[], subCitySelect: string) {
        if (!prodItems || !subCitySelect) {
            return prodItems;
        } else {
            return prodItems.filter(prod => prod.location.toal.toLowerCase().indexOf(subCitySelect.toLowerCase()) !== -1);
        }
    }
}
