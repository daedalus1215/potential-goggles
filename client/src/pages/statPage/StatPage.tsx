import React from 'react';
import 'chart.js/auto';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useLoaderData } from 'react-router-dom';

const StatPage: React.FC = () => {
    const remoteData = useLoaderData() as unknown;
    return <>
        {remoteData && <Bar options={remoteData.options} data={remoteData.data} />}
    </>
}

export default StatPage;