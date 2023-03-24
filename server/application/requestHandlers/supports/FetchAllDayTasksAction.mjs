import FetchAllDayTasks from "../../../domain/services/tasks/taskRepository/FetchAllDayTasks.mjs"

export default async (req, res) => {
    const tasks = await FetchAllDayTasks();
    res.jsonp(tasks);
}