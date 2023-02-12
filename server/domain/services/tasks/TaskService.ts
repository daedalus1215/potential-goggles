import { DateTimeDto } from "../../../dist/interfaces";

const FetchAllTasksRepository = require('../../../infrastructure/repositories/tasks/Repositories/FetchAllTasksRepository');
const FetchTaskByIdRepository = require('../../../infrastructure/repositories/tasks/Repositories/FetchTaskByIdRepository/FetchTaskByIdRepository');
const UpdateDateTimeRepository = require('../../../infrastructure/repositories/tasks/Repositories/UpdateDateTimeRepository');
const updateTask = require('../../../infrastructure/repositories/tasks/Repositories/updateTask/updateTask');

const TaskService = {
  fetchAllTasks: () => FetchAllTasksRepository(),
  fetchTaskById: (taskId:any) => FetchTaskByIdRepository(taskId),
  updateTask: (dto:any, res:any) => updateTask(dto, res),
  updateDateTimeOfTask: (taskId: string, dateTime: DateTimeDto) => UpdateDateTimeRepository(taskId, dateTime),
};

module.exports = TaskService;
