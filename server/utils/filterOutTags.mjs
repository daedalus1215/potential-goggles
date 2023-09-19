/**
 * 
 * @param {*} tasks list of tasks
 * @param {string[]} tagNames list of tag names
 * @returns 
 */
export const filterOutTags = (tasks, tagNames) => {
    if (tagNames) {
        const tags = tagNames.split(',');
        return tasks.filter(task => {
            return !task.tags.find(tag => tags.find(tagName => tag === tagName))
        });
    }
    return tasks;
};