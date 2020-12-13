import {ALL_BINGO_EVENTS} from '../constants/ALL_BINGO_EVENTS';
import {BingoEvent} from '../models/bingoEvent';
import {Injectable} from '@angular/core';
import {PlateService} from './plate.service';
import {ALL_QUIZ_QUESTIONS} from '../constants/ALL_QUIZ_QUESTIONS';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  currentEventIdx = 0;
  currentEvent: BingoEvent;
  eventArray: BingoEvent[] = [];
  currentQuiz: BingoEvent;
  quizStartIdx = 20;
  constructor(private readonly plateService: PlateService) {
    plateService.onStateChange$.subscribe(evt => this.checkForEvent(evt));
    plateService.onQuizTime$.subscribe(idx => this.quizTime(idx));
  }

  public checkForEvent([num, state]: [number, boolean]) {
    if (state) {
      this.eventArray = this.eventArray.concat(ALL_BINGO_EVENTS.filter(evt => evt.numberTrigger === num));
      this.currentEvent = this.eventArray[0];
      this.currentEventIdx = 0;
    }
  }

  public quizTime(idx) {
    this.currentQuiz = ALL_QUIZ_QUESTIONS[idx + this.quizStartIdx];
  }
  public stopQuiz() {
    this.currentQuiz = null;
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
