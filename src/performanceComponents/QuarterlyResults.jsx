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
    fetch(
      `${baseUrl}/api/public/content?category=Performance&subcategory=Quarterly Results`
    )
      .then((res) => res.json())
      .then((items) => {

        console.log("PUBLIC ITEMS FULL:", items);

        const map = {};
        const docSet = new Set();
        const fySet = new Set();

        items.forEach((item) => {
          const files = JSON.parse(item.files_json || "[]");
          if (!files[0]) return; // PDF still required

          // 🔹 LENIENT FLAGS WITH SAFE DEFAULTS
          let fy = item.flags?.fy || "FY";
          let quarter = item.flags?.quarter || "";
          let docType = item.flags?.docType || "Quarterly Result";

          // 🔹 Normalize FY
          fy = fy.replace(/\s+/g, "").toUpperCase();

          // 🔹 Register FY & DocType
          fySet.add(fy);
          docSet.add(docType);

          if (!map[fy]) map[fy] = {};
          if (!map[fy][docType]) map[fy][docType] = {};

          // 🔹 Only assign if quarter is valid
          if (["Q1", "Q2", "Q3", "Q4"].includes(quarter)) {
            map[fy][docType][quarter] = files[0].path;
          }
        });

        const fyList = Array.from(fySet).sort(
          (a, b) =>
            parseInt(b.replace("FY", "")) -
            parseInt(a.replace("FY", ""))
        );

        setData(map);
        setDocTypes(Array.from(docSet));
        setFys(fyList);
        setActiveFY(fyList[0] || "");
      })
      .catch((err) => {
        console.error("Quarterly Results fetch error:", err);
      });
  }, [baseUrl]);

  const openPDF = (file) => {
    if (!file) return;
    window.open(`${baseUrl}${file}`, "_blank");
  };

  return (
    <>
    <div className="quarterly-container">
      {/* ✅ REAL FY DROPDOWN */}
      <select
        className="year-dropdown"
        value={activeFY}
        onChange={(e) => setActiveFY(e.target.value)}
      >
        {fys.length === 0 && <option>No FY</option>}
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

    <PerformanceSection/>
    </>
  );
}
