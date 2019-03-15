export interface IDevice {
    id: string;
    title: string;
    description?: string;
    location: ILocation;
    sensors: (ISensorPPM)[];
}

export interface ILocation {
    latitude: number;
    longitude: number;
}

export function shortenLocation(location: ILocation) {
    return {
        lat: location.latitude,
        lng: location.longitude,
    };
}

export interface ISensorPPM {
    type: 'PPM';
    parameters: {};
    values: {
        ppm: 24;
        time: 123456789010;
    }[];
}
