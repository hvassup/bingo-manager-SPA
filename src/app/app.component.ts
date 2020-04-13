import {Component, OnDestroy} from '@angular/core';
import {PlateService} from '../services/plate.service';
import {EventService} from '../services/event.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'app';

  constructor(public readonly plateService: PlateService,
              public readonly eventService: EventService) {
  }

  // random_number() {
  //   const available_numbers = this.selected.map((x, i) => {
  //     if (!x) {
  //       return i + 1;
  //     }
  //   }).filter(x => x !== undefined);
  //   const random_index = Math.floor(Math.random() * available_numbers.length);
  //   this.random_num = available_numbers[random_index];
  //   this.selected[this.random_num - 1] = true;
  // }

  public ngOnDestroy(): void {
    this.plateService.close();
  }
}
