import React from "react";
import "../pages/Performance.css";

export default function PerformanceTabs({
  activeTab,
  setActiveTab,
  annualTab,
  setAnnualTab,
}) {
  return (
    <div className="tabs-container">
      <div className="main-tabs">
        <button
          className={activeTab === "quarterly" ? "active" : ""}
          onClick={() => setActiveTab("quarterly")}
        >
          Quarterly Results
        </button>

        <button
          className={activeTab === "annual" ? "active" : ""}
          onClick={() => setActiveTab("annual")}
        >
          Annual Reports
        </button>
      </div>

      {activeTab === "annual" && (
        <div className="annual-tabs">
          <button
            className={annualTab === "company" ? "active" : ""}
            onClick={() => setAnnualTab("company")}
          >
            Company
          </button>

          <button
            className={annualTab === "subsidiaries" ? "active" : ""}
            onClick={() => setAnnualTab("subsidiaries")}
          >
            Subsidiaries
          </button>

          {/* <button
            className={annualTab === "group" ? "active" : ""}
            onClick={() => {
              // temporarily disabled
              alert("Group Company data will be available soon");
            }}
            disabled
          >
            Group Company
          </button> */}
        </div>
      )}
    </div>
  );
}
