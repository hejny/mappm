import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { MapAppRoot } from './view/MapAppRoot/MapAppRoot';

export interface IAppConfig {
    apiURL: string;
}

export class MapApp {
    constructor(targetElement: HTMLElement, config: IAppConfig) {
        ReactDOM.render(<MapAppRoot />, targetElement);
    }
}
