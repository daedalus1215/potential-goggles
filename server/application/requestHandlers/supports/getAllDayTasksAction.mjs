import FetchAllDayTasks from "../../../domain/services/tasks/taskRepository/FetchAllDayTasks.mjs"

export const getAllDayTasksAction = async (req, res) => {
    const { includeTags, excludeTags } = req.query;
    const tasks = await FetchAllDayTasks(includeTags, excludeTags);
    res.jsonp(tasks);
};