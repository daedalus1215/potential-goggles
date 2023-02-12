import { parseMutationArgs } from "@tanstack/react-query";
import { getContactsSearch } from "../contacts";
import { DateParams, Params, DateTime } from "../interfaces";
import { fetchTask } from "./actions";

//@TODO: Move this
export async function searchLoader({ request }: any) {
    console.log('mainLoader')
    const url = new URL(request.url);
    const q = url.searchParams.get("q") as string;
    console.log('q', q)
    const tasks = await getContactsSearch(q);
    return { tasks, q };
};

export async function taskLoader({ params }: Params) {
    const task = await fetchTask(params.taskId);
    return task;
};

export async function dateTimeLoader({ params }: DateParams) {
    const task = await fetchTask(params.taskId);

    return {
        dateTime: task.dateTimes
            .find(dateTime => dateTime.id === params.dateTimeId),
        taskId: params.taskId
    }
}