import { IDevice } from './IDevice';

export interface IAppState {
    devices: IDevice[];
    currentDate: Date;
}
