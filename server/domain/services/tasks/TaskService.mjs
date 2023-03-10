import CreateDateTimeRepository from "./taskRepository/dateTime/CreateDateTimeRepository.mjs";
import UpdateDateTimeRepository from "./taskRepository/dateTime/UpdateDateTimeRepository.mjs";
import FetchAllTasksRepository from "./taskRepository/FetchAllTasksRepository.mjs";
import FetchAllTaskTitlesRepository from "./taskRepository/FetchAllTaskTitlesRepository.mjs";
import FetchTaskByIdRepository from "./taskRepository/FetchTaskByIdRepository/FetchTaskByIdRepository.mjs";
import updateTask from "./taskRepository/updateTask/updateTask.mjs";

export const TaskService = {
  fetchAllTasks: () => FetchAllTasksRepository(),
  fetchTaskById: (taskId) => FetchTaskByIdRepository(taskId),
  updateTask: (dto) => updateTask(dto),
  updateDateTimeOfTask: (taskId, dateTime) => UpdateDateTimeRepository(taskId, dateTime),
  createDateTimeOfTask: (taskId) => CreateDateTimeRepository(taskId),
  fetchAllTaskTitles: () => FetchAllTaskTitlesRepository(),
};

export default TaskService;