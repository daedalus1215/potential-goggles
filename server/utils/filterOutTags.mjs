/**
 * 
 * @param {*} tasks list of tasks
 * @param {string[]} tagNames list of tag names
 * @returns 
 */
export const filterOutTags = (tasks, tagNames) => {
    if (tagNames) {
        const tags = parseArrayString(tagNames);
        return tasks.filter(task => {
            return !tags.some(tag => task.tags.includes(tag));
        });
    }
    return tasks;
};
