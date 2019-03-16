import { MAP_CENTER } from './../config';
import { IDevice } from '../model/IDevice';
import { Api } from './Api';
import * as uuid from 'uuid';

export class ApiMock extends Api {
    async getDevices(): Promise<IDevice[]> {
        const devices: IDevice[] = [];

        for (let i = 0; i < 50; i++) {
            devices.push({
                id: uuid.v4(),
                title: 'Ostravska raketa!',
                description: 'bla egfb ergf wrsgf wrsgf wrsgf',
                location: {
                    latitude: MAP_CENTER.lat + (Math.random()-.5)*0.1,
                    longitude: MAP_CENTER.lng + (Math.random()-.5)*0.2,
                },
                sensors: [
                    {
                        type: 'PPM',
                        parameters: {},
                        values: [
                            {
                                ppm: randomPPM(),
                                time: randomTime(),
                            },
                        ],
                    },
                ],
            });
        }

        return devices;
    }
}

export function randomPPM(){
    return Math.floor(Math.random()*1000)
}

export function randomTime(){
    return new Date().getTime()-Math.floor(Math.random()*1000*60*60*24*356*5)
}