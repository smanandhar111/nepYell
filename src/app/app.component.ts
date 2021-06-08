import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from '@angular/router';
import {ProductService} from './compos/product/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  test: boolean;
  showLoadingIndicator: boolean;
  title = 'baseApp';
  currentRouteUrl;
  activeRestName;
  showActRestName = false;
  constructor(private router: Router,
              private productService: ProductService) {
    this.router.events.subscribe((routerEvent) => {
      if (routerEvent instanceof NavigationStart) {
        this.showLoadingIndicator = true;
      }
      if (routerEvent instanceof  NavigationEnd) {
        this.showLoadingIndicator = false;
      }
    });
  }
  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    this.showActRestName = window.pageYOffset > 310;
  }

  ngOnInit(): void {

    this.router.events.subscribe(event => {
      for (const eventKey in event) {
        if (eventKey === 'url') {
          this.currentRouteUrl = event[eventKey];
          break;
        }
      }
    });
    this.productService.restName$.subscribe(name => {
      this.activeRestName = name;
    });

  }

  showName(): boolean {
    if (this.currentRouteUrl !== undefined) {
      return this.currentRouteUrl.includes('/product-info/');
    }
  }
}
