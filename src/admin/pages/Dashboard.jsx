// import React from "react";
// import "./Dashboard.css";

// export default function Dashboard() {
//   return (
//     <div className="dashboard">

//       {/* PAGE HEADER */}
//       <div className="dashboard-header">
//         <h1>Dashboard</h1>
//         <p>Overview of system activity and content performance</p>
//       </div>

//       {/* KPI CARDS */}
//       <div className="kpi-grid">
//         <div className="kpi-card">
//           <span className="kpi-label">Total Users</span>
//           <h2 className="kpi-value">1,284</h2>
//           <span className="kpi-meta success">+6% this month</span>
//         </div>

//         <div className="kpi-card">
//           <span className="kpi-label">Total Documents</span>
//           <h2 className="kpi-value">248</h2>
//           <span className="kpi-meta success">Stable</span>
//         </div>

//         <div className="kpi-card">
//           <span className="kpi-label">Active Sessions</span>
//           <h2 className="kpi-value">92</h2>
//           <span className="kpi-meta warning">Live now</span>
//         </div>

//         <div className="kpi-card">
//           <span className="kpi-label">Pending Requests</span>
//           <h2 className="kpi-value">7</h2>
//           <span className="kpi-meta error">Needs review</span>
//         </div>
//       </div>

//       {/* ANALYTICS */}
//       {/* <div className="dashboard-grid">
//         <div className="card chart-card">
//           <h3>Growth Analytics</h3>
//           <div className="chart-placeholder"></div>
//         </div>

//         <div className="card chart-card">
//           <h3>Monthly Data</h3>
//           <div className="chart-placeholder"></div>
//         </div>

//         <div className="card chart-card">
//           <h3>Data Distribution</h3>
//           <div className="chart-placeholder"></div>
//         </div>
//       </div> */}

//       {/* ACTIVITY + TABLE */}
//       <div className="dashboard-grid two-col">

//         {/* RECENT ACTIVITY */}
//         <div className="card">
//           <h3>Recent Activity</h3>
//           <ul className="activity-list">
//             <li>
//               <span>Annual Report uploaded</span>
//               <time>Today</time>
//             </li>
//             <li>
//               <span>Board member updated</span>
//               <time>Yesterday</time>
//             </li>
//             <li>
//               <span>New document approved</span>
//               <time>2 days ago</time>
//             </li>
//           </ul>
//         </div>

//         {/* RECENT ENTRIES */}
//         <div className="card">
//           <h3>Recent Entries</h3>
//           <div className="table-wrapper">
//             <table>
//               <thead>
//                 <tr>
//                   <th>Title</th>
//                   <th>Date</th>
//                   <th>Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>Investor Presentation</td>
//                   <td>12 Aug 2025</td>
//                   <td><span className="badge success">Approved</span></td>
//                 </tr>
//                 <tr>
//                   <td>Policy Update</td>
//                   <td>10 Aug 2025</td>
//                   <td><span className="badge warning">Pending</span></td>
//                 </tr>
//                 <tr>
//                   <td>Disclosure File</td>
//                   <td>08 Aug 2025</td>
//                   <td><span className="badge error">Rejected</span></td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>

//       </div>

//     </div>
//   );
// }




import React from "react";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Overview of system activity and content performance</p>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <span className="kpi-label">Total Users</span>
          <h2 className="kpi-value">1,284</h2>
          <span className="kpi-meta success">+6% this month</span>
        </div>

        <div className="kpi-card">
          <span className="kpi-label">Total Documents</span>
          <h2 className="kpi-value">248</h2>
          <span className="kpi-meta success">Stable</span>
        </div>

        <div className="kpi-card">
          <span className="kpi-label">Active Sessions</span>
          <h2 className="kpi-value">92</h2>
          <span className="kpi-meta warning">Live now</span>
        </div>

        <div className="kpi-card">
          <span className="kpi-label">Pending Requests</span>
          <h2 className="kpi-value">7</h2>
          <span className="kpi-meta error">Needs review</span>
        </div>
      </div>

      {/* Content Grid */}
      <div className="dashboard-grid two-col">
        <div className="card">
          <h3>Recent Activity</h3>
          <ul className="activity-list">
            <li>
              <span>Annual Report uploaded</span>
              <time>Today</time>
            </li>
            <li>
              <span>Board member updated</span>
              <time>Yesterday</time>
            </li>
            <li>
              <span>New document approved</span>
              <time>2 days ago</time>
            </li>
          </ul>
        </div>

        <div className="card">
          <h3>Recent Entries</h3>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Investor Presentation</td>
                  <td>12 Aug 2025</td>
                  <td>
                    <span className="badge success">Approved</span>
                  </td>
                </tr>
                <tr>
                  <td>Policy Update</td>
                  <td>10 Aug 2025</td>
                  <td>
                    <span className="badge warning">Pending</span>
                  </td>
                </tr>
                <tr>
                  <td>Disclosure File</td>
                  <td>08 Aug 2025</td>
                  <td>
                    <span className="badge error">Rejected</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
