import FetchMonthsTasks from "../../../../domain/services/tasks/taskRepository/FetchMonthsTasks.mjs";

export const FetchMonthsTasksAction = async (req, res) => {
    const updatedTaskWithDateTime = await FetchMonthsTasks();
    res.jsonp(updatedTaskWithDateTime);
};

export default FetchMonthsTasksAction;