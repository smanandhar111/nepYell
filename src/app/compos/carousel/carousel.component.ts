import {Component, HostListener, Input, OnInit} from '@angular/core';
import {OutletImagesModel} from './outletImages.model';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  @Input() images;
  caroImgSize = 315 + 15; // Reevaluate
  noOfImages = Math.floor(window.innerWidth / this.caroImgSize);
  displayImg = [];
  carouselSpin = 1;
  dispImgX: number;
  dispImgY: number;
  hidePrev: boolean;
  hideNext: boolean;
  constructor() { }

  ngOnInit() {
    const loopStart = 0; const loopEnd = this.noOfImages;
    this.loopIt(loopStart, loopEnd);
  }
  loopIt(loopStart: number, loopEnd: number): void {
    const displayImgArr = [];
    const imageLength = this.images.length;

    for (let i = loopStart; i < loopEnd; i++) {
      displayImgArr.push(i);
      this.displayImg.push(this.images[i]);
    }
    this.dispImgX = displayImgArr[0];
    this.dispImgY = displayImgArr[displayImgArr.length - 1];

    this.hidePrev = this.dispImgX === 0;
    this.hideNext = this.dispImgY >= imageLength - 1;
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.noOfImages = Math.floor(window.innerWidth / this.caroImgSize);
    this.displayImg = [];
    if (this.carouselSpin < 2) { // Initial load & resize
      const loopStart = 0; const loopEnd = this.noOfImages;
      this.loopIt(loopStart, loopEnd);
    } else {
      const loopStart = this.dispImgY + 1;
      const loopEnd = loopStart + this.noOfImages;
      this.loopIt(loopStart, loopEnd);
    }
  }

  navImg(direction: string): void {
    this.displayImg = [];
    if (direction === 'right') {
      const loopStart = this.dispImgY + 1;
      const loopEnd = loopStart + this.noOfImages;
      this.loopIt(loopStart, loopEnd);
      this.carouselSpin = this.carouselSpin + 1;
    } else {
        const loopStart = this.dispImgX - this.noOfImages;
        const loopEnd = loopStart + this.noOfImages;
        this.loopIt(loopStart, loopEnd);
    }
  }
}
