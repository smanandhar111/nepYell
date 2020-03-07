export interface SelectType {
  value: string;
  viewValue: string;
  valNumber?: number;
  boolean?: boolean;
}

export interface WishCart {
  id: string;
}

export interface AddToFavModel {
  uid: string;
}

export interface  LocationModel {
    subCity: string;
    city: string;
}

export interface RestaurantFilterModel {
    Chinese: any;
    WesternFusion: any;
    TraditionalNepali: any;
    MomoSpeciality: any;
    Japanese: any;
    Newari: any;
}
