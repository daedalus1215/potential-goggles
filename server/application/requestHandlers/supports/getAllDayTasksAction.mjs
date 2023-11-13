import FetchAllDayTasks from "../../../domain/services/tasks/taskRepository/FetchAllDayTasks.mjs"

export const getAllDayTasksAction = async (req, res) => {
    const { tags } = req.query;
    const tasks = await FetchAllDayTasks(tags);
    res.jsonp(tasks);
};