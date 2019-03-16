import { IDevice } from '../model/IDevice';
import { Api } from './Api';
import { randomPPM } from './ApiMock';
import * as uuid from 'uuid';

export class ApiMockReichenberg extends Api {
    async getDevices(): Promise<IDevice[]> {
        
        const response = await (await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&city=Liberec&street=pod&limit=100`,
        )).json();


        return response.map((nominatimPoi)=>(
            {
                id: uuid.v4(),
                title: 'Ostravska raketa!',
                description: 'bla egfb ergf wrsgf wrsgf wrsgf',
                location: {
                    latitude: nominatimPoi.lat,
                    longitude: nominatimPoi.lon,
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
            }
        ));
    }
}
