import TaskModel from "../../../../../infrastructure/models/TaskModel.mjs";
import minutesToMilliseconds from "../../../../../utils/millisecondConversions/minutesToMilliseconds.mjs";


const UpdateDateTimeRepository = async (taskId, dateTime) => {
    const task = await TaskModel.findOne({ taskId: taskId });

    const dateTimes = task.time.map((dateTimeFromDb) => {
        if (dateTimeFromDb.taskId == dateTime.id) {
            return {
                taskId: dateTimeFromDb.taskId,
                date: dateTime.date,
                time: minutesToMilliseconds(dateTime.time),
            };
        } else {
            return dateTimeFromDb;
        }
    });

    task.time = dateTimes;
    task.date = dateTime.date;
    const updatedTask = await task.save();
    return updatedTask;
};

export default UpdateDateTimeRepository;