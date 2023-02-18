import { fetchTask } from './actions'
import type { LoaderFunctionArgs } from "@remix-run/router";
import { Task, TypedResponse } from '../interfaces';

export const searchLoader = async ({ request, params }: LoaderFunctionArgs) => {
    const url = new URL(request.url)
    const q = url.searchParams.get('q') as string
    const results = (await fetch('http://localhost:3001/api/tasks')) as TypedResponse<Task[]>
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

export const dateTimeLoader = async ({ params }: LoaderFunctionArgs) => {
    const task = await fetchTask(params?.taskId ?? '')

    return {
        dateTime: task.dateTimes.find((dateTime) => dateTime.id === params.dateTimeId),
        taskId: params.taskId,
    }
}
