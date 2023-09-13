import TaskService from "../../../domain/services/tasks/TaskService.mjs";

const getTaskByIdAction = async (req, res) => {
  if (!req?.params?.id) {
    return res.jsonp({ error: 'Need Id' });
  }
  const task = await TaskService.fetchTaskById(req.params.id);
  res.jsonp(task);
};

export default getTaskByIdAction;