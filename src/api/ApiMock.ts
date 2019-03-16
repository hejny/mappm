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
                    latitude: 49.5 + Math.random(),
                    longitude: 14 + Math.random(),
                },
                sensors: [
                    {
                        type: 'PPM',
                        parameters: {},
                        values: [
                            {
                                ppm: randomPPM(),
                                time: new Date().getTime(),
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