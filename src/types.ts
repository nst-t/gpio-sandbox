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
  id: string,
  value: number | null,
  date: Date,
}

export interface GPIOState {
  [id: string]: PinState;
}

export type PinTimeSeriesData = PinData[]

export type GPIOTimeSeriesData = {
  [id: string]: PinTimeSeriesData;
}
