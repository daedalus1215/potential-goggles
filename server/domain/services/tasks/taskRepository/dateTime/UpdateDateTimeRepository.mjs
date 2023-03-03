import TaskModel from "../../../../../infrastructure/models/TaskModel.mjs";
import minutesToMilliseconds from "../../../../../utils/minutesToMilliseconds.js";


const UpdateDateTimeRepository = async (taskId, dateTime) => {
    const task = await TaskModel.findOne({ _id: taskId });

    const dateTimes = task.time.map((dateTimeFromDb) => {
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

export default UpdateDateTimeRepository;