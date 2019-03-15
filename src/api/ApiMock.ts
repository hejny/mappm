import { IDevice } from './IDevice';
import { Api } from './Api';

export class ApiMock extends Api {
    async getDevices(): Promise<IDevice[]> {
        const devices: IDevice[] = [];

        for (let i = 0; i < 100; i++) {
            devices.push({
                id: 'uuid-uuid-uuid',
                title: 'Ostravska raketa!',
                description: 'bla egfb ergf wrsgf wrsgf wrsgf',
                location: {
                    latitude: 50 + Math.random(),
                    longitude: 14 + Math.random(),
                },
                sensors: [
                    {
                        type: 'PPM',
                        parameters: {},
                        values: [
                            {
                                ppm: 24,
                                time: 123456789010,
                            },
                        ],
                    },
                ],
            });
        }

        return devices;
    }
}
