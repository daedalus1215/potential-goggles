import TaskModel from "../../../../../infrastructure/models/TaskModel.mjs";
import { filterOutTags } from "../../../../../utils/filterOutTags.mjs";
import { getMonthDate } from '../../../../../utils/getDate.mjs'

export const FetchMonthsTasks = async (tags) => {
    const today = getMonthDate(getDate());
    const tasks = await TaskModel.find({});
    const filtered = tasks.filter(task => getMonthDate(task.date) == today)
    const tasksFilteredByTags = filterOutTags(filtered, tags);

    const aggActivities = {
        activities: tasksFilteredByTags
            .map((task) => ({
                taskId: task?.taskId ?? 'stubAnId',
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

    return aggActivities;
};

export default FetchMonthsTasks;