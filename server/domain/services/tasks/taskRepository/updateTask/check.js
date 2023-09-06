
const check = (tasks) => {
    return tasks
        .filter(task => getDate(task.date) == today)
        .filter(task => task.tags.name.includes())
};

export default check;

