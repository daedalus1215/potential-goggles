import TaskService from "../../../domain/services/tasks/TaskService.mjs";

const getAllMonthTasksAction = async (req, res) => {
  const { includeTags, excludeTags } = req.query;
  const tasks = await TaskService.fetchAllMonthTasks(includeTags, excludeTags);
  res.jsonp(tasks);
};

export default getAllMonthTasksAction;