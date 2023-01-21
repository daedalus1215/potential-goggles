const Task = require('../../../models/Task');
const hydrate = require('../../../hydrators/hydrate');
const EntityToDto = require('./FetchTaskByIdRepository/EntityToDto');

module.exports = () => Task.find({}, hydrateTask).sort('-_id');

const hydrateTask = (err, doc) => {
    const tasks = hydrate(err, doc);
    if (tasks.error) {
        return tasks.error
    }
    const dtos = tasks.map(task => EntityToDto(task));
    return dtos;
}