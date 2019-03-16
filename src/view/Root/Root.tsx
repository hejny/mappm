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
    
    const devicesInRange = appState.devices.filter((device)=>{
        const {first} = devicesGetTimeRange(device);
        return appState.currentDate.getTime()>=first;
    });

    return (
        <div className="Root">
     
               
            <DefaultMap
                center={MAP_CENTER}
                zoom={12}
        
            >

                {/**/}
                <HeatmapLayer
              
                    points={devicesInRange}
                    longitudeExtractor={device => device.location.longitude}
                    latitudeExtractor={device => device.location.latitude}
                    intensityExtractor={device => deviceGetSenzorValue(device,'PPM')}
                    max={100}
                    radius={50}
                    gradient={{ 0.4: 'blue', 0.8: 'orange', 1.0: 'red' }}
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
                            <b>PPM:</b> {deviceGetSenzorValue(device,'PPM')}
                        </Popup>
                    </Marker>
                ))}
            </DefaultMap>
            <Timeline {...{ appState }}/>
               
        
        </div>
    );
});
