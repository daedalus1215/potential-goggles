import { api } from '@/config.json';
import fetchApiData from "@/utils/fetchApiData";
import type { LoaderFunctionArgs } from "@remix-run/router";
import { AggregateActivity, Tag, Task, TypedResponse } from '../interfaces';
import { formatDate } from '@/utils/formatters/formatDate';

// Loaders = GET \\ 
type LoaderTypes<E> = () => Promise<E>;
type LoaderSignature<E> = ({ params, request }: LoaderFunctionArgs) => Promise<E>;
type StringLoaderTypes<E> = (index: string) => Promise<E>;
type IncludeExcludeTagsLoaderTypes<E> = (includeTags?: string | null, excludeTags?: string | null) => Promise<E>;
type DateIncludeExcludeTagsLoaderTypes<E> = (date?: string | null, includeTags?: string | null, excludeTags?: string | null) => Promise<E>;

// fetch
export const fetchTasks: LoaderTypes<Task[]> = async () => await fetchApiData(`${api}tasks`, {});
export const fetchTask: StringLoaderTypes<Task> = async (index) => await fetchApiData(`${api}task/${index}`, {});
export const fetchTasksTitles: LoaderTypes<Task[]> = async () => await fetchApiData(`${api}tasks-titles`, {});
export const fetchTodaysActivities: DateIncludeExcludeTagsLoaderTypes<AggregateActivity> = async (date, includeTags, excludeTags) =>
    await fetchApiData(`${api}activities/today${createQueryParams(date, includeTags, excludeTags)}`, {});
export const createQueryParams = (date?: string | null, includeTags?: string | null, excludeTags?: string | null) => {
    if (date && includeTags && excludeTags) {
        return `?date=${date}&includeTags=${includeTags}&excludeTags=${excludeTags}`;
    } else if (date && includeTags) {
        return `?date=${date}&includeTags=${includeTags}`;
    } else if (date) {
        return `?date=${date}`;
    }
    return '';
};
export const fetchAllDayTasks: IncludeExcludeTagsLoaderTypes<AggregateActivity> = async (includeTags, excludeTags) => {
    return await fetchApiData(`${api}activities/all${createQueryParams(null, includeTags, excludeTags)}`, {})
}
export const fetchAllMonthTasks: IncludeExcludeTagsLoaderTypes<AggregateActivity> = async (includeTags, excludeTags) =>
    await fetchApiData<any>(`${api}activities/months?includeTags=${includeTags}&excludeTags=${excludeTags}`, {})

export const fetchTag = async (tagId: string): Promise<Tag> => await fetchApiData<Tag>(`${api}tag/${tagId}`, {});
export const fetchTags = async (): Promise<Tag[]> => await fetchApiData<Tag[]>(`${api}tags`, {});

// loaders - task
export const taskLoader = async ({ params }: LoaderFunctionArgs) => await fetchTask(params?.taskId ?? '');
export const tasksLoader = fetchTasks;

export const dateTimeLoader = async ({ params }: LoaderFunctionArgs) => {
    const task = await fetchTask(params?.taskId ?? '')

    return {
        dateTime: task.dateTimes.find((dateTime) => dateTime.id === params.dateTimeId),
        taskId: params.taskId,
    }
}

export const stackGraphLoader = async ({ request, params }: LoaderFunctionArgs): Promise<any> => {
    const url = new URL(request.url)
    const date: string = url.searchParams.get('date') ?? (formatDate(new Date()) as string);
    const days: number = url.searchParams.get('days') && parseInt(url.searchParams.get('days') as string) || 7;
    const includeTags: string[] = url.searchParams.getAll('includeTags') ?? [];
    const excludeTags: string[] = url.searchParams.getAll('excludeTags') ?? [];
    return await fetchApiData(`${api}stack-graph/?date=${date}&days=${days}&includeTags=${includeTags}&excludeTags=${excludeTags}`, {})
};

export const addQuestionMarkIfRequired = (request: Request): Request => {
    if (request.url.includes('?')) {
        return {
            ...request,
            url: request.url + "&",
        };
    }
    return {
        ...request,
        url: request.url + "?",
    };
};

export const stackGraphLoaders: LoaderSignature<any> = async ({ params, request }) => {
    const date = formatDate(new Date());
    const validatedRequest = addQuestionMarkIfRequired(request);

    const weekStack = await stackGraphLoader({
        params,
        request: {
            ...validatedRequest,
            url: `${validatedRequest.url}date=2023-10-10`,
        }
    });

    const monthStack = await stackGraphLoader({
        params,
        request: {
            ...validatedRequest,
            url: `${validatedRequest.url}date=2023-10-10&days=30`,
        }
    });

    return { weekStack, monthStack };
};

// loaders - tags
export const tagsLoader = fetchTags;

export const tagLoader = async ({ params }: LoaderFunctionArgs) => {
    const tagId = params.tagId ?? ''
    const tag = await fetchTag(tagId)
    return tag
}


// loaders - search
export const searchLoader = async ({ request, params }: LoaderFunctionArgs) => {
    const url = new URL(request.url)
    const q = url.searchParams.get('q') as string
    const results = (await fetch(`${api}tasks-titles`)) as TypedResponse<Task[]>
    const tasks = await selectSearchResult(results, q);
    const selectedId = params.id;

    return { tasks, q, selectedId }
}

const selectSearchResult = async (results: TypedResponse<Task[]>, name?: string) => {
    if (!results.ok) throw new Error('Something went wrong!')
    const tasks = await results.json()
    if (!name) {
        return tasks
    } else {
        return tasks.filter((task: Task) => task?.title?.toLowerCase().includes(name.toLowerCase()))
    }
}
