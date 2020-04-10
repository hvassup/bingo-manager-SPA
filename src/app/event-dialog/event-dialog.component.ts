import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BingoEvent} from '../../models/bingoEvent';

@Component({
  selector: 'app-event-dialog',
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.scss']
})
export class EventDialogComponent implements OnInit {
  @Output() public closing = new EventEmitter();
  @Input() public event: BingoEvent;

  constructor() {
  }

  public close() {
    this.closing.emit();
  }

  ngOnInit(): void {
  }

}
