import React, { useState } from "react";
import "./StockHero.css";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

export default function StockHero() {
  const [activeDuration, setActiveDuration] = useState("1D");

  // Dummy Chart Data — Replace later with API
  const chartData = {
    labels: Array.from({ length: 30 }, (_, i) => i),
    datasets: [
      {
        label: "Stock Price",
        data: [151, 149, 150, 148, 149.5, 150.2, 150.7, 149.9, 150.4, 151.19, 150.8, 151.5,150],
        borderColor: "#05c46b",
        borderWidth: 2.5,
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  const options = {
  responsive: true,
  maintainAspectRatio: false,

  plugins: {
    legend: { display: false },
    tooltip: {
      enabled: true,
      intersect: false,
      mode: "index",
      displayColors: false,
      backgroundColor: "white",
      titleColor: "#333",
      bodyColor: "#333",
      borderColor: "#eee",
      borderWidth: 1,
      cornerRadius: 6,
      padding: 12,
    },
  },

  scales: {
    x: {
      display: false,
      grid: { display: false, drawBorder: false },
    },
    y: {
      display: false,
      grid: { display: false, drawBorder: false },
    }
  },

  elements: {
    line: {
      borderColor: "#00C68F", // Groww Green
      borderWidth: 2,
      tension: 0.35, // Smooth curve
    },
    point: {
      radius: 0, // No points
      hitRadius: 8, // Hover area
      hoverRadius: 4, // Circle when hovered
      hoverBackgroundColor: "#00C68F",
      hoverBorderWidth: 2,
    }
  },

  interaction: {
    intersect: false,
    mode: "index",
  }
};


  const durations = ["NSE", "1D", "1W", "1M", "3M", "6M", "1Y", "3Y", "5Y", "All"];

  return (
    <section className="stock-hero">

      {/* LEFT — COMPANY INFO */}
      <div className="stock-header">
        <img src="/images/symbiotec-logo.webp" alt="logo" className="stock-logo" />

        <div>
          <h2 className="stock-company">Symbiotec</h2>

          <div className="stock-price-row">
            <span className="stock-price">₹151.19</span>
            <span className="stock-change">+5.83 (4.01%)</span>
            <span className="stock-duration">1D</span>
          </div>
        </div>
      </div>

      {/* CHART */}
      <div className="stock-chart-box">
        <Line data={chartData} options={options} />
      </div>

      {/* TIME FILTER BUTTONS */}
      <div className="stock-filter-row">
        {durations.map((d) => (
          <button
            key={d}
            className={`stock-filter-btn ${activeDuration === d ? "active" : ""}`}
            onClick={() => setActiveDuration(d)}
          >
            {d}
          </button>
        ))}

        <button className="stock-terminal-btn">
          <span role="img">📊</span> Terminal
        </button>
      </div>

    </section>
  );
}
