import { getContactsSearch } from "../contacts";
import { Params } from "../pages/interfaces";
import { fetchTask } from "./actions";

//@TODO: Move this
export async function searchLoader({ request }: any) {
    console.log('mainLoader')
    const url = new URL(request.url);
    const q = url.searchParams.get("q") as string;
    console.log('q', q)
    const tasks = await getContactsSearch(q);
    return { tasks, q };
}


export async function taskLoader({ params }: Params) {
    const contact = await fetchTask(params.taskId);
    return contact;
}