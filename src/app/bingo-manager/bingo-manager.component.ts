import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PlateService} from '../../services/plate.service';
import {EventService} from '../../services/event.service';
import {ActivatedRoute} from '@angular/router';
import {CoronaFloater} from '../../models/coronaFloater';

@Component({
  selector: 'app-bingo-manager',
  templateUrl: './bingo-manager.component.html',
  styleUrls: ['./bingo-manager.component.scss']
})
export class BingoManagerComponent implements OnInit, AfterViewInit {
  public floaters: CoronaFloater[] = Array(50).fill(null);
  @ViewChild('coronaCanvas') coronaCanvas: ElementRef;
  constructor(public readonly plateService: PlateService,
              public readonly eventService: EventService,
              private readonly _activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.plateService.clear();
    this._activatedRoute.params.subscribe(res => this.plateService.gameId = res.gameId);
    this.floaters = this.floaters.map(() => new CoronaFloater());
  }

  onClicked(num: number) {
    if (this.plateService.isOwner) {
      this.plateService.updatePlate(num);
    }
  }

  public confetti() {
    this.plateService.confettiTime();
  }

  ngAfterViewInit(): void {
    const canvas: HTMLCanvasElement = this.coronaCanvas.nativeElement;

    window.onresize = () => {
      canvas.width = document.body.clientWidth;
      canvas.height = document.body.clientHeight;
    };
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    const ctx = canvas.getContext('2d');
    ctx.fillRect(0, 0, 100, 100);
    const image = new Image();
    image.src = 'assets/Covid.png';
    image.onload = () => {
      setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.floaters.forEach(floater => {
          ctx.drawImage(image, floater.x, floater.y, floater.width, floater.height);
          floater.updatePosition();
        });
      }, 16);
    };

  }
}
