import './Root.css';
import * as React from 'react';
import { observer } from 'mobx-react';
import { IAppState } from '../../model/IAppState';
import { IObservableObject } from 'mobx';
import { ISaveState } from '../../controller/saver/ISaveState';
import { DefaultMap } from '../maps/DefaultMap';
import { Marker, Popup } from 'react-leaflet';

interface IAppProps {
    appState: IAppState & IObservableObject;
    saveState: ISaveState & IObservableObject;
}

export const Root = observer(({ appState, saveState }: IAppProps) => {
    return (
        <div className="Root">
            <DefaultMap
                center={{
                    lat: 50,
                    lng: 14,
                }}
                zoom={9}
            >
                <Marker
                    position={{
                        lat: 50,
                        lng: 14,
                    }}
                >
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </DefaultMap>
        </div>
    );
});
