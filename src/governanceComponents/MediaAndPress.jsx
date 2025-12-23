// import React from "react";
// import "./MediaAndPress.css";

// export default function MediaAndPress() {
//   const mediaItems = [
//     {
//       title: "Press Releases",
//       description: "Electronic and print media releases issued by the Company",
//     },
//     {
//       title: "Investor Presentations & Earnings Calls",
//       description: "Investor presentations, earnings call transcripts and concalls",
//     },
//     {
//       title: "Brand Stories",
//       description: "Corporate stories, brand narratives and featured articles",
//     },
//   ];

//   return (
//     <section className="media-wrapper">
//       <h2 className="media-title">Media & Press</h2>

//       <div className="media-list">
//         {mediaItems.map((item, index) => (
//           <div key={index} className="media-row">
//             <div className="media-left">
//               <h4 className="media-heading">{item.title}</h4>
//               <p className="media-desc">{item.description}</p>
//             </div>

//             <div className="media-right">
//               <button className="media-btn">
//                 View
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

import React, { useEffect, useState } from "react";
import "./MediaAndPress.css";

export default function MediaAndPress() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const [mediaItems, setMediaItems] = useState([]);

  useEffect(() => {
    fetch(
      `${baseUrl}/api/public/content?category=Governance&subcategory=Media & Press`
    )
      .then((res) => res.json())
      .then((items) => {
        const mapped = items.map((item) => {
          let files = [];

          try {
            files = JSON.parse(item.files_json || "[]");
          } catch (e) {
            files = [];
          }

          return {
            title: item.title,
            description: item.summary || "",
            url: files[0]?.path
              ? `${baseUrl}${files[0].path}`
              : null,
          };
        });

        setMediaItems(mapped);
      })
      .catch((err) => {
        console.error("Media & Press CMS error:", err);
      });
  }, [baseUrl]);

  const handleView = (url) => {
    if (url) {
      window.open(url, "_blank");
    }
  };

  return (
    <section className="media-wrapper">
      <h2 className="media-title">Media & Press</h2>

      <div className="media-list">
        {mediaItems.length === 0 && (
          <p className="media-empty">No media content available</p>
        )}

        {mediaItems.map((item, index) => (
          <div key={index} className="media-row">
            <div className="media-left">
              <h4 className="media-heading">{item.title}</h4>
              {item.description && (
                <p className="media-desc">{item.description}</p>
              )}
            </div>

            <div className="media-right">
              <button
                className="media-btn"
                onClick={() => handleView(item.url)}
                disabled={!item.url}
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
