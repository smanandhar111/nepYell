export interface SelectType {
  value?: string;
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
    searchInput: string;
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
    priceRangeType: number;
}

export interface RateStarModel {
    des: string;
    numb: number;
    hover: boolean;
    clicked: boolean;
}

export interface WeatherModel {
    weather: any;
    name: string;
    description: string;
    main: {
        humidity: number;
        temp: number;
    };
}

export interface UserModel {
    uid: string;
    userName: string;
    avatarUrl: string;
    email: string;
    id: string;
}

