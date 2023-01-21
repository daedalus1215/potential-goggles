const { validationResult } = require('express-validator');
const { PUT_TASK_BY_ID_RESPONSE_SUCCESS, PUT_TASK_BY_ID_RESPONSE_ERROR } = require('../reduxTypes');
const TaskService = require('../../../domain/services/tasks/TaskService');
const apiResponse = require('../apiResponse');
const RequestToTaskDto = require('./assemblers/RequestToTaskDto');

module.exports = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const response = apiResponse(res, PUT_TASK_BY_ID_RESPONSE_ERROR)
        response({ errors: errors.array() })
    } else {
        const response = apiResponse(res, PUT_TASK_BY_ID_RESPONSE_SUCCESS);
        const incomingDto = RequestToTaskDto(req, res);
        TaskService.updateTask(incomingDto, response);
    }
};