import { ILocation } from './ILocation';
import { ISensorType, ISensor } from './ISensor';

export interface IDevice {
    id: string;
    title: string;
    description?: string;
    location: ILocation;
    sensors: ISensor[];
}

export function devicesGetTimeRange(
    ...devices: IDevice[]
): { first: number; last: number } {
    let first: number | null = null,
        last: number | null = null;
    for (const device of devices) {
        for (const senzor of device.sensors) {
            for (const value of senzor.values) {
                if (!first || value.time < first) first = value.time;
                if (!last || value.time > last) last = value.time;
            }
        }
    }

    if (first && last) {
        return { first, last };
    } else {
        throw new Error(`Thare is no time value to detect time range.`);
    }
}

export function deviceGetSenzorValue(
    device: IDevice,
    currentDate: number,//todo data/time mismatch
    senzorType: ISensorType,
): number {
    for (const senzor of device.sensors) {
        if (senzor.type === senzorType) {
            for (const value of senzor.values) {
                if(value.time<=currentDate){
                    return value.ppm; //todo not working with other sensor types
                }
            }
        }
    }
    console.log('device',device);
    console.log('currentDate',currentDate);
    console.log('senzorType',senzorType);
    throw new Error(
        `Thare is no relevant senzor"${senzorType}" value from device ${
            device.id
        }.`,
    );
}
