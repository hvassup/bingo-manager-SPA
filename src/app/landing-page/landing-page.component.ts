import {Component, OnInit} from '@angular/core';
import {PlateService} from '../../services/plate.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(private readonly _plateService: PlateService) { }

  ngOnInit(): void {
  }

  public createGame() {
    this._plateService.createGame();
  }
}
