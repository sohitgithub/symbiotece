// import React from "react";
// import "./SchemeArrangements.css";
// import { FaRegFileAlt } from "react-icons/fa";

// export default function SchemeArrangements() {
//   const schemes = [
//     "Scheme of Arrangement – FY 2024–25",
//     "Scheme of Arrangement – FY 2023–24",
//     "Scheme of Arrangement – FY 2022–23",
//   ];

//   return (
//     <div className="scheme-wrapper">
//       <div className="scheme-grid">
//         {schemes.map((item, index) => (
//           <div key={index} className="scheme-card">
//             <FaRegFileAlt className="scheme-icon" />
//             <p className="scheme-text">{item}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import "./SchemeArrangements.css";
import { FaRegFileAlt } from "react-icons/fa";

export default function SchemeArrangements() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  /* 🔹 CMS SCHEMES */
  const [cmsSchemes, setCmsSchemes] = useState([]);

  useEffect(() => {
    fetch(
      `${baseUrl}/api/public/content?category=Governance&subcategory=Scheme of Arrangements`
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

        setCmsSchemes(mapped);
      })
      .catch((err) => {
        console.error("Scheme Arrangements CMS error:", err);
      });
  }, [baseUrl]);

  return (
    <div className="scheme-wrapper">
      <div className="scheme-grid">

        {/* 🔹 CMS SCHEMES */}
        {cmsSchemes.map((item, index) => (
          <div
            key={`cms-${index}`}
            className="scheme-card"
            onClick={() =>
              item.file &&
              window.open(`${baseUrl}${item.file}`, "_blank")
            }
          >
            <FaRegFileAlt className="scheme-icon" />
            <p className="scheme-text">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
