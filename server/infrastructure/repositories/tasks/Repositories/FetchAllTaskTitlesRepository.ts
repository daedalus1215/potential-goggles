import { ModuleResolutionKind } from "typescript";
import { DateTimeDto, Task } from "../../../../interfaces";
import { TaskTitle } from "../../../../interfaces";

const TaskModel = require('../../../models/TaskModel');
const hydrate = require('../../../hydrators/hydrate');
const minutesToMilliseconds = require('../../../../utils/minutesToMilliseconds');

type Repository = () => Promise<TaskTitle[]>;

const FetchAllTaskTitlesRepository: Repository = async () => {

    const tasks = await TaskModel.find();
    
    return tasks.map((task: Task) => ({ _id: task?._id ?? 'some id', title: task?.title ?? 'no title' }))
};

export default FetchAllTaskTitlesRepository;

module.exports = FetchAllTaskTitlesRepository;