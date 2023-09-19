/**
 * 
 * @param {*} tasks list of tasks
 * @param {string[]} tagNames list of tag names
 * @returns 
 */
export const filterOutTags = (tasks, tagNames) => {
    if (tagNames) {
        let tags;
        if (typeof tagNames === 'string' && tagNames.includes(',')) {
            tags = tagNames.split(',').map(tag => tag.trim());
        } else if (typeof tagNames === 'string') {
            tags = [tagNames];
        } else if (Array.isArray(tagNames)) {
            tags = tagNames;
        }

        return tasks.filter(task => {
            return !tags.some(tag => task.tags.includes(tag));
        });
    }
    return tasks;
};
