import {Component, Input} from '@angular/core';
import {BingoEvent} from '../../models/bingoEvent';
import {EventService} from '../../services/event.service';

@Component({
  selector: 'app-event-dialog',
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.scss']
})
export class EventDialogComponent {
  @Input() public event: BingoEvent;

  constructor(public readonly eventService: EventService) {
  }

  public close() {
    this.eventService.nextEvent();
  }
}
