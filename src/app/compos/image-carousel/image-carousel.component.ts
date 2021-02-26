import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss']
})
export class ImageCarouselComponent implements OnInit {
  @Input() images;
  imageSize = 325 + 15; // width : 325px | padding: 15px
  noOfImages = Math.floor(window.innerWidth / this.imageSize);
  slideRight = false;
  slideLeft = false;
  private prevDisplayImg: any;
  private displayImg = [];
  private loopEnd: number;
  private nextClicked = false;
  imgTimeCount = 0;
  nextDisplayImg = [];

  beforeImg = [];
  currentImg = [];
  nextImg = [];
  constructor() { }

  ngOnInit() {
    const loopStart = 0; const loopEnd = this.noOfImages;
    // creating currentImg
    this.loopIt(loopStart, loopEnd, this.displayImg);
    this.currentImg = this.displayImg;
    this.prevDisplayImg = this.displayImg;
    console.log('@@@', this.images.length);
  }

  loopIt(loopStart: number, loopEnd: number, array): void {
    // array = [];
    const imageLength = this.images.length;
    loopEnd = (loopEnd > imageLength) ? imageLength : loopEnd;
    for (let i = loopStart; i < loopEnd; i++) {
      array.push(this.images[i]);
    }
    this.loopEnd = loopEnd;
    console.log('DI', this.displayImg);
    console.log('DI', this.nextDisplayImg);
  }

  navImg(direction: string): void {
    if (direction === 'next') {
      const row = document.createElement('div');
      row.className = 'stand-by';
      row.setAttribute('ngClass', `{'slide-right': this.slideRight}`);
      document.querySelector('.image-carousel').append(row);
      const rowChild = document.createElement('img');
      document.querySelector('.stand-by').append(rowChild);
      this.nextClicked = true;
      this.imgTimeCount++;
      this.loopIt(this.loopEnd, (this.loopEnd + (this.noOfImages * this.imgTimeCount)), this.nextDisplayImg);
      this.nextImg = this.nextDisplayImg;
      this.slideLeft = false;
      this.slideRight = true;
    } else {
      this.slideRight = false;
      this.slideLeft = true;
    }
  }

}
