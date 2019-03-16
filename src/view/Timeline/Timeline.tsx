import './Timeline.css';
import * as React from 'react';
import { observer } from 'mobx-react';
import { IAppState } from '../../model/IAppState';
import { IObservableObject } from 'mobx';
import { devicesGetTimeRange } from '../../model/IDevice';

interface ITimelineProps {
    appState: IAppState & IObservableObject;
}

export const Timeline = observer(({ appState }: ITimelineProps) => {
    if (appState.devices.length === 0) {
        return <></>;
    }

    const { first, last } = devicesGetTimeRange(...appState.devices);

    const percent = (appState.currentDate.getTime() - first) / (last - first);

    return (
        <div className="Timeline">
            <div
                className="date"
                style={{
                    marginLeft: `calc( ${percent * 99}% - 100px)`, //todo why 99 not 100
                }}
            >
                {appState.currentDate.toLocaleDateString(`cs`)}
            </div>
            <input
                type="range"
                defaultValue={'100'}
                min={0}
                max={100}
                step={1}
                onChange={(event) => {
                    appState.currentDate = new Date(
                        (parseInt(event.target.value) / 100) * (last - first) +
                            first,
                    );
                }}
            />
        </div>
    );
});
