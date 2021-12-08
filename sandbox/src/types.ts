export enum PinIOStateType {
  IN = 'in',
  OUT = 'out',
}

export interface PinState {
  name: string,
  direction?: PinIOStateType | null,
  type: PinType
}

export interface PinData {
  id: number,
  value: number | null,
  date: number,
  direction?: PinIOStateType | null,
}

export type PinTimeSeriesData = PinData[]

export interface CommandMessage {
  action: 'read' | 'write' | 'set',
  id: number,
  value?: 1 | 0,
  direction?: PinIOStateType | null,
}

export type SendHandler = (args: CommandMessage) => void;

export enum PinType {
  IO = 'io',
  POWER = 'power',
  GROUND = 'ground'
}

export interface OpenViews {
  pins: boolean,
  data: boolean,
}
