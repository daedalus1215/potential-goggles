import TagService from "../../../domain/services/tags/TagService.mjs";
import TaskModel from "../../../infrastructure/models/TaskModel.mjs";
import hydrateAndResponse from "../../../utils/hydrators/hydrateAndResponse.mjs";

const doesTagExist = (tag) => {
    if (TagService.fetchTagById(tag._id, getTag).error) {
        return false;
    }

    return true;
};

const getTag = (items) => items.items;


const assembleTask = (task) => {
    const saveableTask = new TaskModel();

    saveableTask.toObject();
    saveableTask.time = task.time;
    saveableTask.contractId = task.contractId;
    saveableTask.description = task.description;
    saveableTask.date = task.date;
    saveableTask.tags = task.tags;
    saveableTask.title = task?.title
        ?? (task?.description
            ? striptags(doc.description.split("</p>")[0]?.split("<p>")[1])
            : '')

    return saveableTask;
};


export default (req, res) => {
    [...req.body].map(taskDto => {
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
