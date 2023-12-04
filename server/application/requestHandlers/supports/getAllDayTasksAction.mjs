import FetchAllDayTasks from "../../../domain/services/tasks/taskRepository/FetchAllDayTasks.mjs"

export const getAllDayTasksAction = async (req, res) => {
    const { includeTags, excludeTags } = req.query;
    console.log('includeTags', includeTags)
    console.log('excludeTags', excludeTags)
    const tasks = await FetchAllDayTasks(includeTags, excludeTags);
    res.jsonp(tasks);
};