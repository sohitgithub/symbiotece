// import React from "react";
// import "./Policies.css";
// import { FaRegFileAlt } from "react-icons/fa";

// export default function Policies() {
//   const policies = [
//     "Policy for Determining Material Subsidiary",
//     "Archival Policy",
//     "Corporate Social Responsibility Policy",
//     "Memorandum and Articles of Association",
//     "Policy for determination of materiality for disclosure of events or information",
//     "Terms and Conditions of Appointment as an Independent Director",
//     "Policy on Familiarization Programmes for Independent Directors",
//     "Policy on Materiality of Related Party Transactions",
//     "Nomination and Remuneration Policy",
//     "Whistleblower Policy",
//     "Dividend Distribution Policy",
//     "Risk Management Policy",
//   ];

//   return (
//     <div className="policies-wrapper">
//       <div className="policies-grid">
//         {policies.map((item, index) => (
//           <div key={index} className="policy-card">
//             <FaRegFileAlt className="policy-icon" />
//             <p className="policy-text">{item}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import "./Policies.css";
import { FaRegFileAlt } from "react-icons/fa";

export default function Policies() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  /* 🔹 CMS POLICIES */
  const [cmsPolicies, setCmsPolicies] = useState([]);

  useEffect(() => {
    fetch(
      `${baseUrl}/api/public/content?category=Governance&subcategory=Policies`
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

        setCmsPolicies(mapped);
      })
      .catch((err) => {
        console.error("Policies CMS error:", err);
      });
  }, [baseUrl]);

  return (
    <div className="policies-wrapper">
      <div className="policies-grid">

        {/* 🔹 CMS POLICIES */}
        {cmsPolicies.map((item, index) => (
          <div
            key={`cms-${index}`}
            className="policy-card"
            onClick={() =>
              item.file &&
              window.open(`${baseUrl}${item.file}`, "_blank")
            }
          >
            <FaRegFileAlt className="policy-icon" />
            <p className="policy-text">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
