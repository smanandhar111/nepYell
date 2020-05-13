import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  @Input() restRating: number;
  @Input() src: string;
  stars = [];
  noStars = [];
  matIcon: string;
  starText: string;
  constructor() { }

  ngOnInit() {
    this.figureRating();
  }
  figureRating(): void {
    // converts rating data from parent to UI info
    const maxRating = 5;
    const starsLength = Math.round(this.restRating);
    const noStarsLength = maxRating - starsLength;
    for (let s = 0; s < starsLength; s++) {
      this.stars.push('test');
    }
    for (let o = 0; o < noStarsLength; o++) {
      this.noStars.push('test');
    }
    if (this.src === 'rating') {
      this.matIcon = 'star_border';
      this.starText = `${this.stars.length} Star`;
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
}
