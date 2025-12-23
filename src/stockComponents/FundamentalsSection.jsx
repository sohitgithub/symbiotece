import React from "react";
import "./FundamentalsSection.css";

export default function FundamentalsSection() {
  return (
    <section className="fund-wrapper">
      <h2 className="fund-title">Fundamentals</h2>

      <div className="fund-grid">

        {/* LEFT BLOCK */}
        <div className="fund-col">
          <div className="fund-item">
            <span className="fund-label">Market Cap</span>
            <span className="fund-value">₹89,733Cr</span>
          </div>

          <div className="fund-item">
            <span className="fund-label">P/E Ratio(TTM)</span>
            <span className="fund-value">49.10</span>
          </div>

          <div className="fund-item">
            <span className="fund-label">P/B Ratio</span>
            <span className="fund-value">13.35</span>
          </div>

          <div className="fund-item">
            <span className="fund-label">Industry P/E</span>
            <span className="fund-value">32.38</span>
          </div>

          <div className="fund-item">
            <span className="fund-label">Debt to Equity</span>
            <span className="fund-value">0.05</span>
          </div>

          <div className="fund-info">
            Understand Fundamentals <span className="info-icon">ⓘ</span>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="fund-divider"></div>

        {/* RIGHT BLOCK */}
        <div className="fund-col">
          <div className="fund-item">
            <span className="fund-label">ROE</span>
            <span className="fund-value">37.60%</span>
          </div>

          <div className="fund-item">
            <span className="fund-label">EPS(TTM)</span>
            <span className="fund-value">2.96</span>
          </div>

          <div className="fund-item">
            <span className="fund-label">Dividend Yield</span>
            <span className="fund-value">0.00%</span>
          </div>

          <div className="fund-item">
            <span className="fund-label">Book Value</span>
            <span className="fund-value">10.88</span>
          </div>

          <div className="fund-item">
            <span className="fund-label">Face Value</span>
            <span className="fund-value">2</span>
          </div>
        </div>

      </div>
    </section>
  );
}
