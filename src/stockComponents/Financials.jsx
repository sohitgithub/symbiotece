import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import "./Financials.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function Financials() {
  const [activeTab, setActiveTab] = useState("Revenue");
  const [duration, setDuration] = useState("Quarterly");

  const data = {
    labels: ["Sep '24", "Jun '25", "Sep '25"],
    datasets: [
      {
        label: "",
        data: [1160, 948, 1071],
        backgroundColor: "#00B894",
        borderRadius: 6,
        barThickness: 55,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#6b7280" },
      },
      y: {
        grid: { display: false },
        ticks: { display: false },
      },
    },
  };

  return (
    <section className="financials-section">
      <h2 className="fin-title">Financials</h2>

      <div className="fin-card">

        {/* Tabs */}
        <div className="fin-tabs">
          {["Revenue", "Profit", "Net Worth"].map((tab) => (
            <button
              key={tab}
              className={`fin-tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="fin-values-note">*All values are in Rs. Cr</div>

        <div className="fin-chart-box">
          <Bar data={data} options={options} />
        </div>

        <div className="fin-duration">
          <button
            className={`duration-btn ${duration === "Quarterly" ? "active" : ""}`}
            onClick={() => setDuration("Quarterly")}
          >
            Quarterly
          </button>

          <button
            className={`duration-btn ${duration === "Yearly" ? "active" : ""}`}
            onClick={() => setDuration("Yearly")}
          >
            Yearly
          </button>
        </div>
      </div>
    </section>
  );
}
