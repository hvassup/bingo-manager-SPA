import {Component, OnInit} from '@angular/core';
import {PlateService} from '../../services/plate.service';
import {EventService} from '../../services/event.service';
import {ActivatedRoute} from '@angular/router';
import canvas_confetti from 'canvas-confetti';

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
    this.plateService.updatePlate(num);
    if (this.plateService.isSelected(num)) {
      this.eventService.checkForEvent(num);
    }
  }

  public bingo() {
    const duration = 10 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = {startVelocity: 30, spread: 360, ticks: 60, zIndex: 0};

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      canvas_confetti(Object.assign({}, defaults, {particleCount, origin: {x: randomInRange(0.1, 0.3), y: Math.random() - 0.2}}));
      canvas_confetti(Object.assign({}, defaults, {particleCount, origin: {x: randomInRange(0.7, 0.9), y: Math.random() - 0.2}}));
    }, 250);
  }

}
