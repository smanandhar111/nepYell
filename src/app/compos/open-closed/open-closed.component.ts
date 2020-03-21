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
    // creating new Object with sorted days in a week
    const sortedWeek = {
      monday: storeHours.monday,
      tuesday: storeHours.tuesday,
      wednesday: storeHours.wednesday,
      thursday: storeHours.thursday,
      friday: storeHours.friday,
      saturday: storeHours.saturday,
      sunday: storeHours.sunday,
    };
    const sortedKeys = Object.keys(sortedWeek);
    for (let i = 0; i < sortedKeys.length; i++) {
      if (this.day === i + 1) {
        const dayHours = storeHours[sortedKeys[i]];

        if (dayHours === 'closed') {  // Today is closed
          this.closedToday = true;
          this.isOpen = false;
          let dayAfter: number;
          // add a function that takes the storeHours and sortedKeys and figure out
          // opening and closing time
          if (storeHours[sortedKeys[i + 1]] !== 'closed') { // Meaning that its closed today and opens the tomorrow
            dayAfter = 1;
            const nextDayArr = storeHours[sortedKeys[i + dayAfter]].split('-');
            const openingTimeNumb = parseInt(nextDayArr[0], 10);
            const closingTimeNumb = parseInt(nextDayArr[1], 10);
            this.nextOpenDay = `Tomorrow ${this.findAmPm(openingTimeNumb)} - ${this.findAmPm(closingTimeNumb)}`;
          } else { // closed for more than 1 day
            dayAfter = 2;
            const dayNextOpen =  sortedKeys[i + 2];
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
