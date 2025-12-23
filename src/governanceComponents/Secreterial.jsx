// import React from "react";
// import "./Secreterial.css";
// import { FaRegFileAlt } from "react-icons/fa";

// export default function Secreterial() {
//   const secreterialDocs = [
//     "Notice of Annual General Meeting",
//     "Postal Ballot Notice",
//     "Scrutinizer Report",
//     "Secretarial Compliance Report",
//     "Annual Secretarial Compliance Certificate",
//     "Certificate under Regulation 40(9)",
//   ];

//   return (
//     <div className="secreterial-wrapper">
//       <div className="secreterial-grid">
//         {secreterialDocs.map((item, index) => (
//           <div key={index} className="secreterial-card">
//             <FaRegFileAlt className="secreterial-icon" />
//             <p className="secreterial-text">{item}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import "./Secreterial.css";
import { FaRegFileAlt } from "react-icons/fa";

export default function Secreterial() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  /* 🔹 CMS DOCUMENTS */
  const [cmsDocs, setCmsDocs] = useState([]);

  useEffect(() => {
    fetch(
      `${baseUrl}/api/public/content?category=Governance&subcategory=Secreterial & Regu.Compliance`
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

        setCmsDocs(mapped);
      })
      .catch((err) => {
        console.error("Secretarial CMS error:", err);
      });
  }, [baseUrl]);

  return (
    <div className="secreterial-wrapper">
      <div className="secreterial-grid">
    
        {/* 🔹 CMS DOCS */}
        {cmsDocs.map((item, index) => (
          <div
            key={`cms-${index}`}
            className="secreterial-card"
            onClick={() =>
              item.file &&
              window.open(`${baseUrl}${item.file}`, "_blank")
            }
          >
            <FaRegFileAlt className="secreterial-icon" />
            <p className="secreterial-text">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
