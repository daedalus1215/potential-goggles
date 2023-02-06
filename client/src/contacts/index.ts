import { isHtmlElement } from "react-router-dom/dist/dom";
import fetchApiData from "../utils/fetchApiData";
import getCurrentDateTimeEstFormat from "../utils/getCurrentDateTimeEstFormat";

export interface Contact {
    id: string;
    first: string;
    last: string;
    avatar: string;
    twitter: string;
    notes: string;
    favorite: boolean;
};

export interface Task {
    _id: string;
    title?: string;
    description: string;
    projectId: number;
    time: number;
    favorite?: boolean;
}

export interface Params {
    params: {
        contactId: string
    };
}

let data: Contact[] = [{
    id: 'dsd',
    first: "Jeremy",
    last: "Holmes",
    avatar: "https://placekitten.com/g/200/200",
    twitter: "@jHolmes",
    notes: "Some notes",
    favorite: true,
},
{
    id: 'd2sd',
    first: "Ysdsour",
    last: "Namsdase",
    avatar: "https://placekitten.com/g/200/200",
    twitter: "twitter handle",
    notes: "Some notes",
    favorite: true,
}];

/**
 * https://dev.to/iamandrewluca/typed-fetch-response-in-typescript-1eh1
 */
interface TypedResponse<T = any> extends Response {
    /**
     * this will override `json` method from `Body` that is extended by `Response`
     * interface Body {
     *     json(): Promise<any>;
     * }
     */
    json<P = T>(): Promise<P>
}
export const getContacts = (): Contact[] => data;

export const getContactsSearch = async (name?: string): Promise<Task[]> => {
    const results = await fetch('http://localhost:3001/api/tasks') as TypedResponse<Task[]>;
    if (!results.ok) throw new Error('Something went wrong!');
    const tasks = await results.json();

    if (!name) {
        return tasks;
    } else {
        console.log('name', name);

        return tasks.filter((task: Task) => task.description.toLowerCase().includes(name.toLowerCase()));
    }

}
export const createContact = () => {
    data.push({
        id: 'd2sdw',
        first: "Yddour",
        last: "Naddsme",
        avatar: "https://placekitten.com/g/200/200",
        twitter: "your_handle",
        notes: "Some notes",
        favorite: true,
    });
};

export const deleteContact = (id: string) => {
    data = data.filter(contact => contact.id !== id);
}

export const getContact = async (index: string): Promise<Task> => {
    const task = await fetchApiData<Task>(`http://localhost:3001/api/task/${index}`, {});
    return task;
}

