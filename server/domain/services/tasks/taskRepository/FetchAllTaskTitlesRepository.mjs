import TaskModel from "../../../../infrastructure/models/TaskModel.mjs";

const FetchAllTaskTitlesRepository = async () => {
    const tasks = await TaskModel.find();
    return tasks
        .map((task) => ({
            _id: task?._id ?? 'stubAnId',
            title: task?.title ?? 'no title'
        }))
};


export default FetchAllTaskTitlesRepository;