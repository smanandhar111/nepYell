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
            const addToRecentSearch = (returner: ProductsModel[]) => {
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
                        if (sessionTermArr.includes(searchTerm)) { // makes sure to avoid adding if already there

                        } else {
                            if (sessionTermArr.length === 5) { // removes the 1st search if more than 5
                                sessionTermArr.pop();
                            }
                            sessionTermArr.unshift(searchTerm);
                            sessionStorage.setItem('term', JSON.stringify(sessionTermArr));
                        }
                    }
                }
            };
            const loopGather = (returnArray: ProductsModel[]) => {
                returnArray.forEach((i) => {
                    finalSearchResults.push(i);
                });
            };

            const returnerName = prodItems.filter(prod => prod.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
            addToRecentSearch(returnerName);
            const returnerFoodType = prodItems.filter(prod => prod.foodType.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
            addToRecentSearch(returnerFoodType);
            const returnerSubCity = prodItems.filter(prod => prod.location.toal.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
            addToRecentSearch(returnerSubCity);
            const finalSearchResults = [];

            loopGather(returnerFoodType);
            loopGather(returnerName);
            loopGather(returnerSubCity);
            return finalSearchResults;

        }
    }
}
