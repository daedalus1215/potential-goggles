import { addTagByName } from "./addTagByName.mjs";

export const importTags = (tasks) => {
    const tags = new Set(tasks.flatMap(task => task.tags));
    tags.forEach(tagName => addTagByName(tagName))
};