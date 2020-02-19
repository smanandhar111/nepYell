import {Component, Input, Output, EventEmitter} from '@angular/core';

import {ProductService} from '../product/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {
  @Input() filterType: string;
  @Input() filterPrice: string;
  @Input() filterColor: string;
  @Input() fromWishList: boolean;
  @Output() notify: EventEmitter<string> = new EventEmitter();
  @Input() selfId: string;
  @Input() adminMode: boolean;
  errMessage: string;

  products$ = this.productService.products$
    .pipe(
      catchError(err => this.errMessage = err)
    );
  constructor(private productService: ProductService,
              private router: Router,
              private route: ActivatedRoute) { }


  getProdDetails(id: string) {
    this.router.navigate(['/product-info', id]);
  }

  // Copy of Clipboard
  copyId(val: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
  removeItem(id: string) {
    this.notify.emit(id);
  }
}
