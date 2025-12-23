import React, { useState } from "react";
import "./ShareholdingPattern.css";

export default function ShareholdingPattern() {
  const [active, setActive] = useState("Oct");

  const data = {
    Oct: [
      { label: "Retail And Others", value: 71.71 },
      { label: "Promoters", value: 28.29 },
    ],
    Nov: [
      { label: "Foreign Institutions", value: 57.15 },
      { label: "Promoters", value: 27.81 },
      { label: "Retail And Others", value: 10.98 },
    ],
  };

  return (
    <section className="shareholding-section">
      <h2 className="shareholding-title">Shareholding Pattern</h2>

      <div className="shareholding-box">
        {/* Toggle Buttons */}
        <div className="shareholding-switch">
          <button
            className={active === "Oct" ? "switch-btn active" : "switch-btn"}
            onClick={() => setActive("Oct")}
          >
            Oct '25
          </button>

          <button
            className={active === "Nov" ? "switch-btn active" : "switch-btn"}
            onClick={() => setActive("Nov")}
          >
            Nov '25
          </button>
        </div>

        {/* Dynamic List */}
        <div className="shareholding-list">
          {data[active].map((item, idx) => (
            <div className="shareholding-row" key={idx}>
              <span className="sh-label">{item.label}</span>

              {/* Progress Bar */}
              <div className="sh-bar-wrapper">
                <div
                  className="sh-bar-fill"
                  style={{ width: `${item.value}%` }}
                ></div>
              </div>

              {/* Percentage */}
              <span className="sh-percent">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
