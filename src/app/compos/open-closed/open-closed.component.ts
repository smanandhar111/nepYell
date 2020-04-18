import {Component, Input, OnInit} from '@angular/core';
import {StoreHoursModel} from './storeHours.model';

@Component({
  selector: 'app-open-closed',
  templateUrl: './open-closed.component.html',
  styleUrls: ['./open-closed.component.scss']
})
export class OpenClosedComponent implements OnInit {
  @Input() storeHours: StoreHoursModel;
  isOpen: boolean;
  openingTime: string;
  closingTime: string;
  closedToday = false;
  nextOpenDay: string;
  isOpeningSoon: boolean;
  openSoonTimeLeft: number;
  isClosingSoon: boolean;
  closingSoonTimeLeft: number;
  date = new Date();
  day = this.date.getDay();
  hourOnLoad = this.date.getHours();
  minutesOnLoad = this.date.getMinutes();
  secondsOnLoad = this.date.getSeconds();
  secMinUnit = 60;
  openingTimeInt: number;
  closingTimeInt: number;
  reOpeningTime: string;
  constructor() { }

  ngOnInit() {
    this.fireCheckIfOpen();
    this.fireOpeningClosingSoon();
  }
  checkIfOpen(storeHours): void {
    let hoursArr = [];
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentDay = currentDate.getDay();
    // creating new Object with sorted days in a week
    const sortedWeek = {
      sunday: storeHours.sunday,
      monday: storeHours.monday,
      tuesday: storeHours.tuesday,
      wednesday: storeHours.wednesday,
      thursday: storeHours.thursday,
      friday: storeHours.friday,
      saturday: storeHours.saturday,
    };
    const sortedKeys = Object.keys(sortedWeek);
    for (let i = 0; i < sortedKeys.length; i++) {
      if (currentDay === i) {
        const dayHours = storeHours[sortedKeys[i]];

        if (dayHours === 'closed') {  // Today is closed
          this.closedToday = true;
          this.isOpen = false;
          let dayAfter: number;
          // add a function that takes the storeHours and sortedKeys and figure out
          // opening and closing time
          // when Saturday val is 6 then + 1 will be seven
          const inputOut = this.looping(i + 1);
          if (storeHours[sortedKeys[inputOut]] !== 'closed') { // Meaning that its closed today and opens the tomorrow
            dayAfter = 1;
            const inputInOne = this.looping(i + dayAfter);
            const nextDayArr = storeHours[sortedKeys[inputInOne]].split('-');
            const openingTimeNumb = parseInt(nextDayArr[0], 10);
            const closingTimeNumb = parseInt(nextDayArr[1], 10);
            this.nextOpenDay = `Tomorrow ${this.findAmPm(openingTimeNumb)} - ${this.findAmPm(closingTimeNumb)}`;
          } else { // closed for more than 1 day
            dayAfter = 2;
            const inputInTwo = this.looping(i + dayAfter);
            const dayNextOpen =  sortedKeys[inputInTwo];
            const dayString = `${dayNextOpen.charAt(0).toUpperCase()}${dayNextOpen.slice(1)}`;
            const nextDayArr = storeHours[sortedKeys[i + dayAfter]].split('-');
            this.nextOpenDay = `${dayString} ${this.findAmPm(parseInt(nextDayArr[0], 10))} - ${this.findAmPm(parseInt(nextDayArr[1], 10))}`;
          }
        } else { // If open today
          hoursArr = dayHours.split('-');
          this.openingTimeInt = parseInt(hoursArr[0], 10);
          this.closingTimeInt = parseInt(hoursArr[1], 10);
          this.openingTime = this.findAmPm(hoursArr[0]);
          this.closingTime = this.findAmPm(hoursArr[1]);

          if (currentHour < this.openingTimeInt) {
            this.isOpen = false;
            this.reOpeningTime = `Opens ${this.openingTime} - ${this.closingTime} later today`;
          } else if (currentHour >= this.openingTimeInt && currentHour < this.closingTimeInt) {
            this.isOpen = true;
          }
        }
      }
    }
  }
  // the loop ends at 6 this so it start back to 0
  looping(inputNumb: number): number {
    if (inputNumb > 6) {
      return 0;
    } else {
      return inputNumb;
    }
  }
  openingClosingSoon(): void {
    const currentDate = new Date();
    const currentMinutes = currentDate.getMinutes();
    const currentHour = currentDate.getHours();
    this.isOpeningSoon = this.openingTimeInt - currentHour === 1;
    if (this.isOpeningSoon) {
      this.openSoonTimeLeft = this.secMinUnit - currentMinutes;
    }
    this.isClosingSoon = this.closingTimeInt - currentHour === 1;
    if (this.isClosingSoon) {
      this.closingSoonTimeLeft = this.secMinUnit - currentMinutes;
    }
  }
  fireOpeningClosingSoon(): void {
    // This fn just handle the sequential firing of openingClosingSoon fn
    // setTimeout fires in the secDiff time
    // setInterval fires every minutes to display up to date closing and opening time
    this.openingClosingSoon();
    const secDiff = this.secMinUnit - this.secondsOnLoad;
    setTimeout(() => {
      if (new Date().getMinutes() > this.minutesOnLoad) {
        this.openingClosingSoon();
        setInterval(() => {
          this.openingClosingSoon();
        }, 1000 * this.secMinUnit);
      }
    }, 1000 * secDiff);
  }
  fireCheckIfOpen(): void {
    this.checkIfOpen(this.storeHours);
    const minDiff = this.secMinUnit - this.minutesOnLoad;
    setTimeout(() => {
      if (new Date().getHours() > this.hourOnLoad) {
        this.checkIfOpen(this.storeHours);
        setInterval(() => {
          this.checkIfOpen(this.storeHours);
          // fire to reset time on opening and closing soon
          this.openingClosingSoon();
        }, 1000 * this.secMinUnit);
      }
    }, 1000 * minDiff);
  }
  findAmPm(nextDayTime: number ): string {
    if (nextDayTime > 12) {
      return `${nextDayTime - 12}  PM`;
    } else {
      return `${nextDayTime} AM`;
    }
  }
}
