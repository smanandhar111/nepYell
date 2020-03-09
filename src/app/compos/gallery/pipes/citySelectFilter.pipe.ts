import {PipeTransform, Pipe} from '@angular/core';
import {ProductsModel} from '../../product/products.model';

@Pipe({
    name: 'citySelectFilter'
})
export class CitySelectFilterPipe implements PipeTransform {
    transform(prodItems: ProductsModel[], citySelect: string) {
        if (!prodItems || !citySelect) {
            return prodItems;
        } else {
            return prodItems.filter(prod => prod.location.area.toLowerCase().indexOf(citySelect.toLowerCase()) !== -1);
        }
    }
}
