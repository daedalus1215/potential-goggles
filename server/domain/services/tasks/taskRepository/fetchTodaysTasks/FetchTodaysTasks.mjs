import TaskModel from "../../../../../infrastructure/models/TaskModel.mjs";
import { formatDate, getDate, getDateMoment } from '../../../../../utils/getDate.mjs'

/**
 * 
 * @param {string[]} tagIds 
 * @returns 
 */
export const FetchTodaysTasks = async (tagIds) => {
    const today = getDate(new Date('2023-09-11'));
    const exp = /\d{4}-\d{2}-\d{2}/;
    const yes = today.match(exp)[0];
    console.log('yes', yes)
    const tasks = await TaskModel.find({});
    // const filtered = tasks
    //     .filter(task => {
    //         return getDate(task.date).match(exp)[0] == yes})
    // .filter(task => task.tags.name.includes())
    const newTasks = tasks.filter(task => {
        return task.time.filter(t => t?.date)
            .find(time => {
                const d = time?.date;
                if (d === null || d === undefined) return false;
                const e = formatDate(d).match(exp)[0];
                console.log('filter', e)
                return e === yes
            })
    })
    console.log('newTasks', newTasks);

    const aggActivities = {
        activities: newTasks
            .map((task) => ({
                _id: task?._id ?? 'stubAnId',
                title: task?.title ?? 'no title',
                date: task.date,
                totalTimeToday: task.time
                    .filter(t1 => !!t1?.date)
                    .filter(t1 => {
                        const d = formatDate(t1.date).match(exp)[0];
                        console.log('d', d)
                        console.log('d - time will be', d.time)
                        return d == yes
                    })
                    .map(t1 => {
                        console.log('getting mapped', t1.time)
                        return t1.time
                    })
                    .reduce((t1, t2) => t1 + t2, 0),
                times: task.time
                    .filter(t1 => t1?.date)
                    .filter(t1 => formatDate(t1.date).match(exp)[0] == yes)
            }))
    };
    aggActivities.total = aggActivities.activities
        .map(activity => activity.totalTimeToday)
        .reduce((a1, a2) => a1 + a2, 0);
    // console.log('tasks', tasks)
    return aggActivities;
};

export default FetchTodaysTasks;