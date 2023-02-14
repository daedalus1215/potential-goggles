import { ModuleResolutionKind } from "typescript";
import { DateTimeDto, Task } from "../../../../interfaces";
import { DateTime } from "../../../../interfaces";

const TaskModel = require('../../../models/TaskModel');
const hydrate = require('../../../hydrators/hydrate');
const minutesToMilliseconds = require('../../../../utils/minutesToMilliseconds');

type Repository = (taskId:string, dateTime: DateTimeDto) => Promise<Task>;

const UpdateDateTimeRepository:Repository = async (taskId, dateTime) => {
    const task = await TaskModel.findOne({ _id: taskId });

    const dateTimes = task.time.map((dateTimeFromDb:DateTime) => {
        if (dateTimeFromDb._id == dateTime.id) {
            return {
                _id: dateTimeFromDb._id,
                date: dateTime.date,
                time: minutesToMilliseconds(dateTime.time),
            };
        } else {
            return dateTimeFromDb;
        }
    });

    task.time = dateTimes;
    const updatedTask = await task.save();
    return updatedTask;
};

module.exports = UpdateDateTimeRepository;