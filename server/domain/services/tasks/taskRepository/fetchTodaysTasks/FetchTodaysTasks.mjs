import TaskModel from "../../../../../infrastructure/models/TaskModel.mjs";
import { compareFormattedDate, getDate, parseDate } from '../../../../../utils/getDate.mjs'


const filterOutTags = (tasks, tagIds) => {
    if (tagIds) {
        return tasks.filter(task => {
            return !task.tags.find(tag => tag === tagIds)
        });
    }
    return tasks;
};

const getDateds = (reqDate) => {
    return (reqDate != null && reqDate != undefined && reqDate != "null")
        ? new Date(reqDate)
        : new Date();
}
/**
 * 
 * @param {string[]} tagIds 
 * @param {string} date format yyyy-MM-dd
 * @returns 
 */
export const FetchTodaysTasks = async (tagIds, reqDate) => {
    console.log('pre ', reqDate)
    const date = getDateds(reqDate);
    console.log('date1', date)
    const today = parseDate(date);
    const tasks = await TaskModel.find({});
    const newTasks = tasks
        .filter(task => {
            return task.time
                .filter(t1 => !!t1?.date)
                .find(t1 => compareFormattedDate(t1.date, today))
        });
    const filteredTasks = filterOutTags(newTasks, tagIds);
    
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
    // console.log('tasks', tasks)
    return aggActivities;
};

export default FetchTodaysTasks;