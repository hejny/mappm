import './Root.css';
import * as React from 'react';
import { observer } from 'mobx-react';
import { IAppState } from '../../model/IAppState';
import { IObservableObject } from 'mobx';
import { ISaveState } from '../../controller/saver/ISaveState';
import { DefaultMap } from '../maps/DefaultMap';
import { Marker, Popup } from 'react-leaflet';
import { shortenLocation } from '../../api/IDevice';

interface IAppProps {
    appState: IAppState & IObservableObject;
    saveState: ISaveState & IObservableObject;
}

export const Root = observer(({ appState, saveState }: IAppProps) => {
    console.log('appState',appState);
    return (
        <div className="Root">

            {appState.devices.length?(
            <DefaultMap
                center={shortenLocation(appState.devices[0].location)}
                zoom={9}
            >
                {appState.devices.map((device)=>(
                    <Marker
                        key={device.id}
                        position={shortenLocation(device.location)}
                    >
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                    
                ))}

            </DefaultMap>
            ):(
                <div>
                    Loading...
                </div>
            )}
        </div>
    );
});
