import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

import type { ChartData, ChartOptions } from "chart.js";

import { IHour } from "../types/IHour";
import { useAppSelector } from "../hooks/redux";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip);

type ChartAppTypeProps = {
  hourly?: IHour[];
};
const ChartApp: React.FC<ChartAppTypeProps> = ({ hourly }) => {
  const units = useAppSelector((state) => state.main.units);
  const deg = units === "metric" ? "°C" : "°F";
  let labels;
  let temp;
  if (hourly) {
    labels = hourly.map((h) => h.title);
    temp = hourly.map((h) => h.temp);
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: false,
      title: {
        color: "var(--chart-text-color)",
        display: true,
        text: "Forecast temperature for 8 hours",
      },
    },
    scales: {
      x: {
        ticks: {
          color: "var(--chart-text-color)",
        },
      },
      y: {
        ticks: {
          color: "var(--chart-text-color)",
        },

        display: true,
        title: {
          color: "var(--chart-text-color)",
          display: true,
          text: `Temperature,${deg}`,
        },
      },
    },
  } as ChartOptions<"line">;

  const data = {
    labels,
    datasets: [
      {
        label: "Temp",
        data: temp,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  } as ChartData<"line">;

  return <Line options={options} data={data} />;
};

export default ChartApp;
