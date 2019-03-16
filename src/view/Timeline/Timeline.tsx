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
    return (
        <div className="Timeline">
            <div className="date">
                {appState.currentDate.toLocaleDateString(`cs`)}
            </div>
            <input
                type="range"
                defaultValue={'100'}
                min={0}
                max={100}
                step={1}
                onChange={(event) => {
                    const { first, last } = devicesGetTimeRange(
                        ...appState.devices,
                    );

                    appState.currentDate = new Date(
                        (parseInt(event.target.value) / 100) * (last - first) +
                            first,
                    );
                }}
            />
        </div>
    );
});
