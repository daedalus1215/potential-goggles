const hydrate = require('../../../../infrastructure/hydrators/hydrate');
const TaskModel = require('../../../../infrastructure/models/TaskModel');
const EntityToDto = require('./FetchTaskByIdRepository/EntityToDto');

module.exports = () => TaskModel.find({}, hydrateTask).sort('-_id');

const hydrateTask = (err, doc) => {
    const tasks = hydrate(err, doc);
    if (tasks.error) {
        return tasks.error
    }
    const dtos = tasks.map(task => EntityToDto(task));
    return dtos;
}