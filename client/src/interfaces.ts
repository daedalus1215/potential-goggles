import { LoaderFunctionArgs } from "react-router-dom";
import { FORMS } from "./utils/constants";

export type formIds = keyof typeof FORMS;


// Loaders = GET \\ 
export type LoaderTypes<E> = () => Promise<E>;
export type LoaderSignature<E> = ({ params, request }: LoaderFunctionArgs) => Promise<E>;
export type StringLoaderTypes<E> = (index: string) => Promise<E>;

export type dateIncludeExcludeTagsQueryParams = Partial<{
    date: string,
    includeTags: string,
    excludeTags: string
}>;

export type includeExcludeTagsQueryParams = Partial<{
    includeTags: string,
    excludeTags: string
}>;
export type IncludeExcludeTagsLoaderTypes<E> = (params: includeExcludeTagsQueryParams) => Promise<E>;
export type DateIncludeExcludeTagsLoaderTypes<E> = (params: dateIncludeExcludeTagsQueryParams) => Promise<E>;

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
    taskId: string;
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
    taskId: string;
    name: string;
    description: string;
}

export interface AggregateActivity {
    activities: TodaysActivity[],
    total: number;
}

export interface TodaysActivity {
    taskId: string;
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
    taskId: string;
    time: DateTimeDateTime[];
    contractId: number;
    description: string;
    date: string;
    title: string;
}

export type DateTimeDateTime = {
    taskId: string;
    date: string;
    time: number;
    //@TODO: Probably replace this with `id` or `dateTimeId`
    _id: string;
}