import {ALL_BINGO_EVENTS} from '../constants/ALL_BINGO_EVENTS';
import {BingoEvent} from '../models/bingoEvent';
import {Injectable} from '@angular/core';
import {PlateService} from './plate.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  currentEventIdx = 0;
  currentEvent: BingoEvent;
  eventArray: BingoEvent[] = [];
  constructor(private readonly _plateService: PlateService) {
  }

  public checkForEvent(num: number) {
    this.eventArray = this.eventArray.concat(ALL_BINGO_EVENTS.filter(evt => evt.numberTrigger === num));
    this.currentEvent = this.eventArray[0];
    this.currentEventIdx = 0;
  }

  public nextEvent() {
    this.currentEvent = null;
    setTimeout(() => {
      this.currentEventIdx++;
      if (this.eventArray.length > this.currentEventIdx) {
        this.currentEvent = this.eventArray[this.currentEventIdx];
      } else {
        this.currentEventIdx = 0;
        this.currentEvent = null;
        this.eventArray = [];
      }
    }, 500);
  }
}
