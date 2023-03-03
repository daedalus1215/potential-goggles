import { validationResult } from "express-validator";
import TaskService from "../../../domain/services/tasks/TaskService.mjs";

const putTaskAction = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const response = apiResponse(res, PUT_TASK_BY_ID_RESPONSE_ERROR)
        Response({ errors: errors.array() })
    } else {
        const response = apiResponse(res, PUT_TASK_BY_ID_RESPONSE_SUCCESS);
        const incomingDto = RequestToTaskDto(req, res);
        TaskService.updateTask(incomingDto, response);
    }
};

export default putTaskAction;