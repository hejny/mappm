export type ISensor = ISensorPPM;
export type ISensorType = 'PPM';

export interface ISensorPPM {
    type: 'PPM';
    parameters: {};
    values: {
        ppm: number;
        time: number;
    }[];
}