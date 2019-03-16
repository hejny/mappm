import './Root.css';
import * as React from 'react';
import { observer } from 'mobx-react';
import { IAppState } from '../../model/IAppState';
import { IObservableObject } from 'mobx';
import { ISaveState } from '../../controller/saver/ISaveState';
import { DefaultMap } from '../maps/DefaultMap';
import { Marker, Popup } from 'react-leaflet';
import { shortenLocation } from '../../api/IDevice';
import * as Leaflet from 'leaflet';
import HeatmapLayer from 'react-leaflet-heatmap-layer';


interface IAppProps {
    appState: IAppState & IObservableObject;
    saveState: ISaveState & IObservableObject;
}

export const boxIcon = new Leaflet.Icon({
    iconUrl: `/markers/box.png`,
    //iconRetinaUrl: require('../assets/pointerIcon.svg'),
    iconAnchor: [5, 55],
    popupAnchor: [10, -44],
    iconSize: [25, 55],
    shadowUrl: '../assets/marker-shadow.png',
    shadowSize: [68, 95],
    shadowAnchor: [20, 92],
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
                        intensityExtractor={device => Math.floor(Math.random()*100)}
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
