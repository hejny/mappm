import { IAppState } from './IAppState';

export function createDefaultAppState(): IAppState {
    return {
        devices: [],
    };
}
