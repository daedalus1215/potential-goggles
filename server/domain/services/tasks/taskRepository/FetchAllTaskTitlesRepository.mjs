import TaskModel from "../../../../infrastructure/mongo/models/TaskModel.mjs";
import { truncateString } from "../../../../utils/truncateString.mjs";

const FetchAllTaskTitlesRepository = async (title) => {
    const tasks = await TaskModel.find();
    tasks.sort((a, b) => b.date - a.date); // Sort tasks by date in descending order
    const formattedName = title?.toLowerCase();
    return tasks
        .filter((task) => {
            if (title) {
                return task?.title?.toLowerCase().includes(formattedName) ?? false;
            }

            return true;
        })
        .map((task) => ({
            _id: task?._id ?? 'stubAnId',
            title: (task.title !== undefined) ? truncateString(task.title, 21) : 'no title'
        }));

};


export default FetchAllTaskTitlesRepository;