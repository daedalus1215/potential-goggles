import TaskService from "../../../../domain/services/tasks/TaskService.mjs";

export default async (req, res) => {
    const id = req.params.taskId;
    const updatedTaskWithDateTime = await TaskService.createDateTimeOfTask(id);
    res.jsonp(updatedTaskWithDateTime);
};  