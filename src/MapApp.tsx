import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Api } from './api/Api';
import { restoreAppState } from './controller/saver/restoreAppState';
import { saveAppStateAfterChange } from './controller/saver/saveAppStateAfterChange';
import { IAppState } from './model/IAppState';
import { ISaveState } from './controller/saver/ISaveState';
import { IObservableObject } from 'mobx';
import { Root } from './view/Root/Root';

export interface IAppConfig {
    apiUrl: string;
}

export class MapApp {
    private api: Api;
    public appState: IAppState & IObservableObject;
    public saveState: ISaveState & IObservableObject;

    constructor(targetElement: HTMLElement, config: IAppConfig) {
        this.appState = restoreAppState();
        this.saveState = saveAppStateAfterChange(this.appState);

        ReactDOM.render(
            <Root
                {...{ appState: this.appState, saveState: this.saveState }}
            />,
            targetElement,
        );
        this.api = new Api(config.apiUrl);
    }

    private async loadData() {
        this.api.getDevices();
    }
}
