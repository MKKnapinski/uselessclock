import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';
import {ImportantEvent} from '../common/important-event';

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
        this.getTimeFromEvent();
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

  getTimeFromEvent() {
    const events = [
      new ImportantEvent('Christmas Eve', new Date().getFullYear() + '-12-24 00:00:00'),
      new ImportantEvent('Polish independence day', new Date().getFullYear() + '-11-11 00:00:00'),
      new ImportantEvent('First Tomb Raider game release', '1996-10-25 00:00:00'),
    ];

    const event = events[this.randomIntFromInterval(0, events.length - 1)];

    const eventDate = moment(event.time, 'YYYY-MM-DD HH:mm:ss');
    const currentDate = moment(new Date(), 'YYYY-MM-DD HH:mm:ss');

    const ms = moment(event.time, 'YYYY-MM-DD HH:mm:ss').diff(moment(new Date(), 'YYYY-MM-DD HH:mm:ss'));
    const duration = moment.duration(ms);
    const message = [Math.abs(Math.floor(duration.asHours())), 'hours and'];

    if (currentDate < eventDate) {
      message.push(moment.utc(ms).format('mm'), 'minutes');
      message.push('until');
    } else {
      message.push(60 - +moment.utc(ms).format('mm'), 'minutes');
      message.push('from');
    }

    message.push(event.name + '!');

    this.uselessTime = _.join(message, ' ');
  }
}
