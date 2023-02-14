import { DateTimeDto, Task } from "../../../interfaces";
import { TaskTitle } from "../../../interfaces";

const FetchAllTasksRepository = require('../../../infrastructure/repositories/tasks/Repositories/FetchAllTasksRepository');
const FetchTaskByIdRepository = require('../../../infrastructure/repositories/tasks/Repositories/FetchTaskByIdRepository/FetchTaskByIdRepository');
const UpdateDateTimeRepository = require('../../../infrastructure/repositories/tasks/Repositories/UpdateDateTimeRepository');
const FetchAllTaskTitlesRepository = require('../../../infrastructure/repositories/tasks/Repositories/FetchAllTaskTitlesRepository');
const updateTask = require('../../../infrastructure/repositories/tasks/Repositories/updateTask/updateTask');

export const TaskService = {
  fetchAllTasks: () => FetchAllTasksRepository(),
  fetchTaskById: (taskId: string) => FetchTaskByIdRepository(taskId),
  updateTask: (dto: any, res: any) => updateTask(dto, res),
  updateDateTimeOfTask: (taskId: string, dateTime: DateTimeDto) => UpdateDateTimeRepository(taskId, dateTime),
  fetchAllTaskTitles: () => FetchAllTaskTitlesRepository(),
};


export default TaskService;

module.exports = TaskService;