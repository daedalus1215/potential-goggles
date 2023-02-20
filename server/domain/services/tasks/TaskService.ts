import { DateTimeDto, Task } from "../../../interfaces";
import { TaskTitle } from "../../../interfaces";

const FetchTaskByIdRepository = require('./taskRepository/FetchTaskByIdRepository/FetchTaskByIdRepository');
const FetchAllTasksRepository = require('./taskRepository/FetchAllTasksRepository');
const UpdateDateTimeRepository = require('./taskRepository/dateTime/UpdateDateTimeRepository');
const CreateDateTimeRepository = require('./taskRepository/dateTime/CreateDateTimeRepository');
const FetchAllTaskTitlesRepository = require('./taskRepository/FetchAllTaskTitlesRepository');
const updateTask = require('./taskRepository/updateTask/updateTask');

export const TaskService = {
  fetchAllTasks: () => FetchAllTasksRepository(),
  fetchTaskById: (taskId: string) => FetchTaskByIdRepository(taskId),
  updateTask: (dto: any, res: any) => updateTask(dto, res),
  updateDateTimeOfTask: (taskId: string, dateTime: DateTimeDto) => UpdateDateTimeRepository(taskId, dateTime),
  createDateTimeOfTask: (taskId: string) => CreateDateTimeRepository(taskId),
  fetchAllTaskTitles: () => FetchAllTaskTitlesRepository(),
};

export default TaskService;

module.exports = TaskService;