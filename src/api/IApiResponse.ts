export interface IApiResponse<T> {
    status: 'ok' | 'error';
    message?: string;
    data: T;
}
