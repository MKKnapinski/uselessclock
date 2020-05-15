import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {
  uselessTime: string;
  randomIntFromInterval = (min, max): number => Math.floor(Math.random() * (max - min + 1) + min);

  constructor() {
  }

  ngOnInit(): void {
    this.getUselessTime(this.randomIntFromInterval(4, 4));
  }


  private getUselessTime(variant: number) {
    switch (variant) {
      case 1:
        this.getUnixUselessTime();
        break;
      case 2:
        this.getRandomFutureInfo();
        break;
      case 3:
        this.getRandomPastInfo();
        break;
      case 4:
        this.getUntilEndOfYear();
        break;
    }
  }

  private getUnixUselessTime() {
    setInterval(() => {
      this.uselessTime = Math.floor(new Date().getTime() / 1000) + ' seconds after 01.01.1970';
    }, 1000);
  }

  private getRandomFutureInfo() {
    const intoTheFuture = this.randomIntFromInterval(2, 59);
    const futureTime = moment(new Date(), 'hh:mm:ss A')
      .add(intoTheFuture, 'minutes')
      .format('hh:mm:ss A');
    this.uselessTime = _.join([intoTheFuture, 'minutes untill', futureTime], ' ');
  }

  private getRandomPastInfo() {
    const intoThePast = this.randomIntFromInterval(2, 59);
    const pastTime = moment(new Date(), 'hh:mm:ss A')
      .subtract(intoThePast, 'minutes')
      .format('hh:mm:ss A');
    this.uselessTime = _.join([intoThePast, 'minutes ago was', pastTime], ' ');
  }

  private getUntilEndOfYear() {
    const christmas = new Date().getFullYear() + '-12-24 00:00:00';

    const ms = moment(christmas, 'YYYY-MM-DD HH:mm:ss').diff(moment(new Date(), 'YYYY-MM-DD HH:mm:ss'));
    const duration = moment.duration(ms);
    this.uselessTime = _.join([
      Math.floor(duration.asHours()), 'hours and',
      moment.utc(ms).format('mm'), 'minutes',
      'until christmas eve!'
    ], ' ');

  }

}
