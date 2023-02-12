import { Response, Task, UpdateDateTimeActionRequest } from "../../../dist/interfaces";

const TaskService = require('../../../domain/services/tasks/TaskService');

module.exports = (req: UpdateDateTimeActionRequest, res: Response<Task>) => {
    const id = req.params.taskId;
    const dateTime = req.body;
    const updatedTaskWithDateTime = TaskService.updateDateTimeOfTask(id, dateTime);
    res.jsonp(updatedTaskWithDateTime);
};  