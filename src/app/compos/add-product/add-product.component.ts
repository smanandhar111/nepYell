import { Component, OnInit } from '@angular/core';
import {ProductsModel} from '../product/products.model';
import {NgForm} from '@angular/forms';
import {ProductService} from '../product/product.service';
import {SelectType} from '../../models/models';
import {BehaviorSubject, combineLatest} from 'rxjs';
import {map} from 'rxjs/operators';
import {ImageCountModel} from './imageCount.model';
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
  imgCount: ImageCountModel = {
    outlet: 0,
    menu: 0,
  };
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
      // todo
      menu: [],
      // todo
      outlet: []
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
  outletImageCount: number;
  menuImageCount: number;
  citySelected = false;
  alterPhone = false;
  foodTypes$ = this.productService.foodTypes$.pipe();
  locations$ = this.productService.locations$.pipe();
  constructor(private productService: ProductService) { }

  ngOnInit() {}

  onSubmit(addProdForm: NgForm) {
    this.productService.addItem(this.restItem);
    addProdForm.resetForm();
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

  activeAltPh(): void {
    this.alterPhone = true;
  }

  referenceImg(restName): void {
    // looping over the outlet Object to get the specific imgRef variable
    //  so it can be assigned to the right imgUrl
    const restImgPath = '../../../assets/img/restaurants';
    for (let i = 0; i < this.imgCount.menu; i++) {
      const preText = `${restImgPath}/${restName}/${restName}Menu${i + 1}.jpg`;
      // @ts-ignore
      this.restItem.images.menu.push(preText);
    }
    for (let i = 0; i < this.imgCount.outlet; i++) {
      const preText = `${restImgPath}/${restName}/${restName}${i + 1}.jpg`;
      // @ts-ignore
      this.restItem.images.outlet.push(preText);
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
