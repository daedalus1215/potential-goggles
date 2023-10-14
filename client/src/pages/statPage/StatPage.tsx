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
    ChartOptions,
    ChartData,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useLoaderData } from 'react-router-dom';

const StatPage: React.FC = () => {
    const remoteData = useLoaderData() as any;
    return <>
        {remoteData?.weekStack?.data && <Bar options={remoteData.weekStack.options} data={remoteData.weekStack.data} />}
        {remoteData?.monthStack?.data && <Bar options={remoteData.monthStack.options} data={remoteData.monthStack.data} />}
    </>
}

export default StatPage;