import { Task, TypedResponse } from "../pages/interfaces";
import fetchApiData from "../utils/fetchApiData";

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

