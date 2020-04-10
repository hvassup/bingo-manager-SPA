import {Component} from '@angular/core';
import {ALL_BINGO_EVENTS} from '../constants/ALL_BINGO_EVENTS';
import {BingoEvent} from '../models/bingoEvent';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  all_numbers: number[] = [];
  selected = Array(90).fill(false);
  random_num = 0;
  currentEventIdx = 0;
  currentEvent: BingoEvent;
  eventArray: BingoEvent[];
  showEventDialog = false;

  constructor() {
    this.all_numbers = Array(90).fill(0).map((x, i) => i + 1);
  }

  onClicked(num: number) {
    this.selected[num - 1] = !this.selected[num - 1];
    if (this.selected[num - 1]) {
      this._checkForEvent(num);
    }
  }

  random_number() {
    const available_numbers = this.selected.map((x, i) => {
      if (!x) {
        return i + 1;
      }
    }).filter(x => x !== undefined);
    const random_index = Math.floor(Math.random() * available_numbers.length);
    this.random_num = available_numbers[random_index];
    this.selected[this.random_num - 1] = true;
  }

  nextEvent() {
    this.currentEventIdx++;
    if (this.eventArray.length > this.currentEventIdx) {
      this.currentEvent = this.eventArray[this.currentEventIdx];
    } else {
      this.currentEventIdx = 0;
      this.currentEvent = null;
      this.eventArray = [];
    }
  }

  private _checkForEvent(num: number) {
    this.eventArray = ALL_BINGO_EVENTS.filter(evt => evt.numberTrigger === num);
    this.currentEvent = this.eventArray[0];
    this.currentEventIdx = 0;
  }
}
