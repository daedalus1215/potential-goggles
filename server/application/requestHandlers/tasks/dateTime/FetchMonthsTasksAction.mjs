import FetchMonthsTasks from "../../../../domain/services/tasks/taskRepository/FetchMonthsTasks.mjs";

export const FetchMonthsTasksAction = async (req, res) => {
    const { tags } = req.query;
    const updatedTaskWithDateTime = await FetchMonthsTasks(tags);
    res.jsonp(updatedTaskWithDateTime);
};

export default FetchMonthsTasksAction;