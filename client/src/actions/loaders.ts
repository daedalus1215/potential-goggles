import { getContactsSearch } from '../contacts'
import { fetchTask } from './actions'
import type { LoaderFunctionArgs } from "@remix-run/router";

export const searchLoader = async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url)
    const q = url.searchParams.get('q') as string
    const tasks = await getContactsSearch(q)
    return { tasks, q }
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
