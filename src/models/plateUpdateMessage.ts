import {Message} from './message';

export interface PlateUpdateMessage extends Message {
  number: number;
  state: boolean;
}
