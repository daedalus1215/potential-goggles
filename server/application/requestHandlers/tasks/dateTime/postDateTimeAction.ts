import TaskService from "../../../../domain/services/tasks/TaskService";
import { Response, Task, UpdateDateTimeActionRequest } from "../../../../interfaces";

module.exports = async (req: UpdateDateTimeActionRequest, res: Response<Task>) => {
    const id = req.params.taskId;
    const updatedTaskWithDateTime = await TaskService.createDateTimeOfTask(id);
    res.jsonp(updatedTaskWithDateTime);
};  