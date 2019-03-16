import './Root.css';
import * as React from 'react';
import { observer } from 'mobx-react';
import { IAppState } from '../../model/IAppState';
import { IObservableObject } from 'mobx';
import { ISaveState } from '../../controller/saver/ISaveState';
import { DefaultMap } from '../DefaultMap/DefaultMap';
import { Marker, Popup } from 'react-leaflet';
import { deviceGetSenzorValue, devicesGetTimeRange, IDevice } from '../../model/IDevice';
import * as Leaflet from 'leaflet';
import HeatmapLayer from 'react-leaflet-heatmap-layer';
import { shortenLocation } from '../../model/ILocation';
import { Timeline } from '../Timeline/Timeline';
import { MAP_CENTER } from '../../config';

interface IAppProps {
    appState: IAppState & IObservableObject;
    saveState: ISaveState & IObservableObject;
}

export const boxIconGreen = new Leaflet.Icon({
    iconUrl: `./markers/green.png`,
    iconAnchor: [10, 10],
    popupAnchor: [0, 0],
    iconSize: [20, 20],
});

export const boxIconRed = new Leaflet.Icon({
    iconUrl: `./markers/red.png`,
    iconAnchor: [10, 10],
    popupAnchor: [0, 0],
    iconSize: [20, 20],
});

export const boxIconOrange = new Leaflet.Icon({
    iconUrl: `./markers/orange.png`,
    iconAnchor: [10, 10],
    popupAnchor: [0, 0],
    iconSize: [20, 20],
});

export const Root = observer(({ appState, saveState }: IAppProps) => {

    //const [zoom, setZoom] = React.useState(12);

    const devicesInRange = appState.devices.filter((device) => {
        const { first } = devicesGetTimeRange(device);
        return appState.currentDate.getTime() >= first;
    });


    const devices1:IDevice[] = [];
    const devices2:IDevice[] = [];
    const devices3:IDevice[] = [];

    for(const device of devicesInRange){
        const value = deviceGetSenzorValue(device, appState.currentDate.getTime(), 'PPM');
        if(value >= 0 && value < 100){
            devices1.push(device);
        }else
        if(value >= 100 && value < 500){
            devices2.push(device);
        }else
        if(value >= 500 && value < 1000){
            devices3.push(device);
        }
    }

    return (
        <div className="Root">
            <DefaultMap center={MAP_CENTER} onZoomChange={(zoom)=>appState.mapZoom=zoom} zoom={appState.mapZoom}>
                {/**/}
                <HeatmapLayer
                    points={devices1}
                    longitudeExtractor={(device) => device.location.longitude}
                    latitudeExtractor={(device) => device.location.latitude}
                    intensityExtractor={(device) => 1}
                    max={1}
                    blur={0}
                    minOpacity={0.2}
                    radius={50/*Math.pow(2,appState.mapZoom-12)*/}
                    gradient={{ 0: 'green' }}
                />

                <HeatmapLayer
                    points={devices2}
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
                    points={devices3}
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
                        icon={(()=>{

                            if(devices1.indexOf(device)!==-1){
                                return boxIconGreen;
                            }else
                            if(devices2.indexOf(device)!==-1){
                                return boxIconOrange;
                            }else
                            if(devices3.indexOf(device)!==-1){
                                return boxIconRed;
                            }

                            return boxIconGreen;
                        })()}
                    >
                        <Popup>
                            <h2>{device.title}</h2>
                            <p>{device.description}</p>

                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <b>PPM:</b>
                                            <i>({appState.currentDate.toLocaleDateString(`cs`)})</i>
                                        </td>
                                        <td>
                                            {Math.round(deviceGetSenzorValue(device, appState.currentDate.getTime(), 'PPM'))}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <b>PPM:</b>
                                            <i>(dnes)</i>
                                        </td>
                                        <td>
                                            {Math.round(deviceGetSenzorValue(device, new Date().getTime(), 'PPM'))}
                                        </td>
                                    </tr>
                                </tbody>
                            </table> 
                        </Popup>
                    </Marker>
                ))}
            </DefaultMap>

            <Timeline {...{ appState }} />
        </div>
    );
});
