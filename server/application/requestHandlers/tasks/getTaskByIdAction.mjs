import TaskService from "../../../domain/services/tasks/TaskService.mjs";
import HttpError from "../../constants/HttpError.mjs";

const getTaskByIdAction = async (req, res, next) => {
  if (!req?.params?.id) {
    return res.jsonp({ error: 'Need Id' });
  }
  const task = await TaskService.fetchTaskById(req.params.id);
  if (task instanceof HttpError) {
    return next(task);
  }
  res.jsonp(task);
};

export default getTaskByIdAction;