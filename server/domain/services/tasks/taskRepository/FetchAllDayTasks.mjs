import TaskModel from "../../../../infrastructure/models/TaskModel.mjs";
import { getDate } from '../../../../utils/getDate.mjs'

export const FetchAllDayTasks = async () => {
    const tasks = await TaskModel.find();
    const results = {};
    tasks
        .filter(task => task?.date)
        .forEach(task => {
            task.time
                .filter(time => time?.date)
                .map(time => {
                    const theDate = getDate(time.date);
                    if (theDate === '2023-09-31') {
                        console.log('theDate is 09 - 31', time.date)
                    }
                    if (!results[theDate]) {
                        results[theDate] = { time: 0, titles: [] };
                    }

                    results[theDate].time += time.time;

                    const title = task?.title ?? 'no title';
                    if (results[theDate]?.titles.indexOf(title) === -1) {
                        results[theDate].titles.push(title);
                    }

                });
        });
    const newResults = [];
    const keys = Object.keys(results);

    for (let key of keys) {
        newResults.push({
            date: key,
            ...results[key]
        })
    }



    return newResults
        .sort((res, res2) => new Date(res2.date) - new Date(res.date))
        .slice(0, 365);
};

export default FetchAllDayTasks;