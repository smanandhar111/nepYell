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
    restType: {
        Chinese: string;
        WesternFusion: string;
        TraditionalNepali: string;
        MomoSpeciality: string;
        Japanese: string;
        Newari: string;
    };
    locationType: {
        area: string;
        toal: string;
        allSubCities: string;
    };
    priceRangeType: string;
}
