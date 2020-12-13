import {Component, Input, Output, EventEmitter} from '@angular/core';
import {BingoEvent} from '../../models/bingoEvent';

@Component({
  selector: 'app-event-dialog',
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.scss']
})
export class EventDialogComponent {
  @Input() public event: BingoEvent;
  @Output() public onClose = new EventEmitter<void>();

  constructor() {
  }

  public close() {
    this.onClose.emit();
  }
}
