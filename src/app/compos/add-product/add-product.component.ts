import { Component, OnInit } from '@angular/core';
import {ProductsModel} from '../product/products.model';
import {NgForm} from '@angular/forms';
import {ProductService} from '../product/product.service';
import {SelectType} from '../../models/models';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  restItem: ProductsModel = {
    name: '',
    location: {
      area: '',
      toal: ''
    },
    foodType: '',
    priceRange: null,
    rating: null,
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
      selfService: false
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
  locationArea: SelectType[] = [
    {value: 'kathmandu', viewValue: 'Kathmandu'},
    {value: 'bhaktapur', viewValue: 'Bhaktapur'},
    {value: 'partan', viewValue: 'Partan'},
  ];
  locationToal: SelectType[] = [
    {value: 'dillibazar', viewValue: 'Dillibazar'},
    {value: 'new Road', viewValue: 'New Road'},
    {value: 'thamel', viewValue: 'Thamel'},
  ];
  foodType: SelectType[] = [
    {value: 'tradNepali', viewValue: 'Traditional Nepali'},
    {value: 'momoPasal', viewValue: 'Momo Pasal'},
    {value: 'newari', viewValue: 'Newari'},
  ];
  yesNoType: SelectType[] = [
    {value: 'yes', viewValue: 'Yes'},
    {value: 'no', viewValue: 'No'}
  ];
  outletImgCount = 3;
  menuImgCount = 2;
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
  constructor(private productService: ProductService) { }

  ngOnInit() {}

  onSubmit(addProdForm: NgForm) {
    this.productService.addItem(this.restItem);
    addProdForm.resetForm();
  }
  // autoFill(): any {
  //   this.restItem.foodType = 'Nepali local';
  //   this.restItem.images.menu.imgUrlOne = '';
  //   this.restItem.name = 'BombDigity';
  //   this.restItem.location.area = '';
  //   this.restItem.location.toal = '';
  //   this.restItem.priceRange = Math.floor(Math.random() * 1000) + 1;
  //   this.restItem.rating = 4.3;
  //   this.restItem.hovered = false;
  //   this.restItem.review.reviewer = 'Mr.x';
  //   this.restItem.review.reviewRating = 2.0;
  //   this.restItem.images.outlet.imgUrlOne = '';
  //   this.restItem.images.outlet.imgUrlTwo = '';
  //   this.restItem.images.outlet.imgUrlThree = '';
  //   this.restItem.services.selfService = false;
  //   this.restItem.services.creditCards = false;
  // }
  // clearAll(addProdForm): any {
  //   addProdForm.resetForm();
  // }
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

  referenceImg(restName): void {
    // looping over the outlet Object to get the specific imgRef variable
    //  so it can be assigned to the right imgUrl
    const outletObj = Object.keys(this.restItem.images.outlet);
    const menuObj = Object.keys(this.restItem.images.menu);
    for (const key of outletObj) {
      this.restItem.images.outlet[key] = `../../../assets/img/restaurants/${restName}/${restName}${outletObj.indexOf(key) + 1}.jpg`;
    }
    for (const key of menuObj) {
      this.restItem.images.menu[key] = `../../../assets/img/restaurants/${restName}/${restName}${menuObj.indexOf(key) + 1}.jpg`;
    }
  }
}
