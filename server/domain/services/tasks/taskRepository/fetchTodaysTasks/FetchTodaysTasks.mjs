import TaskModel from "../../../../../infrastructure/models/TaskModel.mjs";
import { compareFormattedDate, parseDate } from '../../../../../utils/getDate.mjs'

/**
 * 
 * @param {string[]} tagIds 
 * @returns 
 */
export const FetchTodaysTasks = async (tagIds) => {
    const today = parseDate(new Date());
    const tasks = await TaskModel.find({});
    const newTasks = tasks.filter(task => {
        return task.time
            .filter(t1 => !!t1?.date)
            .find(t1 => compareFormattedDate(t1.date, today))
    })

    const aggActivities = {
        activities: newTasks
            .map((task) => ({
                _id: task?._id ?? 'stubAnId',
                title: task?.title ?? 'no title',
                date: task.date,
                totalTimeToday: task.time
                    .filter(t1 => !!t1?.date)
                    .filter(t1 => compareFormattedDate(t1.date, today))
                    .map(t1 => t1.time)
                    .reduce((t1, t2) => t1 + t2, 0),
                times: task.time
                    .filter(t1 => !!t1?.date)
                    .filter(t1 => compareFormattedDate(t1.date, today))
            }))
    };
    aggActivities.total = aggActivities.activities
        .map(activity => activity.totalTimeToday)
        .reduce((a1, a2) => a1 + a2, 0);
    // console.log('tasks', tasks)
    return aggActivities;
};

export default FetchTodaysTasks;