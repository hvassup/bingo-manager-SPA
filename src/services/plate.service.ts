import {Injectable} from '@angular/core';
import {SocketService} from './socketService';
import {MessageTypeEnum} from '../models/messageType.enum';
import {Router} from '@angular/router';
import {get_user_id} from '../util/GUID.util';

@Injectable({
  providedIn: 'root'
})
export class PlateService extends SocketService {
  public all_numbers: number[] = [];
  public selected = Array(90).fill(false);
  public isOwner: boolean;
  private _ownerId: string;

  constructor(private readonly _router: Router) {
    super();
    this.all_numbers = Array(90).fill(0).map((x, i) => i + 1);
    this.registerOnReceived((msg) => {
      console.log('Plate', msg);
      switch (msg.messageType) {
        case MessageTypeEnum.WELCOME:
          if (msg.board) {
            msg.board.forEach(n => this.updateNumberState(n, true));
            this._updateOwner(msg.ownerId);
          }
          break;
        case MessageTypeEnum.PLATE_UPDATE:
          if (msg.number !== undefined && msg.state !== undefined) {
            this.updateNumberState(msg.number, msg.state);
          }
          break;
        case MessageTypeEnum.CREATE_GAME:
          if (msg.gameId && msg.ownerId) {
            this._updateOwner(msg.ownerId);
            this._router.navigate(['spil', msg.gameId]);
          }
          break;
      }
    });
  }

  public updatePlate(number: number) {
    if (this.isOwner) {
      this.updateNumberState(number, !this.selected[number - 1]);
      const state = this.selected[number - 1];
      this.send({number, state}, MessageTypeEnum.PLATE_UPDATE);
    }
  }

  public updateNumberState(num: number, state: boolean) {
    this.selected[num - 1] = state;
  }

  public isSelected(num: number) {
    return this.selected[num - 1];
  }

  public createGame() {
    this.send({}, MessageTypeEnum.CREATE_GAME);
  }

  public clear() {
    this.selected.map(() => false);
  }

  private _updateOwner(ownerId) {
    this._ownerId = ownerId;
    this.isOwner = get_user_id() === this._ownerId;
  }
}
