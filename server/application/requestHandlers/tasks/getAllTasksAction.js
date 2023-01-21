const { FETCH_ALL_TASKS_RESPONSE, FETCH_ALL_TASKS_RESPONSE_ERROR } = require('../reduxTypes');
const TaskService = require('../../../domain/services/tasks/TaskService');
const apiResponse = require('../apiResponse');

module.exports = async (req, res) => {
  const tasks = await TaskService.fetchAllTasks();
  const response = tasks.error
    ? apiResponse(res, FETCH_ALL_TASKS_RESPONSE_ERROR)
    : apiResponse(res, FETCH_ALL_TASKS_RESPONSE);
  response(tasks);
};