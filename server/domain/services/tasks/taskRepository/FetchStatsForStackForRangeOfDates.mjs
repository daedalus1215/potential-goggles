import { faker } from '@faker-js/faker';
import { formatDate, getRangeOfDates } from "../../../../utils/getDate.mjs";
import { getTitle } from "../../../../utils/getTitle.mjs";
import { getTaskBasedOnTags } from '../../../../infrastructure/getTaskBasedOnTags.mjs';

export const FetchStatsForStackForRangeOfDates = async (date, days, predicates) => {
    const dates = getRangeOfDates(date, days);
    const tasks = await getTaskBasedOnTags(predicates);
    let datasets = [];
    for (let task of tasks) {
        const dataset = {
            label: getTitle(task),
            data: Array(days).fill(0),
            backgroundColor: `rgb(${faker.number.int({ min: 100, max: 255 })}, ${faker.number.int({ min: 100, max: 255 })}, ${faker.number.int({ min: 100, max: 255 })})`
        };

        for (let time of task.time) {
            const currentDate = formatDate(time.date);
            if (currentDate === null || currentDate < dates[dates.length - 1]) {
                continue;
            }

            let index = dates.findIndex(item => {
                return item === currentDate;
            });
            if (index !== -1) {
                if (dataset.data[index] >= 0) {
                    dataset.data[index] = dataset.data[index] + (time?.time / 1000 / 60 ?? 0)
                } else {
                    dataset.data[index] = (time?.time / 1000 / 60 ?? 0)
                }
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
                    "text": `Stacked Activity over ${days} days`
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

export default FetchStatsForStackForRangeOfDates;
