import TaskModel from "../../../../infrastructure/models/TaskModel.mjs";
import { getDate } from '../../../../utils/getDate.mjs'

export const FetchTodaysTasks = async () => {
    const today = getDate(new Date());
    console.log('today', today)
    const tasks = await TaskModel.find({
        '$where': `this.date.toJSON().slice(0, 10) >= "${today}"`
    }
    ).sort('-_id');
    const aggActivities = {
        activities: tasks
            .map((task) => ({
                _id: task?._id ?? 'stubAnId',
                title: task?.title ?? 'no title',
                date: task.date,
                totalTimeToday: task.time
                    .filter(t1 => t1?.date)
                    .filter(t1 => getDate(t1.date) == today)
                    .map(t1 => t1.time)
                    .reduce((t1, t2) => t1 + t2, 0),
                times: task.time
                    .filter(t1 => t1?.date)
                    .filter(t1 => getDate(t1.date) == today)
            }))
    };
    aggActivities.total = aggActivities.activities
        .map(activity => activity.totalTimeToday)
        .reduce((a1, a2) => a1 + a2, 0);
    // console.log('tasks', tasks)
    return aggActivities;
};

export default FetchTodaysTasks;