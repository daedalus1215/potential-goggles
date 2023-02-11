const TaskService = require('../../../domain/services/tasks/TaskService');

module.exports = (req, res) => {
    const id = req.params.taskId;
    const dateTime = req.body;
    const updatedTaskWithDateTime = TaskService.updateDateTimeOfTask(id, dateTime);
    res.jsonp(updatedTaskWithDateTime);
};