import './Timeline.css';
import * as React from 'react';
import { observer } from 'mobx-react';
import { IAppState } from '../../model/IAppState';
import { IObservableObject } from 'mobx';



interface ITimelineProps {
    appState: IAppState & IObservableObject;
}

export const Timeline = observer(({ appState }: ITimelineProps) => {
    return (
        <div className="Timeline">
           <input type="range" min={0} max={100} step={1} />
        </div>
    );
});
