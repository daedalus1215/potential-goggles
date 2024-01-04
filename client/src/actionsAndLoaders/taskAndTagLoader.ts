import { LoaderFunctionArgs } from "react-router-dom";
import { fetchTags, fetchTask } from "./loaders";

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