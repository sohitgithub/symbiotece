import React, { useEffect, useState } from "react";
import "../pages/Performance.css";

export default function AnnualGroup() {
  const [reports, setReports] = useState([]);
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetch(
      `${baseUrl}/api/public/content?category=Performance&subcategory=Annual Reports - Group`
    )
      .then((res) => res.json())
      .then((items) => {
        const list = [];

        items.forEach((item) => {
          const files = JSON.parse(item.files_json || "[]");
          if (!files[0]) return;

          /* ✅ READ STRUCTURED YEAR */
          const year = item.flags?.year || "—";

          list.push({
            year,
            title: item.title || "Annual Report",
            file: files[0].path,
          });
        });

        // Sort by year DESC
        list.sort((a, b) => b.year - a.year);

        setReports(list);
      })
      .catch((err) => {
        console.error("AnnualGroup fetch error:", err);
      });
  }, [baseUrl]);

  const openPDF = (filePath) => {
    if (!filePath) return;
    window.open(`${baseUrl}${filePath}`, "_blank");
  };

  return (
    <div className="group-container">
      <h3 className="group-title"> Symbiotec Solution</h3>

      <div className="group-cards">
        {reports.map((item, index) => (
          <div
            className="group-card"
            key={index}
            onClick={() => openPDF(item.file)}
          >
            <div className="group-year">{item.year}</div>
            <div className="group-icon">
              <img src="/images/doc.png" alt="" />
            </div>
            <div className="group-link">{item.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
