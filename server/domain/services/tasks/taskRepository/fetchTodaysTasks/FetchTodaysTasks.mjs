import TaskModel from "../../../../../infrastructure/models/TaskModel.mjs";
import { exclusivelyFilter } from "../../../../../utils/exclusivelyFilter.mjs";
import { compareFormattedDate, getDateInISOFormat, parseDate } from '../../../../../utils/getDate.mjs'
import { inclusivelyFilter } from "../../../../../utils/inclusivelyFilter.mjs";

/**
 * 
 * @param {string[]} includeTags 
 * @param {string[]} excludeTags 
 * @param {string} date format yyyy-MM-dd
 * @returns 
 */
export const FetchTodaysTasks = async (includeTags, excludeTags, reqDate) => {
    const tasks = await TaskModel.find({});
    const date = getDateInISOFormat(reqDate);
    const today = parseDate(date);
    const newTasks = tasks.filter(task => task.time
        .filter(t1 => !!t1?.date)
        .find(t1 => compareFormattedDate(t1.date, today)));

    const aggActivities = {
        activities: inclusivelyFilter(exclusivelyFilter(newTasks, excludeTags), includeTags)
            .map((task) => ({
                taskId: task?.taskId ?? 'stubAnId',
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