import React, { useEffect, useState } from "react";
import PerformanceSection from "../components/PerformanceSection";
import "../pages/Performance.css";

export default function QuarterlyResults() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const [data, setData] = useState({});
  const [activeFY, setActiveFY] = useState("");
  const [docTypes, setDocTypes] = useState([]);
  const [fys, setFys] = useState([]);

  useEffect(() => {
    // ✅ Fetch from new Public API endpoint
    fetch(`${baseUrl}/api/quarterly-results/public`)
      .then((res) => res.json())
      .then((items) => {
        const map = {};
        const docSet = new Set();
        const fySet = new Set();

        items.forEach((item) => {
          // --- Process Data from API ---
          let fy = item.financial_year || "FY";
          let quarter = item.quarter || "";
          let docType = item.document_type || "Result";
          let fileUrl = item.pdf_path ? `${baseUrl}/uploads/${item.pdf_path}` : null;

          if (!fileUrl) return; // Skip if no file

          // Normalize FY
          fy = fy.replace(/\s+/g, "").toUpperCase();

          fySet.add(fy);
          docSet.add(docType);

          if (!map[fy]) map[fy] = {};
          if (!map[fy][docType]) map[fy][docType] = {};

          if (["Q1", "Q2", "Q3", "Q4"].includes(quarter)) {
            map[fy][docType][quarter] = fileUrl;
          }
        });

        // Sort Financial Years Descending (FY25, FY24...)
        const fyList = Array.from(fySet).sort((a, b) => b.localeCompare(a));

        setData(map);
        setDocTypes(Array.from(docSet));
        setFys(fyList);
        // Default to first available year
        if (fyList.length > 0) setActiveFY(fyList[0]);
      })
      .catch((err) => {
        console.error("Quarterly Results fetch error:", err);
      });
  }, [baseUrl]);

  const openPDF = (fileUrl) => {
    if (!fileUrl) return;
    window.open(fileUrl, "_blank");
  };

  return (
    <>
      <div className="quarterly-container">
        {/* ✅ DYNAMIC FY DROPDOWN */}
        <select
          className="year-dropdown"
          value={activeFY}
          onChange={(e) => setActiveFY(e.target.value)}
        >
          {fys.length === 0 && <option>Loading...</option>}
          {fys.map((fy) => (
            <option key={fy} value={fy}>
              {fy}
            </option>
          ))}
        </select>

        <table className="quarterly-table">
          <thead>
            <tr>
              <th>Document Type</th>
              <th>Q1</th>
              <th>Q2</th>
              <th>Q3</th>
              <th>Q4</th>
            </tr>
          </thead>

          <tbody>
            {docTypes.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No quarterly data available
                </td>
              </tr>
            )}

            {docTypes.map((doc) => (
              <tr key={doc}>
                <td>{doc}</td>

                {["Q1", "Q2", "Q3", "Q4"].map((q) => {
                  const file = data[activeFY]?.[doc]?.[q];

                  return (
                    <td
                      key={q}
                      className={file ? "pill" : ""}
                      onClick={() => openPDF(file)}
                      style={{ cursor: file ? "pointer" : "default" }}
                    >
                      {file ? q : "-"}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <PerformanceSection />
    </>
  );
}