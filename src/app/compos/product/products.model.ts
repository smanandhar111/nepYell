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
    menu: [],
    outlet: []
  };
  services: {
    creditCards: boolean;
    selfService: boolean;
    serveAlcohol: boolean;
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
  storeHoursString?: string;
}

export interface FoodTypeModel {
  foodType: string;
}

export interface LocationsModel {
  city: string;
  subCity: Array<string>;
}
