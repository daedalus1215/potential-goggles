import TaskModel from "../../../../../infrastructure/models/TaskModel.mjs";
import { filterOutTags } from "../../../../../utils/filterOutTags.mjs";
import { compareFormattedDate, getDateInISOFormat, parseDate } from '../../../../../utils/getDate.mjs'

/**
 * 
 * @param {string[]} tagNames 
 * @param {string} date format yyyy-MM-dd
 * @returns 
 */
export const FetchTodaysTasks = async (tagNames, reqDate) => {
    const tasks = await TaskModel.find({});
    const date = getDateInISOFormat(reqDate);
    const today = parseDate(date);
    const newTasks = tasks.filter(task => task.time
        .filter(t1 => !!t1?.date)
        .find(t1 => compareFormattedDate(t1.date, today)));
    const filteredTasks = filterOutTags(newTasks, tagNames);

    const aggActivities = {
        activities: filteredTasks
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
    return aggActivities;
};

export default FetchTodaysTasks;