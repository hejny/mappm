import { IApiResponse } from './IApiResponse';
import { IDevice } from './IDevice';

export class Api {
    constructor(private apiUrl: string) {}

    async getDevices(): Promise<IDevice[]> {
        const response: IApiResponse<IDevice[]> = await (await fetch(
            `${this.apiUrl}/devices`,
        )).json();
        if (response.status === 'error') {
            throw new Error(response.message);
        }

        return response.data;
    }
}
