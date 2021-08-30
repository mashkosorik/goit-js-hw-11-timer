import { refs } from './js/refs';

class Timer {
  constructor(startTime, stopTime) {
    this.startTime = startTime;
    this.stopTime = stopTime;
    this.deltaTime = 0;
    this.interval = '';
  }

  pad(value) {
    return String(value).padStart(2, 0);
  }

  getDays(time) {
    return this.pad(Math.floor(time / 1000 / 60 / 60 / 24));
  }
  getHours(time) {
    return this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  }
  getMins(time) {
    return this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
  }

  getSecs(time) {
    return this.pad(Math.floor((time % (1000 * 60)) / 1000));
  }

  updateClockFace(time) {
    if (time) {
      refs.days.textContent = this.getDays(time);
      refs.hours.textContent = this.getHours(time);
      refs.minutes.textContent = this.getMins(time);
      refs.seconds.textContent = this.getSecs(time);
    } else {
      refs.days.textContent = '00';
      refs.hours.textContent = '00';
      refs.minutes.textContent = '00';
      refs.seconds.textContent = '00';
    }
  }

  updateDate() {
    let currentTime = Date.now();
    this.deltaTime = Date.parse(this.stopTime) - currentTime;
    this.updateClockFace(this.deltaTime);
  }

  start() {
    this.interval = setInterval(() => {
      this.updateDate();
    }, 1000);
  }
  stop() {
    clearInterval(this.interval);
    this.updateClockFace();
  }
}
const timer = new Timer(Date.now(), '31 dec 2021 23:59:59');
timer.updateDate();
timer.start();
