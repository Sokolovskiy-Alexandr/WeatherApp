import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,

} from 'chart.js';
import { Line } from 'react-chartjs-2';

import type { ChartData, ChartOptions } from 'chart.js';

import { IHour } from "../types/IHour";
import { useAppSelector } from "../hooks/redux";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip
);

interface LineProps {
    options: ChartOptions<'line'>;
    data: ChartData<'line'>;
}

type ChartAppTypeProps = {
    hourly?: IHour[];
}
const ChartApp: React.FC<ChartAppTypeProps> = ({ hourly }) => {
    const units = useAppSelector(state => state.main.units);
    const deg = units === 'metric' ? '°C' : '°F';
    let labels, temp;
    if (hourly) {
        labels = hourly.map(h => h.title);
        temp = hourly.map(h => h.temp);
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: false,
            title: {
                display: true,
                text: 'Forecast temperature for 8 hours',
            },
        },
        scales: {
            y: {
                display: true,
                title: {
                    display: true,
                    text: `Temperature,${deg}`
                },

            },

        }
    } as ChartOptions<'line'>;


    const data = {
        labels: labels,
        datasets: [

            {
                label: 'Temp',
                data: temp,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    } as ChartData<'line'>;

    return <Line options={options} data={data}/>;
}

export default ChartApp;