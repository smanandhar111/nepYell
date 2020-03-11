import { Component, OnInit } from '@angular/core';
import {ProductsModel} from '../product/products.model';
import {NgForm} from '@angular/forms';
import {ProductService} from '../product/product.service';
import {SelectType} from '../../models/models';
import {BehaviorSubject, combineLatest} from 'rxjs';
import {map} from 'rxjs/operators';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  private categorySelectedSubject = new BehaviorSubject<string>('All');
  categorySelectedAction$ = this.categorySelectedSubject.asObservable();
  locationSubCity$ = combineLatest([
    this.productService.locations$, this.categorySelectedAction$
  ]).pipe(
      map(([products, selectedCategoryId]) =>
          products.filter(product => selectedCategoryId ? product.city === selectedCategoryId : true)),
      map(x => x.map((y) => {
        return y.subCity.split(',');
      })),
  );
  restItem: ProductsModel = {
    name: '',
    location: {
      area: '',
      toal: ''
    },
    foodType: '',
    priceRange: null,
    rating: null,
    phoneNumber: '',
    phoneNumberTwo: '',
    hovered: false,
    review:  {
      reviewer: '',
      review: '',
      reviewRating: null
    },
    id: '',
    images: {
      menu: {
        menuOne: '',
        menuTwo: '',
        menuThree: '',
        menuFour: '',
        menuFive: '',
        menuSix: ''
      },
      outlet: {
        outletOne: '',
        outletTwo: '',
        outletThree: '',
        outletFour: '',
        outletFive: '',
        outletSix: ''
      }
    },
    services: {
      creditCards: false,
      selfService: false,
      serveAlcohol: false,
    },
    storeHours: {
      monday: '',
      tuesday: '',
      wednesday: '',
      thursday: '',
      friday: '',
      saturday: '',
      sunday: '',
    }
  };
  yesNoType: SelectType[] = [
    {value: 'yes', viewValue: 'Yes', boolean: true},
    {value: 'no', viewValue: 'No', boolean: false}
  ];
  priceRangeType: SelectType[] = this.productService.priceRangeType;
  outletImgCount: number;
  menuImgCount: number;
  menuImages = [
    {name: 'menuOne', srcModel: 'restItem.images.menu.menuOne'},
    {name: 'menuTwo', srcModel: 'restItem.images.menu.menuTwo'},
    {name: 'menuThree', srcModel: 'restItem.images.menu.menuThree'},
    {name: 'menuFour', srcModel: 'restItem.images.menu.menuFour'},
    {name: 'menuFive', srcModel: 'restItem.images.menu.menuFive'},
    {name: 'menuSix', srcModel: 'restItem.images.menu.menuSix'},
  ];
  outletImages = [
    {name: 'outletOne', srcModel: 'restItem.images.outlet.outletOne'},
    {name: 'outletTwo', srcModel: 'restItem.images.outlet.outletTwo'},
    {name: 'outletThree', srcModel: 'restItem.images.outlet.outletThree'},
    {name: 'outletFour', srcModel: 'restItem.images.outlet.outletFour'},
    {name: 'outletFive', srcModel: 'restItem.images.outlet.outletFive'},
    {name: 'outletSix', srcModel: 'restItem.images.outlet.outletSix'},
  ];
  citySelected = false;
  alterPhone = false;
  foodTypes$ = this.productService.foodTypes$.pipe();
  locations$ = this.productService.locations$.pipe();
  constructor(private productService: ProductService) { }

  ngOnInit() {}

  onSubmit(addProdForm: NgForm) {
    this.productService.addItem(this.restItem);
    addProdForm.resetForm();
    // clear preview images
    this.restItem.images.outlet.outletOne = '';
    this.restItem.images.outlet.outletTwo = '';
    this.restItem.images.outlet.outletThree = '';

    this.restItem.images.menu.menuOne = '';
    this.restItem.images.menu.menuTwo = '';
    this.restItem.images.menu.menuThree = '';
  }
  clearInput(e): void {
    const inputName = e.target.previousElementSibling.name;
    // if (inputName === 'name') {
    //   this.restItem.name = '';
    // }
    // if (inputName === 'description') {
    //   this.restItem.description = '';
    // }
    // if (inputName === 'price') {
    //   this.restItem.price = null;
    // }
    // if (inputName === 'imageUrl') {
    //   this.restItem.imageUrl = '';
    // }
    // if (inputName === 'imageUrlTwo') {
    //   this.restItem.imageUrlTwo = '';
    // }
    // if (inputName === 'imageUrlThree') {
    //   this.restItem.imageUrlThree = '';
    // }
    // if (inputName === 'imageUrlFour') {
    //   this.restItem.imageUrlFour = '';
    // }
    // if (inputName === 'primeColor') {
    //   this.restItem.primeColor = '';
    // }
    //
    // if (inputName === 'compProd') {
    //   this.restItem.compProd = '';
    // }
    // if (inputName === 'imgDem') {
    //   this.restItem.imgDem = '';
    // }
  }

  changeCount(val, src) {
    (src === 'menu') ? this.menuImgCount = val : this.outletImgCount = val;
  }

  activeAltPh(): void {
    this.alterPhone = true;
  }

  referenceImg(restName): void {
    // looping over the outlet Object to get the specific imgRef variable
    //  so it can be assigned to the right imgUrl
    const outletObj = Object.keys(this.restItem.images.outlet);
    const menuObj = Object.keys(this.restItem.images.menu);
    const restImgPath = '../../../assets/img/restaurants';

    for (let i = 0; i < this.menuImgCount; i++) {
      this.restItem.images.menu[menuObj[i]] = `${restImgPath}/${restName}/${restName}Menu${i + 1}.jpg`;
    }
    for (let i = 0; i < this.outletImgCount; i++) {
      this.restItem.images.outlet[outletObj[i]] = `${restImgPath}/${restName}/${restName}${i + 1}.jpg`;
    }
    // Because the image name is tied to the name of the restaurant we can't capitalize and give space btw in the input
    // this below line converts the name input to proper Spacing and Capitalizes and sets it as the restaurants name
    this.restItem.name = restName.charAt(0).toUpperCase() + restName.substring(1).replace(/([A-Z])/g, ' $1').trim();
  }
  onChangeSelect(value) {
    this.categorySelectedSubject.next(value);
  }
  optClick(city) {
    city ? this.citySelected = true : this.citySelected = false;
  }
}
