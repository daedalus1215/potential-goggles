import TaskService from "../../../domain/services/tasks/TaskService.mjs";

const getAllTasksAction = async (req, res) => {
  const tasks = await TaskService.fetchAllTasks();
  res.jsonp(tasks);
};

export default getAllTasksAction;