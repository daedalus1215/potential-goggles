import TaskModel from "../../../../infrastructure/models/TaskModel.mjs";

export const FetchTodaysTasks = async () => {
    const today = `${new Date().getUTCFullYear()}-0${new Date().getUTCMonth() + 1}-${new Date().getDate() - 1}`;
    console.log(today)
    const tasks = await TaskModel.find({ '$where': `this.date.toJSON().slice(0, 10) >= "${'2023-03-14'}"` }).sort('-_id');
    return tasks
        .map((task) => ({
            _id: task?._id ?? 'stubAnId',
            title: task?.title ?? 'no title',
            totalTimeToday: task.time
                ?.filter(t1 => t1?.date)
                .filter(ti => `${ti.date.getUTCFullYear()}-0${ti.date.getUTCMonth() + 1}-${ti.date.getDate() - 1}` == today)
                .map(t1 => t1.time)
                .reduce((t1, t2) => {
                    console.log('t1', t1);
                    console.log('t2', t2);
                    const time1 = t1
                    const time2 = t2
                    return time1 + time2;
                }, 0),    
            times: task.time
                .filter(t1 => t1?.date)
                .filter(ti => `${ti.date.getUTCFullYear()}-0${ti.date.getUTCMonth() + 1}-${ti.date.getDate() - 1}` == today)
        }));

};

export default FetchTodaysTasks;