import {get_user_id} from '../util/GUID.util';
import {MessageTypeEnum} from '../models/messageType.enum';

const SOCKET_HOSTNAME = 'wss://cleanwildwest.dk:8765';

export abstract class SocketService {
  private _webSocket: WebSocket;
  private _myId = get_user_id();
  private _hasInitted = false;

  protected constructor() {
    this._webSocket = new WebSocket(SOCKET_HOSTNAME);
    this._webSocket.onopen = () => {
      console.log('Websocket connected');
      this.init();
    };

    this._webSocket.onclose = (evt) => {
      console.log('Websocket closing', evt);
    };

    this._webSocket.onmessage = (msg) => {
      console.log('Received: ', msg);
      this._onReceived(JSON.parse(msg.data));
    };
  }

  public get connected(): boolean {
    return this._webSocket.readyState === 1;
  }

  private _gameId: string;

  public set gameId(value: string) {
    this._gameId = value;
    this.init();
  }

  public init() {
    if (this._gameId && this.connected && !this._hasInitted) {
      this.send({}, MessageTypeEnum.WELCOME);
      this._hasInitted = true;
    }
  }

  public send(payload: any, messageType: MessageTypeEnum) {
    payload.uuid = this._myId;
    payload.messageType = messageType;
    payload.gameId = this._gameId;
    this._webSocket.send(JSON.stringify(payload));
  }

  public close() {
    this._webSocket.close();
  }

  public registerOnReceived(fn) {
    this._onReceived = fn;
  }

  private _onReceived = (_: any) => void 0;
}
