import TaskService from "../../../domain/services/tasks/TaskService.mjs";

const getAllTasksAction = async (req, res) => {
  console.log('yes')
  const tasks = await TaskService.fetchAllTasks();
  res.jsonp(tasks);
};

export default getAllTasksAction;