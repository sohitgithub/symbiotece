// // import React from "react";
// // import "./OfferDocuments.css";
// // import { FaRegFileAlt } from "react-icons/fa";

// // export default function OfferDocuments() {
// //   const documents = [
// //     "Prospectus",
// //     "Symbiotec Audio Visual RHP - Hindi",
// //     "Symbiotec Audio Visual RHP - English",
// //     "Price Band Advertisement",
// //     "Red Herring Prospectus",
// //     "Symbiotec Audio Visual UDRHP-1 - English",
// //     "Symbiotec Audio Visual UDRHP-1 - Hindi",
// //     "Draft Red Herring Prospectus",
// //   ];

// //   return (
// //     <div className="offer-wrapper">
// //       <div className="offer-grid">
// //         {documents.map((item, index) => (
// //           <div key={index} className="offer-card">
// //             <FaRegFileAlt className="offer-icon" />
// //             <p className="offer-text">{item}</p>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }


// import React, { useEffect, useState } from "react";
// import "./OfferDocuments.css";
// import { FaRegFileAlt } from "react-icons/fa";

// export default function OfferDocuments() {
//   const baseUrl = import.meta.env.VITE_API_BASE_URL;

//   /* 🔹 STATIC OFFER DOCUMENTS (UNCHANGED) */
//   const staticDocuments = [
//     "Prospectus",
//     "Symbiotec Audio Visual RHP - Hindi",
//     "Symbiotec Audio Visual RHP - English",
//     "Price Band Advertisement",
//     "Red Herring Prospectus",
//     "Symbiotec Audio Visual UDRHP-1 - English",
//     "Symbiotec Audio Visual UDRHP-1 - Hindi",
//     "Draft Red Herring Prospectus",
//   ];

//   /* 🔹 CMS OFFER DOCUMENTS */
//   const [cmsDocuments, setCmsDocuments] = useState([]);

//   useEffect(() => {
//     fetch(
//       `${baseUrl}/api/public/content?category=Governance&subcategory=Offer Documents`
//     )
//       .then((res) => res.json())
//       .then((items) => {
//         const mapped = items.map((item) => {
//           const files = JSON.parse(item.files_json || "[]");

//           return {
//             title: item.title,
//             file: files[0]?.path,
//           };
//         });

//         setCmsDocuments(mapped);
//       })
//       .catch((err) => {
//         console.error("Offer Documents CMS error:", err);
//       });
//   }, [baseUrl]);

//   return (
//     <div className="offer-wrapper">
//       <div className="offer-grid">
//         {/* 🔹 STATIC DOCUMENTS */}
//         {staticDocuments.map((item, index) => (
//           <div key={`static-${index}`} className="offer-card">
//             <FaRegFileAlt className="offer-icon" />
//             <p className="offer-text">{item}</p>
//           </div>
//         ))}

//         {/* 🔹 CMS DOCUMENTS */}
//         {cmsDocuments.map((item, index) => (
//           <div
//             key={`cms-${index}`}
//             className="offer-card"
//             onClick={() =>
//               item.file &&
//               window.open(`${baseUrl}${item.file}`, "_blank")
//             }
//           >
//             <FaRegFileAlt className="offer-icon" />
//             <p className="offer-text">{item.title}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import "./OfferDocuments.css";
import "./GovernanceTabs.css"
import { FaRegFileAlt } from "react-icons/fa";

export default function OfferDocuments() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  /* 🔹 CMS OFFER DOCUMENTS */
  const [cmsDocuments, setCmsDocuments] = useState([]);

  useEffect(() => {
    fetch(
      `${baseUrl}/api/public/content?category=Governance&subcategory=Offer Documents`
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

        setCmsDocuments(mapped);
      })
      .catch((err) => {
        console.error("Offer Documents CMS error:", err);
      });
  }, [baseUrl]);

  return (
    <div className="offer-wrapper">
      <div className="offer-grid">

        {/* 🔹 CMS DOCUMENTS */}
        {cmsDocuments.map((item, index) => (
          <div
            key={`cms-${index}`}
            className="offer-card"
            onClick={() =>
              item.file &&
              window.open(`${baseUrl}${item.file}`, "_blank")
            }
          >
            <FaRegFileAlt className="offer-icon" />
            <p className="offer-text">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
