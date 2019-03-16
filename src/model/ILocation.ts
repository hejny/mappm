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
