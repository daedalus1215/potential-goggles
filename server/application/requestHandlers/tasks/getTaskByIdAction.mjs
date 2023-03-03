const TaskService = require('../../../domain/services/tasks/TaskService');

module.exports = async (req, res) => {
  if (!req?.params?.id) {
    res.jsonp({ error: 'Need Id' });
  }
  const task = await TaskService.fetchTaskById(req.params.id);
  res.jsonp(task);
};