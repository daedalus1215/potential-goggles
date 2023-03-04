import { validationResult } from "express-validator";
import TaskService from "../../../domain/services/tasks/TaskService.mjs";
import RequestToTaskDto from "./assemblers/RequestToTaskDto.mjs";

const putTaskAction = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.jsonp({ errors: errors.array() })
    } else {
        const incomingDto = RequestToTaskDto(req, res);
        const task = await TaskService.updateTask(incomingDto);
        res.jsonp(task);
    }
};

export default putTaskAction;