import { ILocation } from './ILocation';
import { ISensorType, ISensor } from './ISensor';

export interface IDevice {
    id: string;
    title: string;
    description?: string;
    location: ILocation;
    sensors: ISensor[];
}

export function devicesGetTimeRange(...devices: IDevice[]):{first:number,last:number}{
    let first:number|null=null,last:number|null=null;
    for(const device of devices){
        for(const senzor of device.sensors){
            for(const value of senzor.values){
                if(!first || value.time<first)first = value.time;
                if(!last || value.time>last)last = value.time;
            }
        }
    }

    if(first&&last){
        return {first,last}
    }else{
        throw new Error(`Thare is no time value to detect time range.`);
    }
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