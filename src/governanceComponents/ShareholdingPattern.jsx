// import React from "react";
// import "./ShareholdingPattern.css";
// import { FaRegFileAlt } from "react-icons/fa";

// export default function ShareholdingPattern() {
//   return (
//     <div className="share-wrapper">
//       <div className="share-card">
//         <FaRegFileAlt className="share-icon" />
//         <p className="share-text">Pre-listing Shareholding Pattern</p>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import "./ShareholdingPattern.css";
import { FaRegFileAlt } from "react-icons/fa";

export default function ShareholdingPattern() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;


  /* 🔹 CMS SHAREHOLDING PATTERNS */
  const [cmsItems, setCmsItems] = useState([]);

  useEffect(() => {
    fetch(
      `${baseUrl}/api/public/content?category=Governance&subcategory=Shareholding Pattern`
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

        setCmsItems(mapped);
      })
      .catch((err) => {
        console.error("Shareholding Pattern CMS error:", err);
      });
  }, [baseUrl]);

  return (
    <div className="share-wrapper">

      {/* 🔹 CMS ITEMS */}
      {cmsItems.map((item, i) => (
        <div
          key={`cms-${i}`}
          className="share-card"
          onClick={() =>
            item.file &&
            window.open(`${baseUrl}${item.file}`, "_blank")
          }
        >
          <FaRegFileAlt className="share-icon" />
          <p className="share-text">{item.title}</p>
        </div>
      ))}
    </div>
  );
}
