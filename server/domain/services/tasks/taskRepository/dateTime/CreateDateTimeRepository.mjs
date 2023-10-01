import TaskModel from "../../../../../infrastructure/models/TaskModel.mjs";
import minutesToMilliseconds from "../../../../../utils/millisecondConversions/minutesToMilliseconds.mjs";

const CreateDateTimeRepository = async (taskId) => {
    const task = await TaskModel.findOne({ _id: taskId });
    const { time } = task;
    time.push({
        date: new Date(),
        time: minutesToMilliseconds("00:00")
    });

    task.time = time;
    task.date = new Date();
    const updatedTask = await task.save();
    return updatedTask;
};

export default CreateDateTimeRepository;