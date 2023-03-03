import TaskService from '../../../domain/services/tasks/TaskService.mjs';

// type Action = (req: any, res: Response<TaskTitle[]>) => void;

const getAllTaskTitlesAction = async (req, res) => {
  const task = await TaskService.fetchAllTaskTitles();
  res.jsonp(task);
};

export default getAllTaskTitlesAction;