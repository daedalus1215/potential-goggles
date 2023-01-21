const Task = require("../../../infrastructure/models/Task");
const TagService = require("../../../domain/services/tags/TagService");
const hydrateAndResponse = require("../../../infrastructure/hydrators/hydrateAndResponse");


const doesTagExist = (tag) => {
    if (TagService.fetchTagById(tag._id, getTag).error) {
        return false;
    }

    return true;
};

const getTag = (items) => items.items;


const assembleTask = (task) => {
    const saveableTask = new Task();

    saveableTask.toObject();
    saveableTask.time = task.time;
    saveableTask.contractId = task.contractId;
    saveableTask.description = task.description;
    saveableTask.date = task.date;
    saveableTask.tags = task.tags;

    return saveableTask;
};


module.exports = (req, res) => {
    [...req.body.WorkUnit.tasks].map(taskDto => {
        taskDto?.tags.map(tag => {
            if (!doesTagExist(tag)) {
                TagService.addTag(tag, getTag);
            }
        });

        const saveableTask = assembleTask(taskDto);
        return saveableTask.save(hydrateAndResponse);
    });

    res.jsonp({ ok: true });
};
