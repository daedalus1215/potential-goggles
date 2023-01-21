const FetchAllTasksRepository = require('../../../infrastructure/repositories/tasks/Repositories/FetchAllTasksRepository');
const FetchTaskByIdRepository = require('../../../infrastructure/repositories/tasks/Repositories/FetchTaskByIdRepository/FetchTaskByIdRepository');
const UpdateDateTimeRepository = require('../../../infrastructure/repositories/tasks/Repositories/UpdateDateTimeRepository');
const updateTask = require('../../../infrastructure/repositories/tasks/Repositories/updateTask/updateTask');
 
const TaskService = {
  fetchAllTasks: () => FetchAllTasksRepository(),
  fetchTaskById: (taskId) => FetchTaskByIdRepository(taskId),
  updateTask: (dto, res) => updateTask(dto, res),
  updateDateTimeOfTask: (taskId, dateTime) => UpdateDateTimeRepository(taskId, dateTime),
};

module.exports = TaskService;
