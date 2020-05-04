import {PipeTransform, Pipe} from '@angular/core';
import {ProductsModel} from '../../product/products.model';

@Pipe({
    name: 'searchTermFilter'
})

export class SearchTermFilterPipe implements PipeTransform {
    transform(prodItems: ProductsModel[], searchTerm: string ): any {
        if (!prodItems || !searchTerm) {
            return prodItems;
        } else {
            const returner = prodItems.filter(prod => prod.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
            if (returner.length > 0) {
                // converting searchTerm into CapitalCase to avoid double in recentSearch
                searchTerm = searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1);
                // this fn saves the latest search terms
                const arr = [];
                const sessionTerm = sessionStorage.getItem('term');
                if (sessionTerm === null) {
                    arr.push(searchTerm);
                    sessionStorage.setItem('term', JSON.stringify(arr));
                } else {
                    const sessionTermArr = JSON.parse(sessionStorage.term);
                    if (!sessionTermArr.includes(searchTerm)) { // makes sure to avoid adding if already there
                        if (sessionTermArr.length === 5) { // removes the 1st search if more than 5
                            sessionTermArr.slice(0, 1);
                        }
                        sessionTermArr.push(searchTerm);
                        sessionStorage.setItem('term', JSON.stringify(sessionTermArr));
                    }
                }
                return returner;
            }
        }
    }
}
