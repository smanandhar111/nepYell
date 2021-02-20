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
  constructor() { }

  ngOnInit() {
    console.log('image', this.images);
    console.log('wef', this.noOfImages);
  }

  navImg(direction: string): void {
    if (direction === 'next') {
      this.slideLeft = false;
      this.slideRight = true;
    } else {
      this.slideRight = false;
      this.slideLeft = true;
    }
  }

}
