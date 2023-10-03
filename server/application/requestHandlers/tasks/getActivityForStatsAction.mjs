import { faker } from '@faker-js/faker';


const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
const options = {
    plugins: {
        title: {
            display: true,
            text: 'Chart.js Bar Chart - Stacked',
        },
    },
    responsive: true,
    scales: {
        x: {
            stacked: true,
        },
        y: {
            stacked: true,
        },
    },
};

const getActivityForStatsAction = (req, res) => {

    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
                backgroundColor: 'rgb(197, 125, 206)',
            },
            {
                label: 'Dataset 2',
                data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
                backgroundColor: `rgb(202, 249, 211)`
            },
            {
                label: 'Dataset 3',
                data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
                backgroundColor: `rgb(${faker.number.int({ min: 100, max: 255 })}, ${faker.number.int({ min: 100, max: 255 })}, ${faker.number.int({ min: 100, max: 255 })})`,
            },
        ],
    };

    res.jsonp({ data, options });
};

export default getActivityForStatsAction;
