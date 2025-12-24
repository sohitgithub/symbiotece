import React, { useState, useEffect } from "react";
// import "../governanceComponents/GovernanceTabs.css" // Keep if you use it

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
  const [groupedData, setGroupedData] = useState({});
  const [loading, setLoading] = useState(true);
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetch(`${baseUrl}/api/annual-company/public`)
      .then((res) => res.json())
      .then((data) => {
        // Group raw data by Financial Year
        const grouped = data.reduce((acc, item) => {
          if (!acc[item.financial_year]) acc[item.financial_year] = [];
          acc[item.financial_year].push({
            title: item.document_type,
            link: item.pdf_path ? `${baseUrl}/uploads/${item.pdf_path}` : "#"
          });
          return acc;
        }, {});
        setGroupedData(grouped);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [baseUrl]);

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

      {loading && <p>Loading reports...</p>}

      {!loading && Object.keys(groupedData).length === 0 && <p className="empty-msg">No reports available.</p>}

      {Object.keys(groupedData)
        .sort((a, b) => b.localeCompare(a)) // Sort Years Descending
        .map((year) => (
          <div key={year} className="year-section">
            <h2 className="year-title">{year}</h2>
            <div className="doc-grid">
              {groupedData[year].map((doc, index) => (
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