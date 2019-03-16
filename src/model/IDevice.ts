import { ILocation } from './ILocation';
import { ISensorType, ISensor } from './ISensor';

export interface IDevice {
    id: string;
    title: string;
    description?: string;
    location: ILocation;
    sensors: ISensor[];
}

export function deviceGetSenzorValue(device: IDevice,senzorType:ISensorType):number{
    for(const senzor of device.sensors){
        if(senzor.type===senzorType){
            for(const value of senzor.values){
                return value.ppm;//todo not working with other
            }
        }
    }
    throw new Error(`Thare is no relevant senzor"${senzorType}" value from device ${device.id}.`);
}