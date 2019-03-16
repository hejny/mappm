import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Api } from './api/Api';
import { restoreAppState } from './controller/saver/restoreAppState';
import { saveAppStateAfterChange } from './controller/saver/saveAppStateAfterChange';
import { IAppState } from './model/IAppState';
import { ISaveState } from './controller/saver/ISaveState';
import { IObservableObject } from 'mobx';
import { Root } from './view/Root/Root';
import { ApiMockRandom } from './api/ApiMockRandom';

export interface IAppConfig {
    apiUrl: string;
}

export class MapApp {
    private api: Api;
    public appState: IAppState & IObservableObject;
    public saveState: ISaveState & IObservableObject;

    constructor(targetElement: HTMLElement, config: IAppConfig) {
        this.appState = restoreAppState();
        //this.saveState = saveAppStateAfterChange(this.appState);

        ReactDOM.render(
            <Root
                {...{ appState: this.appState, saveState: this.saveState }}
            />,
            targetElement,
        );

        this.api = new ApiMockRandom(config.apiUrl);
        //this.api = new ApiMockReichenberg(config.apiUrl);

        this.loadData();
    }

    private async loadData() {
        this.appState.devices = await this.api.getDevices();
    }
}
