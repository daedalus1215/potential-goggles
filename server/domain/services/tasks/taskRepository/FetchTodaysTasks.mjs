import TaskModel from "../../../../infrastructure/models/TaskModel.mjs";

const getDate = (date) => {
    return `${date.getUTCFullYear()}-0${date.getUTCMonth() + 1}-${date.getDate()}`;
}

export const FetchTodaysTasks = async () => {
    const today = getDate(new Date());
    const tasks = await TaskModel.find({
        '$where': `this.date.toJSON().slice(0, 10) == "${today}"`
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

    return aggActivities;
};

export default FetchTodaysTasks;