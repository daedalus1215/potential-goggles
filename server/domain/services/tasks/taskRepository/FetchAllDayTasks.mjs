import TaskModel from "../../../../infrastructure/models/TaskModel.mjs";

const getDate = (date) => {
    return `${date.getUTCFullYear()}-0${date.getUTCMonth() + 1}-${date.getDate()}`;
}

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

    return newResults.sort((res, res2) => res.date - res2.date);
};

export default FetchAllDayTasks;