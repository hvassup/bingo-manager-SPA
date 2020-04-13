import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {PlateService} from '../../services/plate.service';

@Component({
  selector: 'app-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.scss']
})
export class NumberComponent implements OnInit {
  @Input() selected = false;
  @Input() num: number;

  @ViewChild('numberContainer') public numberContainer;

  constructor(public readonly plateService: PlateService) {
  }

  // @HostListener('window:resize')
  // public onResize() {
  //   // console.log(this.numberContainer.nativeElement.offsetHeight);
  // }

  ngOnInit() {
  }

}
