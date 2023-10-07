import striptags from 'striptags';

/**
 * 
 * @param {Task} task 
 */
export const getTitle = (task) => task?.title
    ?? (task?.description
        ? striptags(task.description.split("</p>")[0]?.split("<p>")[1])
        : '');