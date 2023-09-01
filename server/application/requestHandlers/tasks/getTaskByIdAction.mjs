import TaskService from "../../../domain/services/tasks/TaskService.mjs";


const getTaskByIdAction = async (req, res) => {
  if (!req?.params?.id) {
    res.jsonp({ error: 'Need Id' });
  }
  const task = await TaskService.fetchTaskById(req.params.id);
  //@TODO: Absolutely remove me!
  setTimeout(() => {
    res.jsonp(task);
  }, 3000);
};

export default getTaskByIdAction;