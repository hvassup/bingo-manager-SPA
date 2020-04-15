import {Component, OnInit} from '@angular/core';
import {PlateService} from '../../services/plate.service';
import {EventService} from '../../services/event.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-bingo-manager',
  templateUrl: './bingo-manager.component.html',
  styleUrls: ['./bingo-manager.component.scss']
})
export class BingoManagerComponent implements OnInit {

  constructor(public readonly plateService: PlateService,
              public readonly eventService: EventService,
              private readonly _activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.plateService.clear();
    this._activatedRoute.params.subscribe(res => this.plateService.gameId = res.gameId);
  }

  onClicked(num: number) {
    if (this.plateService.isOwner) {
      this.plateService.updatePlate(num);
      if (this.plateService.isSelected(num)) {
        this.eventService.checkForEvent(num);
      }
    }
  }

  public confetti() {
    this.plateService.confettiTime();
  }
}
