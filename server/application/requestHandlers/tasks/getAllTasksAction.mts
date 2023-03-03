import  TaskService from '../../../domain/services/tasks/TaskService';

module.exports = async (req:any, res:any) => {
  const tasks = await TaskService.fetchAllTasks();
  res.jsonp(tasks);
};