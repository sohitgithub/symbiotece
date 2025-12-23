// import React from "react";
// import "./IndustryReport.css";
// import { FaRegFileAlt } from "react-icons/fa";

// export default function IndustryReport() {
//   const reports = [
//     "Industry Report – FY 2024–25",
//     "Industry Report – FY 2023–24",
//     "Industry Report – FY 2022–23",
//   ];

//   return (
//     <div className="industry-wrapper">
//       <div className="industry-grid">
//         {reports.map((item, index) => (
//           <div key={index} className="industry-card">
//             <FaRegFileAlt className="industry-icon" />
//             <p className="industry-text">{item}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import "./IndustryReport.css";
import { FaRegFileAlt } from "react-icons/fa";

export default function IndustryReport() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  /* 🔹 CMS REPORTS */
  const [cmsReports, setCmsReports] = useState([]);

  useEffect(() => {
    fetch(
      `${baseUrl}/api/public/content?category=Governance&subcategory=Industry Report`
    )
      .then((res) => res.json())
      .then((items) => {
        const mapped = items.map((item) => {
          const files = JSON.parse(item.files_json || "[]");

          return {
            title: item.title,
            file: files[0]?.path,
          };
        });

        setCmsReports(mapped);
      })
      .catch((err) => {
        console.error("Industry Report CMS error:", err);
      });
  }, [baseUrl]);

  return (
    <div className="industry-wrapper">
      <div className="industry-grid">

        {/* 🔹 CMS REPORTS */}
        {cmsReports.map((item, index) => (
          <div
            key={`cms-${index}`}
            className="industry-card"
            onClick={() =>
              item.file &&
              window.open(`${baseUrl}${item.file}`, "_blank")
            }
          >
            <FaRegFileAlt className="industry-icon" />
            <p className="industry-text">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
