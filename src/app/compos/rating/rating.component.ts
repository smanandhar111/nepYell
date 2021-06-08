import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  @Input() restRating: number;
  @Input() src: string;
  @Input() decimal: boolean;
  maxRating = 5;
  stars = [];
  noStars = [];
  halfStar: boolean;
  matIcon: string;
  starText: string;
  constructor() { }

  ngOnInit() {
    this.figureRating();
  }
  figureRating(): void {
    // converts rating data from parent to UI info
    let starsLength: number;
    let noStarsLength: number;
    if (this.decimal) {
      const starString = this.restRating.toString();
      if (starString.includes('.')) {
        const {noOfStars, noOfNoStars} = this.figureHalfStar(this.restRating, starString);
        starsLength = noOfStars;
        noStarsLength = noOfNoStars;
      } else {
        starsLength = this.restRating;
        noStarsLength = this.maxRating - starsLength;
      }
    } else {
      starsLength = this.restRating;
      noStarsLength = this.maxRating - starsLength;
    }

    for (let s = 0; s < starsLength; s++) {
      this.stars.push('test');
    }
    for (let o = 0; o < noStarsLength; o++) {
      this.noStars.push('test');
    }
    if (this.src === 'rating') {
      this.matIcon = 'star';
      this.starText = this.figureStarText();
    } else {
      this.matIcon = 'attach_money';
      switch (this.restRating) {
        case 1:
          this.starText = 'Affordable';
          break;
        case 2:
          this.starText = 'Reasonable';
          break;
        case 3:
          this.starText = 'Expensive';
          break;
      }
    }
  }
  figureHalfStar(restRating: number, starString: string) {
    let noOfStars;
    let noOfNoStars;
    const splitRating = starString.split('.');
    const splitRatingNumb = parseInt(splitRating[0], 10);
    const res = restRating - splitRatingNumb;
    if (res > 0.24 && res < 0.76) {
      this.halfStar = true;
      noOfStars = splitRatingNumb;
      noOfNoStars = this.maxRating - noOfStars - 1;
    } else if (res <= 0.24) {
      this.halfStar = false;
      noOfStars = splitRatingNumb;
      noOfNoStars = this.maxRating - noOfStars;
    } else if (res >= 0.76) {
      noOfStars = Math.round(this.restRating);
      noOfNoStars = this.maxRating - noOfStars;
    }
    return {noOfStars, noOfNoStars};
  }

  figureStarText(): string {
    if (this.halfStar) {
      return `${this.stars.length}.5 Stars`;
    } else {
      return `${this.stars.length} Stars`;
    }
  }
}
