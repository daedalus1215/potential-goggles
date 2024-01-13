import { LoaderFunctionArgs } from "react-router-dom";
import { FORMS } from "./utils/constants";

export type formIds = keyof typeof FORMS;

export interface Params {
    params: {
        taskId: string
    };
}

export interface DateParams extends Params {
    params: {
        taskId: string,
        dateTimeId: string
    }
}

export type ActionInterface<T> = (requestObject: LoaderFunctionArgs) => Promise<T>;
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

export interface DateTime { id: string, date: string, time: string }

export interface Task {
    _id: string;
    title?: string;
    description: string;
    projectId: number;
    time: number;
    favorite?: boolean;
    dateTimes: DateTime[];
    tags: string[]
}

export interface ProperTask {
    taskId: string;
    title?: string;
    description: string;
    projectId: number;
    time: number;
    favorite?: boolean;
    dateTimes: DateTime[];
    tags: string[]
}

//@TODO: Declare a Checkbox Tag here
export interface Tag {
    _id: string;
    name: string;
    description: string;
}

export interface AggregateActivity {
    activities: TodaysActivity[],
    total: number;
}

export interface TodaysActivity {
    _id: string;
    title: string;
    date: Date,
    totalTimeToday: number;
    times: DateTime[]
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

export type DateTimeTaskResponse = {
    tags: Tag[];
    _id: string;
    time: DateTimeDateTime[];
    contractId: number;
    description: string;
    date: string;
    title: string;
}

export type DateTimeDateTime = {
    _id: string;
    date: string;
    time: number;
}