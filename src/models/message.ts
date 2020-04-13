import {MessageTypeEnum} from './messageType.enum';

export interface Message {
  messageType: MessageTypeEnum;
  uuid: string;
}
