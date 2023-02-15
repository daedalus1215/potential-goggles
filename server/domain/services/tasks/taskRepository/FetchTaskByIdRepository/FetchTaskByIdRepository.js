const TaskModel = require('../../../../../infrastructure/models/TaskModel');
const EntityToDto = require('./EntityToDto');

module.exports = async (taskId) => {
    const doc = await TaskModel.findById(taskId);
    return EntityToDto(doc);
};

