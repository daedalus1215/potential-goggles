import TaskModel from "../../../../../infrastructure/models/TaskModel.mjs";
import { getMonthDate } from '../../../../../utils/getDate.mjs'

export const FetchMonthsTasks = async () => {
    const today = getMonthDate(new Date());
    const tasks = await TaskModel.find({});
    const filtered = tasks.filter(task => getMonthDate(task.date) == today)
        
    const aggActivities = {
        activities: filtered
            .map((task) => ({
                _id: task?._id ?? 'stubAnId',
                title: task?.title ?? 'no title',
                date: task.date,
                totalTimeToday: task.time
                    .filter(t1 => t1?.date)
                    .filter(t1 => getMonthDate(t1.date) == today)
                    .map(t1 => t1.time)
                    .reduce((t1, t2) => t1 + t2, 0),
                times: task.time
                    .filter(t1 => t1?.date)
                    .filter(t1 => getMonthDate(t1.date) == today)
            }))
    };
    aggActivities.total = aggActivities.activities
        .map(activity => activity.totalTimeToday)
        .reduce((a1, a2) => a1 + a2, 0);
    // console.log('tasks', tasks)
    return aggActivities;
};

export default FetchMonthsTasks;