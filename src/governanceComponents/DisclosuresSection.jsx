// import React from "react";
// import "./DisclosuresSection.css";
// import { FiExternalLink } from "react-icons/fi";

// const DISCLOSURES = [
//   {
//     title: "Details of Business",
//     url: "#",
//   },
//   {
//     title:
//       "Terms & Conditions of Appointment of Independent Director",
//     url: "#",
//   },
//   {
//     title: "Policy on Related Party Transactions",
//     url: "#",
//   },
//   {
//     title: "Policy for Determination of Material Subsidiaries",
//     url: "#",
//   },
//   {
//     title: "Policy on Archival of Documents",
//     url: "#",
//   },
//   {
//     title: "Policy on Preservation of Documents",
//     url: "#",
//   },
//   {
//     title: "Whistle Blower Policy",
//     url: "#",
//   },
//   {
//     title: "Code of Conduct for Prevention of Insider Trading",
//     url: "#",
//   },
//   {
//     title: "Code of Conduct for Board Members and Senior Management",
//     url: "#",
//   },
// ];

// export default function DisclosuresSection() {
//   return (
//     <section className="disclosures-section">
//       <h2 className="disclosures-heading">
//         Disclosures under Regulation 46 of SEBI (LODR) Regulations
//       </h2>

//       <div className="disclosures-table-wrapper">
//         <table className="disclosures-table">
//           <thead>
//             <tr>
//               <th className="disc-col-index" /> {/* empty header for numbers */}
//               <th className="disc-col-name">Name</th>
//               <th className="disc-col-link">Link</th>
//             </tr>
//           </thead>

//           <tbody>
//             {DISCLOSURES.map((item, index) => (
//               <tr key={index}>
//                 <td className="disc-col-index">{index + 1}</td>

//                 <td className="disc-col-name">
//                   {item.title}
//                 </td>

//                 <td className="disc-col-link">
//                   <a
//                     href={item.url}
//                     className="disc-link-icon"
//                     target="_blank"
//                     rel="noreferrer"
//                   >
//                     <FiExternalLink />
//                   </a>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </section>
//   );
// }


import React, { useEffect, useState } from "react";
import "./DisclosuresSection.css";
import { FiExternalLink } from "react-icons/fi";

export default function DisclosuresSection() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const [cmsDisclosures, setCmsDisclosures] = useState([]);

  useEffect(() => {
    fetch(
      `${baseUrl}/api/public/content?category=Governance&subcategory=Disclosures`
    )
      .then((res) => res.json())
      .then((items) => {
        const mapped = items.map((item) => {
          const files = JSON.parse(item.files_json || "[]");

          return {
            title: item.title,
            url: files[0]?.path
              ? `${baseUrl}${files[0].path}`
              : item.summary || "#",
          };
        });

        setCmsDisclosures(mapped);
      })
      .catch((err) => {
        console.error("Disclosures CMS error:", err);
      });
  }, [baseUrl]);

  const disclosures = [...cmsDisclosures];

  return (
    <section className="disclosures-section">
      <h2 className="disclosures-heading">
        Disclosures under Regulation 46 of SEBI (LODR) Regulations
      </h2>

      <div className="disclosures-table-wrapper">
        <table className="disclosures-table">
          <thead>
            <tr>
              <th className="disc-col-index" />
              <th className="disc-col-name">Name</th>
              <th className="disc-col-link">Link</th>
            </tr>
          </thead>

          <tbody>
            {disclosures.map((item, index) => (
              <tr key={index}>
                <td className="disc-col-index">{index + 1}</td>

                <td className="disc-col-name">{item.title}</td>

                <td className="disc-col-link">
                  <a
                    href={item.url}
                    className="disc-link-icon"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FiExternalLink />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
