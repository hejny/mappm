export type ISensor = ISensorPPM;
export type ISensorType = 'PPM';

export interface ISensorPPM {
    type: 'PPM';
    parameters: {};
    values: {
        ppm: 24;
        time: 123456789010;
    }[];
}