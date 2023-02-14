const TaskService = require('../../../domain/services/tasks/TaskService');
const apiResponse = require('../apiResponse');
const { FETCH_TASK_BY_ID_RESPONSE_SUCCESS } = require('../reduxTypes'); 

module.exports = async (req, res) => {
  console.log('we here')
  console.log('req', req?.params)
  if(req?.params?.id === 'undefined') {
    res.jsonp({error: 'Need Id'});
  }
  const task = await TaskService.fetchTaskById(req.params.id);
  res.jsonp(task);
};