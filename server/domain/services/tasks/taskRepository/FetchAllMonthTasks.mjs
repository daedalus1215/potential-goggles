import TaskModel from "../../../../infrastructure/models/TaskModel.mjs";
import { inclusivelyFilter } from "../../../../utils/inclusivelyFilter.mjs";
import { exclusivelyFilter } from "../../../../utils/exclusivelyFilter.mjs";
import { formatMonth } from '../../../../utils/getDate.mjs'
import EntityToDto from "./FetchTaskByIdRepository/EntityToDto.mjs";

export const fetchAllMonthTasks = async (includeTags, excludeTags) => {
    const tasks = await TaskModel.find().map(task => EntityToDto(task));
    const results = {};
    const tagsWithoutExcluded = exclusivelyFilter(tasks.filter(task => task?.date), excludeTags);
    const includedAndExcludedTags = inclusivelyFilter(tagsWithoutExcluded, includeTags);

    includedAndExcludedTags.forEach(task => {
        task.time
            .filter(time => time?.date)
            .map(time => {
                const theDate = formatMonth(time.date);

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
        .sort((res, res2) => new Date(res2.date) - new Date(res.date));
};

export default fetchAllMonthTasks;