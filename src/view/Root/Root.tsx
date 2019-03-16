import './Root.css';
import * as React from 'react';
import { observer } from 'mobx-react';
import { IAppState } from '../../model/IAppState';
import { IObservableObject } from 'mobx';
import { ISaveState } from '../../controller/saver/ISaveState';
import { DefaultMap } from '../DefaultMap/DefaultMap';
import { Marker, Popup } from 'react-leaflet';
import { deviceGetSenzorValue, devicesGetTimeRange } from '../../model/IDevice';
import * as Leaflet from 'leaflet';
import HeatmapLayer from 'react-leaflet-heatmap-layer';
import { shortenLocation } from '../../model/ILocation';
import { Timeline } from '../Timeline/Timeline';
import { MAP_CENTER } from '../../config';

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
    const devicesInRange = appState.devices.filter((device) => {
        const { first } = devicesGetTimeRange(device);
        return appState.currentDate.getTime() >= first;
    });

    return (
        <div className="Root">
            <DefaultMap center={MAP_CENTER} zoom={12}>
                {/**/}
                <HeatmapLayer
                    points={devicesInRange.filter((device) => {
                        const value = deviceGetSenzorValue(device, 'PPM');
                        return value >= 0 && value < 100;
                    })}
                    longitudeExtractor={(device) => device.location.longitude}
                    latitudeExtractor={(device) => device.location.latitude}
                    intensityExtractor={(device) => 1}
                    max={1}
                    blur={0}
                    minOpacity={0.2}
                    radius={50}
                    gradient={{ 0: 'green' }}
                />

                <HeatmapLayer
                    points={devicesInRange.filter((device) => {
                        const value = deviceGetSenzorValue(device, 'PPM');
                        return value >= 100 && value < 500;
                    })}
                    longitudeExtractor={(device) => device.location.longitude}
                    latitudeExtractor={(device) => device.location.latitude}
                    intensityExtractor={(device) => 1}
                    max={1}
                    blur={0}
                    minOpacity={0.2}
                    radius={50}
                    gradient={{ 0: 'orange' }}
                />

                <HeatmapLayer
                    points={devicesInRange.filter((device) => {
                        const value = deviceGetSenzorValue(device, 'PPM');
                        return value >= 500 && value < 1000;
                    })}
                    longitudeExtractor={(device) => device.location.longitude}
                    latitudeExtractor={(device) => device.location.latitude}
                    intensityExtractor={(device) => 1}
                    max={1}
                    blur={0}
                    minOpacity={0.2}
                    radius={50}
                    gradient={{ 0: 'red' }}
                />

                {devicesInRange.map((device) => (
                    <Marker
                        key={device.id}
                        position={shortenLocation(device.location)}
                        icon={boxIcon}
                    >
                        <Popup>
                            <h2>{device.title}</h2>
                            <p>{device.description}</p>
                            <b>PPM:</b> {deviceGetSenzorValue(device, 'PPM')}
                        </Popup>
                    </Marker>
                ))}
            </DefaultMap>

            <Timeline {...{ appState }} />
        </div>
    );
});
