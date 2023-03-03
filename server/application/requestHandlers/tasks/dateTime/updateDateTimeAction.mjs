import TaskService from "../../../../domain/services/tasks/TaskService.mjs";

export default async (req, res) => {
    const id = req.params.taskId;
    const dateTime = req.body;
    const updatedTaskWithDateTime = await TaskService.updateDateTimeOfTask(id, dateTime);
    res.jsonp(updatedTaskWithDateTime);
};  