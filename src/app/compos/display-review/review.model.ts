export interface ReviewInputModel {
    rawDate: Date;
    postedDate: string;
    userID: string;
    rating: number;
    review: string;
    restID: string;
    displayName: string;
    photoURL: string;
}
// XXX : As the rawDate when entered has a 'Date' Type but after
// XXX : getting the date back it type changes to seconds and milliseconds
export interface ReviewOutputModel {
    rawDate: RawDateModel;
    postedDate: string;
    userID: string;
    rating: number;
    review: string;
    restID: string;
    displayName: string;
    photoURL: string;
}

export interface RawDateModel {
    seconds: number;
    milliseconds: string;
}

