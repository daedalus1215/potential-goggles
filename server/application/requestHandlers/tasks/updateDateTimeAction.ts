import { Console } from "console";
import { Response, Task, UpdateDateTimeActionRequest } from "../../../interfaces";
import { DateTimeDto } from "../../../interfaces";

const TaskService = require('../../../domain/services/tasks/TaskService');

module.exports = async (req: UpdateDateTimeActionRequest, res: Response<Task>) => {
    const id = req.params.taskId;
    const dateTime = req.body;
    const updatedTaskWithDateTime = await TaskService.updateDateTimeOfTask(id, dateTime);
    res.jsonp(updatedTaskWithDateTime);
};  