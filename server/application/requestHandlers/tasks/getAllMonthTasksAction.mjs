import TaskService from "../../../domain/services/tasks/TaskService.mjs";

const getAllMonthTasksAction = async (req, res) => {
  const { tags } = req.query;
  const tasks = await TaskService.fetchAllMonthTasks(tags);
  res.jsonp(tasks);
};

export default getAllMonthTasksAction;