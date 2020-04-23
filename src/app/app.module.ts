import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NumberComponent} from './number/number.component';
import {EventDialogComponent} from './event-dialog/event-dialog.component';
import {BigRedButtonComponent} from './big-red-button/big-red-button.component';
import {DisconnectedOverlayComponent} from './disconnected-overlay/disconnected-overlay.component';
import {RouterModule} from '@angular/router';
import {ALL_ROUTES} from '../constants/ALL_ROUTES';
import {BingoManagerComponent} from './bingo-manager/bingo-manager.component';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {FloaterComponent} from './floater/floater.component';

@NgModule({
  declarations: [
    AppComponent,
    NumberComponent,
    EventDialogComponent,
    BigRedButtonComponent,
    DisconnectedOverlayComponent,
    BingoManagerComponent,
    LandingPageComponent,
    FloaterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ALL_ROUTES, { useHash: true })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
