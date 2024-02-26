import { api } from '@/config.json';
import fetchApiData from "@/utils/fetchApiData";
import type { LoaderFunctionArgs } from "@remix-run/router";
import { AggregateActivity, DateIncludeExcludeTagsLoaderTypes, IncludeExcludeTagsLoaderTypes, LoaderSignature, LoaderTypes, StringLoaderTypes, Tag, Task, TypedResponse, dateIncludeExcludeTagsQueryParams } from '../interfaces';
import { formatDate } from '@/utils/formatters/formatDate';

// fetch
export const fetchTasks: LoaderTypes<Task[]> = async () => await fetchApiData(`${api}tasks`, {});
export const fetchTask: StringLoaderTypes<Task> = async (index) => await fetchApiData(`${api}task/${index}`, {});
export const fetchTasksTitles: LoaderTypes<Task[]> = async () => await fetchApiData(`${api}tasks-titles`, {});
export const fetchTodaysActivities: DateIncludeExcludeTagsLoaderTypes<AggregateActivity> = async (params) =>
    await fetchApiData(`${api}activities/today${createQueryParams(params)}`, {});

export const createQueryParams = (params: dateIncludeExcludeTagsQueryParams): string => {
    const queryParams = [];

    if (params.date&& params.date != undefined) {
        queryParams.push(`date=${encodeURIComponent(params.date)}`);
    }
    if (params.includeTags&& params.includeTags != undefined) {
        queryParams.push(`includeTags=${encodeURIComponent(params.includeTags)}`);
    }
    if (params.excludeTags && params.excludeTags != undefined) {
        queryParams.push(`excludeTags=${encodeURIComponent(params.excludeTags)}`);
    }

    return queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
};

export const fetchAllDayTasks: IncludeExcludeTagsLoaderTypes<AggregateActivity> = async (params) => {
    return await fetchApiData(`${api}activities/all${createQueryParams(params)}`, {})
}
export const fetchAllMonthTasks: IncludeExcludeTagsLoaderTypes<AggregateActivity> = async (params) =>
    await fetchApiData<any>(`${api}activities/months${createQueryParams(params)}`, {})

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
