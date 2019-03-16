import './Root.css';
import * as React from 'react';
import { observer } from 'mobx-react';
import { IAppState } from '../../model/IAppState';
import { IObservableObject } from 'mobx';
import { ISaveState } from '../../controller/saver/ISaveState';
import { DefaultMap } from '../DefaultMap/DefaultMap';
import { Marker, Popup } from 'react-leaflet';
import { deviceGetSenzorValue } from '../../model/IDevice';
import * as Leaflet from 'leaflet';
import HeatmapLayer from 'react-leaflet-heatmap-layer';
import { shortenLocation } from '../../model/ILocation';


interface IAppProps {
    appState: IAppState & IObservableObject;
    saveState: ISaveState & IObservableObject;
}

export const boxIcon = new Leaflet.Icon({
    iconUrl: `/markers/box.png`,
    iconAnchor: [10, 10],
    popupAnchor: [0, 0],
    iconSize: [20, 20],
});

export const Root = observer(({ appState, saveState }: IAppProps) => {
    console.log('appState', appState);
    return (
        <div className="Root">
            {appState.devices.length ? (
                <DefaultMap
                    center={shortenLocation(appState.devices[0].location)}
                    zoom={9}
                >

                
                    <HeatmapLayer
                        fitBoundsOnLoad
                        fitBoundsOnUpdate
                        points={appState.devices}
                        longitudeExtractor={device => device.location.longitude}
                        latitudeExtractor={device => device.location.latitude}
                        intensityExtractor={device => deviceGetSenzorValue(device,'PPM')}
                    />



                    {appState.devices.map((device) => (
                        <Marker
                            key={device.id}
                            position={shortenLocation(device.location)}
                            icon={boxIcon}
                        >
                            <Popup>
                                <h2>{device.title}</h2>
                                <p>{device.description}</p>
                                <b>PPM:</b> {deviceGetSenzorValue(device,'PPM')}
                            </Popup>
                        </Marker>
                    ))}
                </DefaultMap>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
});
