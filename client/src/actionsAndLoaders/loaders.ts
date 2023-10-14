import { api } from '@/config.json';
import fetchApiData from "@/utils/fetchApiData";
import type { LoaderFunctionArgs } from "@remix-run/router";
import { AggregateActivity, Tag, Task, TypedResponse } from '../interfaces';
import { formatDate } from "../../../server/utils/getDate.mjs";

// Loaders = GET \\ 

// fetch
export const fetchTasks = async (): Promise<Task[]> => await fetchApiData<Task[]>(`${api}tasks`, {});
export const fetchTask = async (index: string): Promise<Task> => await fetchApiData<Task>(`${api}task/${index}`, {});
export const fetchTasksTitles = async (): Promise<Task[]> => await fetchApiData<Task[]>(`${api}tasks-titles`, {});
export const fetchTodaysActivities = async (date?: string | null, tags?: string | null): Promise<AggregateActivity> => await fetchApiData<AggregateActivity>(`${api}activities/today?date=${date}&tags=${tags}`, {})

export const fetchTag = async (tagId: string): Promise<Tag> => await fetchApiData<Tag>(`${api}tag/${tagId}`, {});
export const fetchTags = async (): Promise<Tag[]> => await fetchApiData<Tag[]>(`${api}tags`, {});

type LoaderSignature = ({ params, request }: LoaderFunctionArgs) => Promise<any>;

// loaders - task
export const taskLoader = async ({ params }: LoaderFunctionArgs) => await fetchTask(params?.taskId ?? '');
export const tasksLoader = fetchTasks;
export const taskAndTagLoader = async ({ params }: LoaderFunctionArgs) => {
    const task = await fetchTask(params?.taskId ?? '')
    const tags = await fetchTags();

    const hash: any = {};
    task.tags.forEach(tag => hash[tag] = true);

    const options = tags.map(tag => {
        const option = { ...tag, selected: false };
        if (hash[tag.name]) {
            option.selected = true;
        }
        return option;
    });
    return { task, options }
}

/**
 * @TODO: Might decommission for smaller ones that can be reused
 * @returns 
 */
export const allActivitiesLoader = async ({ request }: LoaderFunctionArgs): Promise<any> => {
    const url = new URL(request.url)
    const date: string | null = url.searchParams.get('date');
    const queryTags: string | null = url.searchParams.get('tags');
    const allActivities = await fetchApiData<any>(`${api}activities/all?tags=${queryTags}`, {})
    const todaysActivities = await fetchTodaysActivities(date, queryTags);
    const monthActivities = await fetchApiData<any>(`${api}activities/months?tags=${queryTags}`, {})
    const tags = await fetchApiData<Tag[]>(`${api}tags`, {})
    const options = tags.map(tag => tag.name);

    return { allActivities, todaysActivities, monthActivities, tags, options };
}
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

export const stackGraphLoaders: LoaderSignature = async ({ params, request }) => {
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