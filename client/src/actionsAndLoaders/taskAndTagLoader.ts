import { LoaderFunctionArgs } from "react-router-dom";
import { fetchTags, fetchTask } from "./loaders";

export const taskAndTagLoader = async ({ params }: LoaderFunctionArgs) => {
    console.log('1')
    const task = await fetchTask(params?.taskId ?? '')
    console.log('2')
    const tags = await fetchTags();
    console.log('3')

    const hash: any = {};
    task.tags.forEach(tag => hash[tag] = true);
    console.log('hash', hash)
    const options = tags.map(tag => {
        const option = { ...tag, selected: false };
        if (hash[tag.name]) {
            option.selected = true;
        }
        return option;
    });
    return { task, options }
}