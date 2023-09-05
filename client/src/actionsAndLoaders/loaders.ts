import type { LoaderFunctionArgs } from "@remix-run/router";
import { AggregateActivity, Tag, Task, TypedResponse } from '../interfaces';
import { api } from '@/config.json';
import { fetchApiData } from '@/utils';

// Loaders = GET

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

export const taskLoader = async ({ params }: LoaderFunctionArgs) => {
    const task = await fetchTask(params?.taskId ?? '')
    return task
}

export const tasksLoader = async ({ params }: LoaderFunctionArgs) => {
    const tasks = await fetchTasks()
    return tasks
}

export const fetchTasks = async (): Promise<Task[]> => await fetchApiData<Task[]>(`${api}tasks`, {});
export const fetchTask = async (index: string): Promise<Task> => await fetchApiData<Task>(`${api}task/${index}`, {});
export const fetchTasksTitles = async (): Promise<Task[]> => await fetchApiData<Task[]>(`${api}tasks-titles`, {});

export const todayActivitiesLoader = async (): Promise<AggregateActivity> => await fetchTodaysActivities();

export const allActivitiesLoader = async (): Promise<any> => {
    const allActivities = await fetchApiData<any>(`${api}activities/all`, {})
    const todaysActivities = await fetchTodaysActivities();
    const monthActivities = await fetchApiData<any>(`${api}activities/months`, {})
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

export const tagsLoader = async () => {
    const tags = await fetchTags()
    return tags
}

export const tagLoader = async ({ params }: LoaderFunctionArgs) => {
    const tagId = params.tagId ?? ''
    const tag = await fetchTag(tagId)
    return tag
}