import {Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {ProductService} from '../product/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductsModel} from '../product/products.model';
import {Observable} from 'rxjs';
import {ReviewOutputModel} from '../display-review/review.model';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit, OnChanges {
  @Output() clearSearchKeyword: EventEmitter<string> = new EventEmitter<string>();
  @Input() reviews$: Observable< ReviewOutputModel[]>;
  @Input() products$: Observable<ProductsModel[]>;
  @Input() restFilterValArr: Array<string>;
  @Input() priceRangeSelect: number;
  @Input() fromWishList: boolean;
  @Input() subCitySelect: string;
  @Input() adminMode: boolean;
  @Input() citySelect: string;
  @Input() searchTerm: string;
  @Input() selfId: string;
  @Input() src: string;
  restaurants: ProductsModel[];
  filteredRestaurants: ProductsModel[] = [];
  restId: string;
  subCityFil: string;
  constructor(private productService: ProductService,
              private router: Router,
              private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.productService.scrollToTop();
    this.products$.subscribe(prods => {
      this.filteredRestaurants = prods;
      console.log('>>', prods);
    });

    // subCitySelect
    this.productService.subCitySelect$.subscribe(subCity => {
      if (subCity !== '') {
        this.filteredRestaurants = this.filteredRestaurants.filter(item => {
          return item.location.toal === subCity;
        });
      }
    });

    this.productService.citySelect$.subscribe(city => {
      if (city !== '') {
        console.log('b4', this.filteredRestaurants);
        this.filteredRestaurants = this.filteredRestaurants.filter(item => {
          return item.location.area === city;
        });
        console.log('aFt', this.filteredRestaurants);
      }
    })

    this.productService.priceRangeSelect$.subscribe(range => {
      console.log('home');
      if (range !== null) {
        console.log('b4', this.filteredRestaurants);
        this.filteredRestaurants = this.filteredRestaurants.filter(item => {
          return item.priceRange === range;
        });
        console.log('aFt', this.filteredRestaurants);
      }
    })

  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(Object.keys(changes));
    // const changeItem = Object.keys(changes);
    // const itemVal = changes[changeItem[0]].currentValue;
    // console.log('item', itemVal);
    // console.log('chagfe', changes);
    //
    // if (changeItem[0] === 'citySelect') {
    //   this.filteredRestaurants = this.filteredRestaurants.filter(item => {
    //     return item.location.area === itemVal;
    //   });
    // }
    // switch (changeItem[0]) {
    //   case 'citySelect':
    //     this.filteredRestaurants = this.filteredRestaurants.filter(item => {
    //       return item.location.area === itemVal;
    //     });
    //     break;
    //
    //   case 'subCitySelect':
    //     this.filteredRestaurants = this.filteredRestaurants.filter(item => {
    //       return item.location.toal === itemVal;
    //     });
    //     break;
    // }
    // console.log('rest', this.filteredRestaurants);
    // console.log(changes);

  }

  getProdDetails(id: string) {
    this.router.navigate(['/product-info', id]);
  }
  clearSearch(): void {
    this.clearSearchKeyword.emit('search');
  }
  clearSelection(): void {
    this.clearSearchKeyword.emit('dropdown');
  }
  checkDropDown(): boolean { // checks if any dropdown is selected and if so true else false
    return this.citySelect !== '' || !isNaN(this.priceRangeSelect) || this.subCitySelect !== '';
  }
  getBestReview(restId: string, reviews: ReviewOutputModel[]): string {
    const results = [];
    reviews.map((x) => {
      if (restId === x.restID) {
        // pushing all the reviews for spc restaurant in an empty array
        results.push(x);
      }
    });
    // sorting to find the rest review
    results.sort((a, b) => {
      return b.rating - a.rating;
    });
    const bestReview = results[0];
    const reviewMaxLength = 75;
    const minRating = 3;
    if (bestReview !== undefined && bestReview.rating > minRating) {
      if (bestReview.review.length > reviewMaxLength) {
        return `${bestReview.review.slice(0, reviewMaxLength)}...`;
      } else {
        return `"${bestReview.review}"`;
      }
    } else {
      return '';
    }
  }
}
