import { ISensor } from './../model/ISensor';
import { MAP_CENTER } from '../config';
import { IDevice } from '../model/IDevice';
import { Api } from './Api';
import * as uuid from 'uuid';

export class ApiMockRandom extends Api {
    async getDevices(): Promise<IDevice[]> {
        const devices: IDevice[] = [];

        for (let i = 0; i < 100; i++) {
            const radius = Math.random() * Math.PI * 2;
            const distance = Math.random();

            devices.push({
                id: uuid.v4(),
                title: `"Krabička" #${i}`,
                description: 'CRA IoT Hackathon!',
                location: {
                    latitude:
                        MAP_CENTER.lat + Math.sin(radius) * distance * 0.1,
                    longitude:
                        MAP_CENTER.lng + Math.cos(radius) * distance * 0.2,
                },
                sensors: randomSensors(
                    Math.random() * 1000 * (1 - distance),
                ),
            });
        }

        return devices;
    }
}


function randomSensors(ppm: number):ISensor[]{
    const sensors: ISensor[] = [];
    for (let i = 0,l = Math.ceil(Math.random()*10); i < l; i++) {
        sensors.push(
            {
                type: 'PPM',
                parameters: {},
                values: [
                    {
                        ppm: ppm-(Math.random()-.5)*200,
                        time: randomTime(),
                    },
                ],
            },
        );
    }
    return sensors;
}

export function randomPPM() {
    return Math.floor(Math.random() * 1000);
}

export function randomTime() {
    return (
        new Date().getTime() -
        Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 356 * 5)
    );
}
