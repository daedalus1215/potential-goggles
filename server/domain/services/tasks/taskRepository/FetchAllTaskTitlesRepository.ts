import { Task, TaskTitle } from "../../../../interfaces";
const TaskModel = require('../../../../infrastructure/models/TaskModel');


type Repository = () => Promise<TaskTitle[]>;

const FetchAllTaskTitlesRepository: Repository = async () => {

    const tasks = await TaskModel.find();

    return tasks.map((task: Task) => ({ _id: task?._id ?? 'some id', title: task?.title ?? 'no title' }))
};

export default FetchAllTaskTitlesRepository;

module.exports = FetchAllTaskTitlesRepository;