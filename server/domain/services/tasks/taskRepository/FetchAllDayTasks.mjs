import TaskModel from "../../../../infrastructure/models/TaskModel.mjs";
import { filterOutTags } from "../../../../utils/filterOutTags.mjs";
import { formatDate } from '../../../../utils/getDate.mjs'

export const FetchAllDayTasks = async (tags) => {
    const tasks = await TaskModel.find();
    const filtered = tasks.filter(task => task?.date);
    const results = {};
    filterOutTags(filtered, tags)
        .forEach(task => {
            task.time
                .filter(time => time?.date)
                .map(time => {
                    const theDate = formatDate(time.date);
                    if (!results[theDate]) {
                        results[theDate] = { time: 0, titles: [] };
                    }

                    results[theDate].time += time.time;

                    // because we do not need to add the title more than once
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