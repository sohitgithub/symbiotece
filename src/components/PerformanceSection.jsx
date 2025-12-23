import React from "react";
import "./PerformanceSection.css";

export default function PerformanceSection() {
  const cards = [
    {
      title: "Revenue from operations",
      subtitle: "(in ₹Mn)",
      barLabel: "YoY Growth",
      bars: [
        { label: "FY22", value: 0, number: "0" },
        { label: "FY23", value: 0, number: "0" },
        { label: "FY24", value: 0, number: "0" },
        { label: "FY25", value: 0, number: "0" },
        { label: "H1 FY26", value: 0, number: "0", current: true },
      ],
      bottomValues: ["—", "—", "—", "—", "—"],
    },
    {
      title: "Adjusted EBITDA",
      subtitle: "(in ₹Mn)",
      barLabel: "Margin %",
      bars: [
        { label: "FY22", value: 0, number: "0" },
        { label: "FY23", value: 0, number: "0" },
        { label: "FY24", value: 0, number: "0" },
        { label: "FY25", value: 0, number: "0" },
        { label: "H1 FY26", value: 0, number: "0", current: true },
      ],
      bottomValues:  ["—", "—", "—", "—", "—"],
    },
    {
      title: "Profit after tax (PAT)",
      subtitle: "(in ₹Mn)",
      barLabel: "Margin %",
      bars: [
        { label: "FY22", value: 0, number: "0" },
        { label: "FY23", value: 0, number: "0" },
        { label: "FY24", value: 0, number: "0" },
        { label: "FY25", value: 0, number: "0" },
        { label: "H1 FY26", value: 0, number: "0", current: true },
      ],
      bottomValues:  ["—", "—", "—", "—", "—"],
    },
  ];

  return (
    <section className="performance-wrapper">
      <h2 className="performance-title">Our Performance</h2>

      <div className="performance-grid">
        {cards.map((card, idx) => (
          <div className="performance-card" key={idx}>
            <div className="performance-header">
              <h3>{card.title}</h3>
              <span className="performance-subtitle">{card.subtitle}</span>
            </div>

            <div className="performance-chart">
              <div className="bars-row">
                {card.bars.map((bar, i) => (
                  <div className="bar-column" key={i}>
                    <div className="bar-wrapper">
                      <div
                        className={
                          "bar-fill" + (bar.current ? " bar-current" : "")
                        }
                        style={{ height: `${bar.value}%` }}
                      ></div>
                    </div>
                    <span className="bar-number">{bar.number}</span>
                    <span className="bar-label">{bar.label}</span>
                  </div>
                ))}
              </div>

              <div className="performance-bottom">
                <span className="bottom-label">{card.barLabel}</span>
                <div className="bottom-values">
                  {card.bars.map((bar, i) => (
                    <div className="bottom-item" key={i}>
                      <span className="bottom-fy">{bar.label}</span>
                      <span className="bottom-val">
                        {card.bottomValues[i] || "—"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* {card.footnote && (
                <p className="performance-footnote">{card.footnote}</p>
              )} */}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
