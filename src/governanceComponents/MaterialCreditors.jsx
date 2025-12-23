// import React from "react";
// import "./MaterialCreditors.css";
// import { FaRegFileAlt } from "react-icons/fa";

// export default function MaterialCreditors() {
//   const creditors = [
//     "List of Material Creditors – FY 2024–25",
//     "List of Material Creditors – FY 2023–24",
//     "List of Material Creditors – FY 2022–23",
//   ];

//   return (
//     <div className="material-wrapper">
//       <div className="material-grid">
//         {creditors.map((item, index) => (
//           <div key={index} className="material-card">
//             <FaRegFileAlt className="material-icon" />
//             <p className="material-text">{item}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import "./MaterialCreditors.css";
import { FaRegFileAlt } from "react-icons/fa";

export default function MaterialCreditors() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  /* 🔹 CMS CREDITORS */
  const [cmsCreditors, setCmsCreditors] = useState([]);

  useEffect(() => {
    fetch(
      `${baseUrl}/api/public/content?category=Governance&subcategory=Material Creditors`
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

        setCmsCreditors(mapped);
      })
      .catch((err) => {
        console.error("Material Creditors CMS error:", err);
      });
  }, [baseUrl]);

  return (
    <div className="material-wrapper">
      <div className="material-grid">

        {/* 🔹 CMS ITEMS */}
        {cmsCreditors.map((item, index) => (
          <div
            key={`cms-${index}`}
            className="material-card"
            onClick={() =>
              item.file &&
              window.open(`${baseUrl}${item.file}`, "_blank")
            }
          >
            <FaRegFileAlt className="material-icon" />
            <p className="material-text">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
