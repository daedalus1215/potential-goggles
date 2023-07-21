import TaskService from "../../../domain/services/tasks/TaskService.mjs";

const getAllMonthTasksAction = async (req, res) => {
  const tasks = await TaskService.fetchAllMonthTasks();
  res.jsonp(tasks);
};

export default getAllMonthTasksAction;