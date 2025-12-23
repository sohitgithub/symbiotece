import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Performance.css";

import PerformanceTabs from "../performanceComponents/PerformanceTabs";
import QuarterlyResults from "../performanceComponents/QuarterlyResults";
import AnnualCompany from "../performanceComponents/AnnualCompany";
import AnnualSubsidiaries from "../performanceComponents/AnnualSubsidiaries";
import AnnualGroup from "../performanceComponents/AnnualGroup";
// import OfferDocuments from "../performanceComponents/OfferDocuments"; // Uncomment if you have this

// --- 1. INTERNAL ICON COMPONENT ---
const DocumentIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" />
    <path d="M14 2V8H20" />
    <path d="M16 13H8" />
    <path d="M16 17H8" />
    <path d="M10 9H8" />
  </svg>
);

// --- 2. INTERNAL DATA ---
const secretarialData = [
  { id: 401, title: "Annual Returns - Knovea 2022", link: "https://drive.google.com/file/d/1EtQZmlJY2LTa59V6ql2NMABJneNOk4hj/view?usp=sharing" },
  { id: 402, title: "Annual Returns - Knovea 2023", link: "https://drive.google.com/file/d/1SrdG_DVHTNpLKhPAtk1hw29tYm0Rbs1j/view?usp=sharing" },
  { id: 403, title: "Annual Returns - Knovea 2024", link: "https://drive.google.com/file/d/1VFvdmJy0_6xtFEDMs6i3uknwn3x2JXI-/view?usp=sharing" },
  { id: 404, title: "Annual Returns - Symbiotec 2022", link: "https://drive.google.com/file/d/1XRJXh1zTqXHjjbDQvPGaXej9yeLEFKHk/view?usp=sharing" },
  { id: 405, title: "Annual Returns - Symbiotec 2023", link: "https://drive.google.com/file/d/1YTIxjIQTQ_y8EfgLJ6EG_LsAianDoTdL/view?usp=sharing" },
  { id: 406, title: "Annual Returns - Symbiotec 2024", link: "https://drive.google.com/file/d/1Zs2DqrgQRBCOELQ5VykwH-F-fYYhl8J7/view?usp=sharing" },
  { id: 407, title: "Annual Returns - SZPL 2022", link: "https://drive.google.com/file/d/1d6pk0JjVWFDGgMQXJJ8dMRYmFaRDUtUB/view?usp=sharing" },
  { id: 408, title: "Annual Returns - SZPL 2023", link: "https://drive.google.com/file/d/1fZoZ-wBQdGl6A4wO9aUIkY8UjqCGJjmb/view?usp=sharing" },
  { id: 409, title: "Annual Returns - SZPL 2024", link: "https://drive.google.com/file/d/1kZAz-VU4FiEI-Hx4VsGUbUsnGmWo9WIK/view?usp=sharing" },
];

export default function Performance() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const tabFromURL = params.get("tab");
  const annualFromURL = params.get("annualTab");

  const [activeTab, setActiveTab] = useState("quarterly");
  const [annualTab, setAnnualTab] = useState("company");

  useEffect(() => {
    // Check for Secretarial tab in URL
    if (tabFromURL === "Secretarial") {
      setActiveTab("annual");
      setAnnualTab("secretarial");
    }
    // Check for Annual tab
    else if (tabFromURL === "annual") {
      setActiveTab("annual");
      if (annualFromURL) setAnnualTab(annualFromURL);
      else setAnnualTab("company");
    }
    // Check for Quarterly
    else if (tabFromURL === "quarterly") {
      setActiveTab("quarterly");
    }
  }, [tabFromURL, annualFromURL]);

  return (
    <div className="performance-page">
      {/* Internal Styles for the Secretarial Cards */}
      <style>{`
        .doc-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 24px; padding-top: 20px; }
        .doc-card { display: flex; flex-direction: column; justify-content: space-between; height: 180px; padding: 24px; background-color: #fff; border: 1px solid #e5e7eb; border-radius: 12px; text-decoration: none; transition: all 0.3s ease; }
        .doc-card:hover { border-color: #93c5fd; box-shadow: 0 10px 25px rgba(37, 99, 235, 0.1); transform: translateY(-4px); }
        .doc-icon-wrapper { width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; border-radius: 10px; background-color: #f3f4f6; color: #6b7280; transition: all 0.3s ease; }
        .doc-card:hover .doc-icon-wrapper { background-color: #eff6ff; color: #2563eb; }
       
      `}</style>

      <PerformanceTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        annualTab={annualTab}
        setAnnualTab={setAnnualTab}
      />

      {/* MAIN CONTENT */}
      {activeTab === "quarterly" && <QuarterlyResults />}

      {activeTab === "annual" && (
        <>
          {annualTab === "company" && <AnnualCompany />}
          {annualTab === "subsidiaries" && <AnnualSubsidiaries />}
          {annualTab === "group" && <AnnualGroup />}
          
          {/* RENDER SECRETARIAL COMPLIANCE SECTION */}
          {annualTab === "secretarial" && (
            <div className="tab-content-container">
               <div className="doc-grid">
                  {secretarialData.map((doc) => (
                    <a
                      key={doc.id}
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
          )}
        </>
      )}
    </div>
  );
}