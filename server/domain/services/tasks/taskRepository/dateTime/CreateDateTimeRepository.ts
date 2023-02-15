import { Task } from "../../../../../interfaces";
const TaskModel = require('../../../../../infrastructure/models/TaskModel');
const minutesToMilliseconds = require('../../../../../utils/minutesToMilliseconds');

type Repository = (taskId: string) => Promise<Task>;

const CreateDateTimeRepository: Repository = async (taskId) => {
    const task = await TaskModel.findOne({ _id: taskId });
    const { time } = task;
    time.push({
        date: new Date(),
        time: minutesToMilliseconds("00:00")
    });

    task.time = time;
    const updatedTask = await task.save();
    return updatedTask;
};

module.exports = CreateDateTimeRepository;