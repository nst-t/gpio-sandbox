export enum PinIOStateType {
  IN = 'in',
  OUT = 'out',
}

export interface PinState {
  id: string,
  updatedAt: Date,
  io: PinIOStateType,
}

export interface PinData {
  id: number,
  value: number | null,
  date: Date,
}

export interface GPIOState {
  [id: string]: PinState;
}

export type PinTimeSeriesData = PinData[]

export type GPIOTimeSeriesData = PinTimeSeriesData[];


export interface SendMessageHandlerSignature {
  action: 'read' | 'write' | 'set',
  id: number,
  value?: 1 | 0,
  direction?: 'in' | 'out' | null,
}

export type SendHandler = (args: SendMessageHandlerSignature) => void;
