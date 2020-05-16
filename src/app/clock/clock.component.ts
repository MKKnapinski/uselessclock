import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';
import {ImportantEvent} from '../common/important-event';
import {getSunrise, getSunset} from 'sunrise-sunset-js';

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
    this.getUselessTime(this.randomIntFromInterval(0, 8));
  }


  private getUselessTime(variant: number) {
    switch (variant) {
      case 0:
        this.getUnixUselessTime();
        break;
      case 1:
        this.getRandomFutureInfo();
        break;
      case 2:
        this.getRandomPastInfo();
        break;
      case 3:
        this.getTimeToEvent();
        break;
      case 4:
        this.getTimeToEvent();
        break;
      case 5:
        this.getTimeToEvent();
        break;
      case 6:
        this.getDay();
        break;
      case 7:
        this.getDay();
        break;
      case 8:
        this.getDay();
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
    this.uselessTime = _.join([intoTheFuture, 'minutes until', futureTime], ' ');
  }

  private getRandomPastInfo() {
    const intoThePast = this.randomIntFromInterval(2, 59);
    const pastTime = moment(new Date(), 'hh:mm:ss A')
      .subtract(intoThePast, 'minutes')
      .format('hh:mm:ss A');
    this.uselessTime = _.join([intoThePast, 'minutes ago was', pastTime], ' ');
  }

  getTimeToEvent(specificEvent?: ImportantEvent) {
    const events = [
      new ImportantEvent('Christmas Eve', new Date().getFullYear() + '-12-24 00:00:00'),
      new ImportantEvent('Polish independence day', new Date().getFullYear() + '-11-11 00:00:00'),
      new ImportantEvent('First Tomb Raider game release', '1996-10-25 00:00:00'),
      new ImportantEvent('First Tomb Raider game release', '1996-10-25 00:00:00'),
      new ImportantEvent('International dish soap day', new Date().getFullYear() + '-05-20 00:00:00'),
      new ImportantEvent('International dish soap day', new Date().getFullYear() + '-06-23 00:00:00'),
      new ImportantEvent('Sunrise', moment(getSunrise(53.42, 14.55))),
      new ImportantEvent('Sunset', moment(getSunset(53.42, 14.55))),
    ];

    let event = events[this.randomIntFromInterval(0, events.length - 1)];

    if (specificEvent) {
      event = specificEvent;
    }

    const eventDate = moment(event.time, 'YYYY-MM-DD HH:mm:ss');
    const currentDate = moment(new Date(), 'YYYY-MM-DD HH:mm:ss');

    const ms = moment(event.time, 'YYYY-MM-DD HH:mm:ss').diff(moment(new Date(), 'YYYY-MM-DD HH:mm:ss'));
    const duration = moment.duration(ms);
    const message = [Math.abs(Math.floor(duration.asHours())), 'hours'];

    if (currentDate < eventDate) {
      message.push(moment.utc(ms).format('mm'), 'minutes');
      message.push(moment.utc(ms).format('ss'), 'seconds');
      message.push('until');
    } else {
      message.push(60 - +moment.utc(ms).format('mm'), 'minutes');
      message.push(60 - +moment.utc(ms).format('ss'), 'seconds');
      message.push('from');
    }

    message.push(event.name + '!');

    this.uselessTime = _.join(message, ' ');
  }

  getDay() {
    const currentDate = moment(new Date());
    const day = currentDate.format('dddd');
    this.uselessTime = _.join([day, 'my dudes', currentDate.format('hh:mm:ss A'), 'AAAAAAAAAAAAAAAAA'], ' ');
  }
}
