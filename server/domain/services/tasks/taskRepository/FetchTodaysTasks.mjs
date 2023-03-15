import TaskModel from "../../../../infrastructure/models/TaskModel.mjs";

export const FetchTodaysTasks = async () => {
    const tasks = await TaskModel.find({ '$where': 'this.date.toJSON().slice(0, 10) == "2023-03-04"'}).sort('-_id');
    return tasks
        .map((task) => ({
            _id: task?._id ?? 'stubAnId',
            title: task?.title ?? 'no title'
        }));

};

export default FetchTodaysTasks;