import {Injectable} from '@angular/core';
import {SocketService} from './socketService';
import {MessageTypeEnum} from '../models/messageType.enum';
import {Router} from '@angular/router';
import {ConfettiService} from './confetti.service';
import {get_user_id} from '../util/GUID.util';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlateService extends SocketService {
  public all_numbers: number[] = [];
  public selected = Array(90).fill(false);
  public isOwner: boolean;

  constructor(private readonly _router: Router,
              private readonly _confettiService: ConfettiService) {
    super();
    this.all_numbers = Array(90).fill(0).map((x, i) => i + 1);

    this.onMessage$.pipe(
      tap((msg) => this._onMessageReceived(msg))
    ).subscribe();
  }

  private _gameId: string;

  public set gameId(value: string) {
    this._gameId = value;
    this.send({gameId: this._gameId}, MessageTypeEnum.JOIN_GAME);
  }

  public confettiTime() {
    this.send({}, MessageTypeEnum.SHOW_CONFETTI);
  }

  public updatePlate(number: number) {
    const state = !this.selected[number - 1];
    this.send({number, state}, MessageTypeEnum.PLATE_UPDATE);
  }

  public updateNumberState(num: number, state: boolean) {
    this.selected[num - 1] = state;
  }

  public isSelected(num: number) {
    return this.selected[num - 1];
  }

  public createGame() {
    this.send({uuid: get_user_id()}, MessageTypeEnum.CREATE_GAME);
  }

  public clear() {
    this.selected.map(() => false);
  }

  private _onMessageReceived(msg: any) {
    if (typeof this[MessageTypeEnum[msg.messageType]] === 'function') {
      this[MessageTypeEnum[msg.messageType]](msg);
    }
  }

  private PLATE_UPDATE(msg: any): void {
    if (msg.number !== undefined && msg.state !== undefined) {
      this.updateNumberState(msg.number, msg.state);
    }
  }

  private CREATE_GAME(msg: any): void {
    if (msg.gameId) {
      this._router.navigate(['spil', msg.gameId]);
    }
  }


  private JOIN_GAME(msg: any): void {
    this.isOwner = msg.isOwner;
    if (msg.board) {
      msg.board.forEach(n => this.updateNumberState(n, true));
    }
  }

  private WELCOME(msg: any): void {
    if (msg.board) {
      msg.board.forEach(n => this.updateNumberState(n, true));
    }
  }

  private SHOW_CONFETTI(msg: any): void {
    this._confettiService.showConfetti();
  }
}
