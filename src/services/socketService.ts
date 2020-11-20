import {get_user_id} from '../util/GUID.util';
import {MessageTypeEnum} from '../models/messageType.enum';
import {environment} from '../environments/environment';
import {Subject} from 'rxjs';

const gameType = 'bingo';

export abstract class SocketService {
  public onMessage$ = new Subject();
  private _webSocket: WebSocket;
  private _myId = get_user_id();
  private _messageQueue = [];

  protected constructor() {
    this._webSocket = new WebSocket(environment.SOCKET_HOSTNAME);
    this.send({uuid: this._myId, gameType}, MessageTypeEnum.WELCOME);
    this._webSocket.onopen = () => {
      console.log('Websocket connected');
      this._sendQueuedMessages();
    };

    this._webSocket.onclose = (evt) => {
      console.log('Websocket closing', evt);
    };

    this._webSocket.onmessage = (msg) => {
      console.log('Received: ', msg);
      this.onMessage$.next(JSON.parse(msg.data));
    };
  }

  public get connected(): boolean {
    return this._webSocket.readyState === 1;
  }

  public send(payload: any, messageType: MessageTypeEnum) {
    payload.messageType = messageType;
    console.log('Sending', payload, this.connected);
    this._addToMessageQueue(payload);
  }

  public close() {
    this._webSocket.close();
  }

  private _addToMessageQueue(payload: any) {
    this._messageQueue.push(payload);
    if (this.connected) {
      this._sendQueuedMessages();
    }
  }

  private _sendQueuedMessages() {
    while (this._messageQueue.length > 0) {
      this._webSocket.send(JSON.stringify(this._messageQueue.shift()));
    }
  }
}
