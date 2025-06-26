
// 📁 src/components/AreaChartBox.jsx
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { areaChartData } from "../uniti/data";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

function AreaChartBox() {
  return (
    <div className="bg-white p-4 shadow rounded">
      <h3 className="mb-2 font-semibold">Area Chart Example</h3>
      <Line data={areaChartData} options={{ responsive: true }} />
    </div>
  );
}

export default AreaChartBox;