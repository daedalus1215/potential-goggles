import { faker } from '@faker-js/faker';
import TaskModel from "../../../../infrastructure/models/TaskModel.mjs";
import { formatDate, getDatesOfPastWeek } from "../../../../utils/getDate.mjs";
import { getTitle } from "../../../../utils/getTitle.mjs";

export const FetchWeeksTaskForStats = (date) => {
    const dates = getDatesOfPastWeek(date);
    console.log('dateas', dates);
    const tasks = TaskModel.find();
    let datasets = [];
    for (let task of tasks) {
        console.log('tasks', task)
        const dataset = {
            label: getTitle(task),
            data: [0, 0, 0, 0, 0, 0, 0],
            backgroundColor: `rgb(${faker.number.int({ min: 100, max: 255 })}, ${faker.number.int({ min: 100, max: 255 })}, ${faker.number.int({ min: 100, max: 255 })})`
        };

        for (let time of task.time) {
            const currentDate = formatDate(time.date);
            console.log('currentDate', currentDate);
            let index = dates.findIndex(item => {
                return item === currentDate;
            });
            console.log('index', index)
            if (index !== -1) {
                dataset.data[index] += time.time
            }
        }

        if (dataset.data.find(data => data > 0)) {
            datasets.push(dataset);
        }
    }

    return {
        data: {
            labels: dates,
            datasets
        },
        options: {
            "plugins": {
                "title": {
                    "display": true,
                    "text": "Chart.js Bar Chart - Stacked"
                }
            },
            "responsive": true,
            "scales": {
                "x": {
                    "stacked": true
                },
                "y": {
                    "stacked": true
                }
            }
        }
    }
};

export default FetchWeeksTaskForStats;
