
// 📁 src/components/BarChartBox.jsx
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { barChartData } from "../uniti/data";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BarChartBox() {
  return (
    <div className="bg-white p-4 shadow rounded">
      <h3 className="mb-2 font-semibold">Bar Chart Example</h3>
      <Bar data={barChartData} options={{ responsive: true }} />
    </div>
  );
}

export default BarChartBox;