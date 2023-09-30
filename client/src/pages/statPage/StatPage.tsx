import React from 'react';
import 'chart.js/auto';

import { Chart } from 'react-chartjs-2';

const StatPage: React.FC = () => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Chart.js Bar Chart',
            },
        },
    };

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: labels.map(() => 100),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Dataset 2',
                data: labels.map(() => 1090),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    return <div>
        <Chart type='line' data={data} />
    </div>
}

export default StatPage;