import React from "react";
import "../governanceComponents/GovernanceTabs.css"

// --- Icon Component ---
const DocumentIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6C5.47 2 4.96 2.21 4.59 2.59C4.21 2.96 4 3.47 4 4V20C4 20.53 4.21 21.04 4.59 21.41C4.96 21.79 5.47 22 6 22H18C18.53 22 19.04 21.79 19.41 21.41C19.79 21.04 20 20.53 20 20V8L14 2Z" />
    <path d="M14 2V8H20" />
    <path d="M16 13H8" />
    <path d="M16 17H8" />
    <path d="M10 9H8" />
  </svg>
);

export default function AnnualCompany() {
  
  // ⭐ DATA UPDATED FROM SCREENSHOT 1 ⭐
  const companyData = {
    "2024-25": [
      { title: "Annual Report Symbiotec 2024-25", link: "https://drive.google.com/file/d/1QffZfnEwWKCiKUkzE1G-vVy9KHnct4Yb/view?usp=drive_link" }
    ],
    "2023-24": [
      { title: "Annual Report Symbiotec 2023-24", link: "https://drive.google.com/file/d/1JEzh5ifZwB5H2HQo26vodQ61AiZNlRPW/view?usp=drive_link" }
    ],
    "2022-23": [
      { title: "Annual Report Symbiotec 2022-23", link: "https://drive.google.com/file/d/16xYdjv7BJW-678DXegdYU7RC5KDqmbz4/view?usp=drive_link" }
    ]
  };

  return (
    <div className="annual-wrapper">
      <style>{`
        .annual-wrapper { padding: 20px 0; font-family: 'Inter', sans-serif; }
        .year-section { margin-bottom: 40px; }
        .year-title { font-size: 24px; font-weight: 700; color: #111827; margin-bottom: 20px; border-bottom: 1px solid #e5e7eb; padding-bottom: 10px; }
        
        .doc-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 24px; }
        .doc-card { display: flex; flex-direction: column; justify-content: space-between; height: 160px; padding: 24px; background-color: #fff; border: 1px solid #e5e7eb; border-radius: 12px; text-decoration: none; transition: all 0.3s ease; }
        .doc-card:hover { border-color: #93c5fd; box-shadow: 0 10px 25px rgba(37, 99, 235, 0.1); transform: translateY(-4px); }
        .doc-icon-wrapper { width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; border-radius: 10px; background-color: #f3f4f6; color: #6b7280; transition: all 0.3s ease; }
        .doc-card:hover .doc-icon-wrapper { background-color: #eff6ff; color: #2563eb; }
        .empty-msg { color: #9ca3af; font-style: italic; }

      `}</style>

      {Object.keys(companyData).length === 0 && <p className="empty-msg">No reports available.</p>}

      {Object.keys(companyData)
        .sort((a, b) => b.localeCompare(a)) // Sort text years descending
        .map((year) => (
          <div key={year} className="year-section">
            <h2 className="year-title">{year}</h2>
            <div className="doc-grid">
              {companyData[year].map((doc, index) => (
                <a
                  key={index}
                  href={doc.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="doc-card"
                >
                  <div className="doc-icon-wrapper">
                    <DocumentIcon />
                  </div>
                  <div className="doc-info">
                    <p className="doc-title">{doc.title}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}