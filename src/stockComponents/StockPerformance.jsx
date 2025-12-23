import React from "react";
import "./StockPerformance.css";

export default function StockPerformance() {
  return (
    <section className="perf-wrapper">

      <h2 className="perf-title">
        Performance <span className="perf-info">ⓘ</span>
      </h2>

      {/* ================= TODAY LOW → HIGH ================= */}
      <div className="perf-row">
        <div className="perf-col">
          <p className="perf-label">Today's Low</p>
          <p className="perf-value">146.21</p>
        </div>

        <div className="perf-bar-box">
          <div className="perf-bar"></div>
          <div className="perf-pointer" style={{ left: "70%" }}></div>
        </div>

        <div className="perf-col right">
          <p className="perf-label">Today's High</p>
          <p className="perf-value">152.50</p>
        </div>
      </div>

      {/* ================= 52W LOW → HIGH ================= */}
      <div className="perf-row">
        <div className="perf-col">
          <p className="perf-label">52W Low</p>
          <p className="perf-value">112.00</p>
        </div>

        <div className="perf-bar-box">
          <div className="perf-bar"></div>
          <div className="perf-pointer" style={{ left: "35%" }}></div>
        </div>

        <div className="perf-col right">
          <p className="perf-label">52W High</p>
          <p className="perf-value">193.80</p>
        </div>
      </div>

      <hr className="perf-divider" />

      {/* ================= BOTTOM GRID ================= */}
      <div className="perf-grid">

        <div className="perf-grid-item">
          <p className="perf-grid-label">Open</p>
          <p className="perf-grid-value">146.24</p>
        </div>

        <div className="perf-grid-item">
          <p className="perf-grid-label">Prev. Close</p>
          <p className="perf-grid-value">145.36</p>
        </div>

        <div className="perf-grid-item">
          <p className="perf-grid-label">Volume</p>
          <p className="perf-grid-value">3,12,81,959</p>
        </div>

        <div className="perf-grid-item">
          <p className="perf-grid-label">Total traded value</p>
          <p className="perf-grid-value">476 Cr</p>
        </div>

        <div className="perf-grid-item">
          <p className="perf-grid-label">Upper Circuit</p>
          <p className="perf-grid-value">174.43</p>
        </div>

        <div className="perf-grid-item">
          <p className="perf-grid-label">Lower Circuit</p>
          <p className="perf-grid-value">116.28</p>
        </div>

      </div>

    </section>
  );
}
