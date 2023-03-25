import { fetchTag, fetchTags, fetchTask, fetchTasks } from './actions'
import type { LoaderFunctionArgs } from "@remix-run/router";
import { AggregateActivity, Task, TodaysActivity, TypedResponse } from '../interfaces';
import { api } from '@/config.json';
import { fetchApiData } from '@/utils';

export const searchLoader = async ({ request, params }: LoaderFunctionArgs) => {
    const url = new URL(request.url)
    const q = url.searchParams.get('q') as string
    const results = (await fetch('http://192.168.1.238:3001/api/tasks-titles')) as TypedResponse<Task[]>
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

export const taskLoader = async ({ params }: LoaderFunctionArgs) => {
    const task = await fetchTask(params?.taskId ?? '')
    return task
}

export const tasksLoader = async ({ params }: LoaderFunctionArgs) => {
    const tasks = await fetchTasks()
    return tasks
}

export const todayActivitiesLoader = async (): Promise<AggregateActivity> => {
    const activity = await fetchApiData<AggregateActivity>(`${api}activities/today`, {})
    return activity
}

export const allActivitiesLoader = async (): Promise<any> => {
    const allActivities = await fetchApiData<any>(`${api}activities/all`, {})
    const todaysActivities = await fetchApiData<AggregateActivity>(`${api}activities/today`, {})

    return { allActivities, todaysActivities };
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