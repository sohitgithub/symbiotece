// import React from "react";
// import "./CommitteeComposition.css";

// export default function CommitteeComposition() {
//   return (
//     <div className="committee-wrapper">

//       {/* Audit Committee */}
//       <div className="committee-section">
//         <h3 className="committee-title">Audit Committee</h3>

//         <div className="committee-members">
//           <div>
//             <p className="member-name">Neetu Kashiramka</p>
//             <p className="member-role">Chairperson</p>
//           </div>

//           <div>
//             <p className="member-name">Gaurang Shah</p>
//           </div>

//           <div>
//             <p className="member-name">Neeru Chaudhry</p>
//           </div>
//         </div>

//         <hr className="divider" />
//       </div>

//       {/* Nomination Committee */}
//       <div className="committee-section">
//         <h3 className="committee-title">Nomination and Remuneration Committee</h3>

//         <div className="committee-members">
//           <div>
//             <p className="member-name">Neeru Chaudhry</p>
//             <p className="member-role">Chairperson</p>
//           </div>

//           <div>
//             <p className="member-name">Gaurang Shah</p>
//           </div>

//           <div>
//             <p className="member-name">Ankit Nagori</p>
//           </div>
//         </div>

//         <hr className="divider" />
//       </div>

//       {/* Risk Committee */}
//       <div className="committee-section">
//         <h3 className="committee-title">Risk Management Committee</h3>

//         <div className="committee-members">
//           <div>
//             <p className="member-name">Neetu Kashiramka</p>
//             <p className="member-role">Chairperson</p>
//           </div>

//           <div>
//             <p className="member-name">Ankit Nagori</p>
//           </div>

//           <div>
//             <p className="member-name">Ishan Bansal</p>
//           </div>

//           <div>
//             <p className="member-name">Neeraj Singh</p>
//           </div>
//         </div>

//         <hr className="divider" />
//       </div>

//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import "./CommitteeComposition.css";

export default function CommitteeComposition() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  /* 🔹 CMS COMMITTEES */
  const [cmsCommittees, setCmsCommittees] = useState([]);

  useEffect(() => {
    fetch(
      `${baseUrl}/api/public/content?category=Governance&subcategory=Committee Composition`
    )
      .then((res) => res.json())
      .then((items) => {
        const parsed = items.map((item) => {
          let members = [];

          try {
            members = JSON.parse(item.summary || "[]");
          } catch (e) {
            members = [];
          }

          return {
            title: item.title,
            members,
          };
        });

        setCmsCommittees(parsed);
      })
      .catch((err) => {
        console.error("Committee CMS error:", err);
      });
  }, [baseUrl]);

  const committees = [...cmsCommittees];

  return (
    <div className="committee-wrapper">
      {committees.map((committee, i) => (
        <div className="committee-section" key={i}>
          <h3 className="committee-title">{committee.title}</h3>

          <div className="committee-members">
            {committee.members.map((m, idx) => (
              <div key={idx}>
                <p className="member-name">{m.name}</p>
                {m.role && (
                  <p className="member-role">{m.role}</p>
                )}
              </div>
            ))}
          </div>

          <hr className="divider" />
        </div>
      ))}
    </div>
  );
}
