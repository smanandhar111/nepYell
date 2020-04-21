import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';

import {ProductService} from '../product/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {catchError, map} from 'rxjs/operators';
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
  @Output() notify: EventEmitter<string> = new EventEmitter();
  @Input() selfId: string;
  @Input() adminMode: boolean;
  @Input() restFilterValArr: Array<string>;
  @Input() citySelect: string;
  @Input() subCitySelect: string;
  @Input() priceRangeSelect: number;

  constructor(private productService: ProductService,
              private router: Router,
              private route: ActivatedRoute) { }


  ngOnInit(): void {}

  getProdDetails(id: string) {
    this.router.navigate(['/product-info', id]);
  }
}
