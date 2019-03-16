import { IApiResponse } from './IApiResponse';
import { IDevice } from './IDevice';
import { Api } from './Api';

export class ApiMockReichenberg extends Api {
    async getDevices(): Promise<IDevice[]> {
        
        const response = await (await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&city=Liberec&street=pod&limit=100`,
        )).json();


        return response.map((nominatimPoi)=>(
            {
                id: 'uuid-uuid-uuid',
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
                                ppm: 24,
                                time: 123456789010,
                            },
                        ],
                    },
                ],
            }
        ));
    }
}
