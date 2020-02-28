export interface ProductsModel {
  name: string;
  location: {
    area: string;
    toal: string
  };
  foodType: string;
  priceRange: number;
  rating: number;
  hovered: boolean;
  phoneNumber: string;
  phoneNumberTwo?: string;
  review?: {
    reviewer: string;
    review: string;
    reviewRating: number;
  };
  id?: string;
  images: {
    menu: {
      menuOne: string;
      menuTwo?: string;
      menuThree?: string;
      menuFour?: string;
      menuFive?: string;
      menuSix?: string;
    },
    outlet: {
      outletOne: string;
      outletTwo?: string;
      outletThree?: string;
      outletFour?: string;
      outletFive?: string;
      outletSix?: string;
    }
  };
  services: {
    creditCards: boolean;
    selfService: boolean;
  };
  storeHours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  isOpen?: boolean;
}
