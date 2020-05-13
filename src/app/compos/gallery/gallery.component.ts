import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {ProductService} from '../product/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductsModel} from '../product/products.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  @Input() src: string;
  @Input() products$: Observable<ProductsModel[]>;
  @Input() fromWishList: boolean;
  @Output() clearSearchKeyword: EventEmitter<string> = new EventEmitter<string>();
  @Input() selfId: string;
  @Input() adminMode: boolean;
  @Input() restFilterValArr: Array<string>;
  @Input() citySelect: string;
  @Input() subCitySelect: string;
  @Input() priceRangeSelect: number;
  @Input() searchTerm: string;

  constructor(private productService: ProductService,
              private router: Router,
              private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.productService.scrollToTop();
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
}
