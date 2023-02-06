export type ActionInterface = ({ request, params }: { request: any, params: any }) => void;
export type ErrorInterface = {
    statusText: string;
    message: string;
}
export interface Contact {
    id: string;
    first: string;
    last: string;
    avatar: string;
    twitter: string;
    notes: string;
    favorite: boolean;
};
export interface Task {
    _id: string;
    title?: string;
    description: string;
    projectId: number;
    time: number;
    favorite?: boolean;
}
export interface Params {
    params: {
        taskId: string
    };
}
/**
 * https://dev.to/iamandrewluca/typed-fetch-response-in-typescript-1eh1
 */
export interface TypedResponse<T = any> extends Response {
    /**
     * this will override `json` method from `Body` that is extended by `Response`
     * interface Body {
     *     json(): Promise<any>;
     * }
     */
    json<P = T>(): Promise<P>
}