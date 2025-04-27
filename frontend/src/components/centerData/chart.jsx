import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import "../../index.css";

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler
);

export default function BatteryGauge({ value }) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-4 w-full max-w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
          Battery
        </span>
        <span className="text-sm font-semibold text-gray-900 dark:text-white">
          {value}%
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
        <div
          className="bg-indigo-600 h-4 rounded-full transition-all duration-500"
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
}

// DiskDonutChart: used vs free
function DiskDonutChart({ used, total }) {
  const data = {
    labels: ["Used", "Free"],
    datasets: [
      {
        data: [used, total - used],
        backgroundColor: [
          "rgba(16, 185, 129, 0.8)",
          "rgba(229, 231, 235, 0.8)",
        ],
        borderWidth: 0,
      },
    ],
  };
  const options = {
    cutout: "60%",
    responsive: true,
    plugins: {
      legend: { position: "bottom", labels: { boxWidth: 12, padding: 12 } },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-4">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 truncate">
        Disk Usage
      </h3>
      <div className="w-full h-40">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
}

// RamSwapAreaChart: RAM and swap over time
function RamSwapAreaChart({ ramHistory, swapHistory, labels }) {
  const data = {
    labels,
    datasets: [
      {
        label: "RAM Used (GiB)",
        data: ramHistory,
        fill: true,
        tension: 0.4,
        backgroundColor: "rgba(59, 130, 246, 0.3)",
        borderColor: "rgba(59, 130, 246, 0.8)",
      },
      {
        label: "Swap Used (%)",
        data: swapHistory,
        fill: true,
        tension: 0.4,
        backgroundColor: "rgba(236, 72, 153, 0.3)",
        borderColor: "rgba(236, 72, 153, 0.8)",
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: { legend: { position: "bottom" } },
    scales: {
      x: { display: true },
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-4">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 truncate">
        Memory & Swap Trend
      </h3>
      <div className="min-h-50">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

// SwapProgress: simple progress bar
function SwapProgress({ percent }) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-4">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
        Swap Usage
      </h3>
      <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div
          className="h-2 rounded-full bg-indigo-500"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
        {percent}%
      </span>
    </div>
  );
}

export { BatteryGauge, RamSwapAreaChart, SwapProgress, DiskDonutChart };
