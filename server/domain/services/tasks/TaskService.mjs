import CreateDateTimeRepository from "./taskRepository/dateTime/CreateDateTimeRepository.mjs";
import UpdateDateTimeRepository from "./taskRepository/dateTime/UpdateDateTimeRepository.mjs";
import FetchAllTaskTitlesRepository from "./taskRepository/FetchAllTaskTitlesRepository.mjs";
import FetchTaskByIdRepository from "./taskRepository/FetchTaskByIdRepository/FetchTaskByIdRepository.mjs";
import updateTask from "./taskRepository/updateTask/updateTask.mjs";

export const TaskService = {
  fetchAllTasks: () => FetchAllTaskTitlesRepository(),
  fetchTaskById: (taskId) => FetchTaskByIdRepository(taskId),
  updateTask: (dto, res) => updateTask(dto, res),
  updateDateTimeOfTask: (taskId, dateTime) => UpdateDateTimeRepository(taskId, dateTime),
  createDateTimeOfTask: (taskId) => CreateDateTimeRepository(taskId),
  fetchAllTaskTitles: () => FetchAllTaskTitlesRepository(),
};

export default TaskService;