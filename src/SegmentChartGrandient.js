import { useEffect, useRef, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const scores = [6, 5, 5, 5, 3, 4, 6, 4, 5];
const labels = [100, 200, 300, 400, 500, 600, 700];

const options = {
  fill: true,
  responsive: true,
  scales: {
    y: {
      min: 0,
    },
  },
  plugins: {
    legend: {
      display: true,
    },
  },
};

export default function SegmentChartGrandient() {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({
    datasets: [],
  });

  useEffect(function () {
    const chart = chartRef.current;
    if (!chart) {
      return;
    }

    function createGradientColor(color) {
      const ctx = chart.ctx;
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, color);
      gradient.addColorStop(0.99, "rgba(255,255,255,0.6)");
      gradient.addColorStop(1, "rgba(255,255,255,0.6)");
      return gradient;
    }

    setChartData({
      datasets: [
        {
          label: "Mis datos (Gradient)",
          data: scores,
          tension: 0.3,
          borderColor: "rgb(75, 192, 192)",
          pointRadius: 6,
          pointBackgroundColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.3)",
          segment: {
            borderColor: function (context) {
              if (context.type === "segment") {
                return context.p1DataIndex % 2 === 0 ? "red" : "green";
              }
            },
            backgroundColor: function (context) {
              if (context.type === "segment") {
                return createGradientColor(
                  context.p1DataIndex % 2 === 0 ? "red" : "green"
                );
              }
            },
          },
        },
      ],
      labels,
    });
  }, []);

  return <Line data={chartData} options={options} ref={chartRef} />;
}
