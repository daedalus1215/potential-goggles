const Task = require('../../../../models/TaskModel');
const EntityToDto = require('./EntityToDto');

module.exports = async (taskId) => {
    const doc = await Task.findById(taskId);
    return EntityToDto(doc);
};

