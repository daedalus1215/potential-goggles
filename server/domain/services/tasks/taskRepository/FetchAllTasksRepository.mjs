import { Task } from "../../../../interfaces";

const hydrate = require('../../../../infrastructure/hydrators/hydrate');
const TaskModel = require('../../../../infrastructure/models/TaskModel');
const EntityToDto = require('./FetchTaskByIdRepository/EntityToDto.mjs');

export default () => TaskModel.find({}, hydrateTask).sort('-_id');

const hydrateTask = (err: any, doc:any) => {
    const tasks = hydrate(err, doc);
    if (tasks.error) {
        return tasks.error
    }
    const dtos = tasks.map((task: Task) => EntityToDto(task));
    return dtos;
}