import TagService from "../../../domain/services/tags/TagService.mjs";
import { addTagByName } from "../../../domain/services/tags/tagRepository/addTagByName.mjs";
import TaskModel from "../../../infrastructure/mongo/models/TaskModel.mjs";
import hydrateAndResponse from "../../../utils/hydrators/hydrateAndResponse.mjs";

//@TODO: Do we need this? Do we not have this else where?
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

export const importAction = (req, res) => {
    const tasks = [...req.body];
    const tags = new Set(tasks.flatMap(task => task.tags));

    tasks.forEach(taskDto => assembleTask(taskDto).save(hydrateAndResponse));
    tags.forEach(tagName => addTagByName(tagName))

    res.jsonp({ ok: true });
};
