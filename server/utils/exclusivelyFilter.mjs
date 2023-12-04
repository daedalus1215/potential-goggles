import { parseArrayString } from "./parseArrayString.mjs";

/**
 * 
 * @param {*} tasks list of tasks
 * @param {string[]} tagNames list of tag names
 * @returns 
 */
export const exclusivelyFilter = (tasks, tagNames) => {
    if (tagNames && tagNames !== "null") {
        const tags = parseArrayString(tagNames);
        return tasks.filter(task => {
            return !tags.some(tag => task.tags.includes(tag));
        });
    }
    return tasks;
};
