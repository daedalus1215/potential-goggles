import CreateDateTimeRepository from "./taskRepository/dateTime/CreateDateTimeRepository.mjs";
import UpdateDateTimeRepository from "./taskRepository/dateTime/UpdateDateTimeRepository.mjs";
import fetchAllMonthTasks from "./taskRepository/FetchAllMonthTasks.mjs";
import FetchAllTasksRepository from "./taskRepository/FetchAllTasksRepository.mjs";
import FetchAllTaskTitlesRepository from "./taskRepository/FetchAllTaskTitlesRepository.mjs";
import FetchStatsForStackForRangeOfDates from "./taskRepository/FetchStatsForStackForRangeOfDates.mjs";
import FetchTaskByIdRepository from "./taskRepository/FetchTaskByIdRepository/FetchTaskByIdRepository.mjs";
import updateTask from "./taskRepository/updateTask/updateTask.mjs";

export const TaskService = {
  fetchAllTasks: (tags) => FetchAllTasksRepository(tags),
  fetchAllMonthTasks: (includeTags, excludeTags) => fetchAllMonthTasks(includeTags, excludeTags),
  fetchTaskById: (taskId) => FetchTaskByIdRepository(taskId),
  updateTask: (dto) => updateTask(dto),
  updateDateTimeOfTask: (taskId, dateTime) => UpdateDateTimeRepository(taskId, dateTime),
  createDateTimeOfTask: (taskId) => CreateDateTimeRepository(taskId),
  fetchAllTaskTitles: () => FetchAllTaskTitlesRepository(),
  fetchStackGraph: (date, days, predicates) => FetchStatsForStackForRangeOfDates(date, days, predicates),
};

export default TaskService;