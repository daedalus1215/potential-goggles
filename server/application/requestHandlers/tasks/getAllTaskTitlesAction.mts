import { Response, TaskTitle } from "../../../interfaces";

import TaskService from '../../../domain/services/tasks/TaskService';

type Action = (req: any, res: Response<TaskTitle[]>) => void;

const getAllTaskTitlesAction: Action = async (req, res) => {
  const task = await TaskService.fetchAllTaskTitles();
  res.jsonp(task);
};

module.exports = getAllTaskTitlesAction;