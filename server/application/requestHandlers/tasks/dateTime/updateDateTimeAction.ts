import TaskService from "../../../../domain/services/tasks/TaskService";
import { Response, Task, UpdateDateTimeActionRequest } from "../../../../interfaces";

module.exports = async (req: UpdateDateTimeActionRequest, res: Response<Task>) => {
    const id = req.params.taskId;
    const dateTime = req.body;
    const updatedTaskWithDateTime = await TaskService.updateDateTimeOfTask(id, dateTime);
    res.jsonp(updatedTaskWithDateTime);
};  