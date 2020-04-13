import {Routes} from '@angular/router';
import {BingoManagerComponent} from '../app/bingo-manager/bingo-manager.component';
import {LandingPageComponent} from '../app/landing-page/landing-page.component';

export const ALL_ROUTES: Routes = [
  {
    path: 'spil/:gameId',
    component: BingoManagerComponent,
  },
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
