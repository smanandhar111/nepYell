export interface ReviewInputModel {
    rawDate: number;
    postedDate: string;
    userID: string;
    rating: number;
    review: string;
    restID: string;
    displayName: string;
    photoURL: string;
    restName: string;
}
// XXX : As the rawDate when entered has a 'Date' Type but after
// XXX : getting the date back it type changes to seconds and milliseconds
export interface ReviewOutputModel {
    rawDate: number;
    postedDate: string;
    userID: string;
    rating: number;
    review: string;
    restID: string;
    displayName: string;
    photoURL: string;
    id?: string;
}

export interface RawDateModel {
    seconds: number;
    milliseconds: string;
}

