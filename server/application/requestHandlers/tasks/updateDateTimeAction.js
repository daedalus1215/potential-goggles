const apiResponse = require('../apiResponse');
const TaskService = require('../../../domain/services/tasks/TaskService');
const { UPDATE_DATE_TIME_RESPONSE } = require('../reduxTypes');




module.exports = (req, res) => {
    const responder = apiResponse(res, UPDATE_DATE_TIME_RESPONSE);

    const id = req.params.taskId;
    const dateTime = req.body;

    const updatedTaskWithDateTime = TaskService.updateDateTimeOfTask(id, dateTime);
    responder(updatedTaskWithDateTime);
};