import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../governanceComponents/CommitteeComposition.css"

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

// --- Video Icon ---
const VideoIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="23 7 16 12 23 17 23 7"></polygon>
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
  </svg>
);

// --- Link Icon ---
const LinkIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
  </svg>
);

export default function GovernancePage() {
  const [activeTab, setActiveTab] = useState("Board");
  const [annualTab, setAnnualTab] = useState("Company");

  const [subsidiaryStart, setSubsidiaryStart] = useState(0);

  // ✅ STATE
  const [boardMembers, setBoardMembers] = useState([]);
  const [committeeMembers, setCommitteeMembers] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [offerDocuments, setOfferDocuments] = useState([]);
  const [shareholdingPatterns, setShareholdingPatterns] = useState([]);
  const [secretarialDocs, setSecretarialDocs] = useState([]);
  const [materialCreditors, setMaterialCreditors] = useState([]);
  const [industryReports, setIndustryReports] = useState([]);
  const [disclosures, setDisclosures] = useState([]);

  const location = useLocation();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;


  const renderCompanySection = () => {
    const companyDocs = secretarialDocs.filter(doc => doc.category === "Company");

    // Grouping logic
    const grouped = companyDocs.reduce((acc, doc) => {
      const year = doc.financial_year || "Other";
      if (!acc[year]) acc[year] = [];
      acc[year].push(doc);
      return acc;
    }, {});

    // Sort years descending (2024-25, 2023-24...)
    const sortedYears = Object.keys(grouped).sort().reverse();

    if (sortedYears.length === 0) {
      return <div className="empty-state">No company documents found.</div>;
    }

    return sortedYears.map(year => (
      <div key={year} className="year-group-container">
        <h2 className="year-group-title">{year}</h2>
        <div className="doc-grid">
          {grouped[year].map((doc) => (
            <a
              key={doc.id}
              href={`${baseUrl}/uploads/${doc.pdf_path}`}
              target="_blank"
              rel="noopener noreferrer"
              className="doc-card"
            >
              <div className="doc-icon-wrapper"><DocumentIcon /></div>
              <div className="doc-info">
                <p className="doc-title">{doc.title}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    ));
  };

  const tabs = [
    "Board", "Committee Composition", "Policies", "Offer Documents",
    "Shareholding Pattern", "Secretarial & Regulatory Compliance",
    "Material Creditors", "Industry Report", "Disclosures"
  ];

  // --- FETCH DATA ---
  useEffect(() => {
    fetch(`${baseUrl}/api/board-members/public`).then(res => res.json()).then(data => setBoardMembers(data)).catch(err => console.error(err));
    fetch(`${baseUrl}/api/committees/public`).then(res => res.json()).then(data => setCommitteeMembers(data)).catch(err => console.error(err));
    fetch(`${baseUrl}/api/policies/public`).then(res => res.json()).then(data => setPolicies(data)).catch(err => console.error(err));
    fetch(`${baseUrl}/api/offer-documents/public`).then(res => res.json()).then(data => setOfferDocuments(data)).catch(err => console.error(err));
    fetch(`${baseUrl}/api/shareholding-patterns/public`).then(res => res.json()).then(data => setShareholdingPatterns(data)).catch(err => console.error(err));
    fetch(`${baseUrl}/api/secretarial-compliance/public`).then(res => res.json()).then(data => setSecretarialDocs(data)).catch(err => console.error(err));
    fetch(`${baseUrl}/api/material-creditors/public`).then(res => res.json()).then(data => setMaterialCreditors(data)).catch(err => console.error(err));
    fetch(`${baseUrl}/api/industry-reports/public`).then(res => res.json()).then(data => setIndustryReports(data)).catch(err => console.error(err));
    fetch(`${baseUrl}/api/disclosures/public`).then(res => res.json()).then(data => setDisclosures(data)).catch(err => console.error(err));
  }, [baseUrl]);

  const getMembersByCommittee = (committeeName) => {
    return committeeMembers.filter(m => m.committee_name === committeeName);
  }

  // --- TAB SWITCH LOGIC ---
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabFromUrl = params.get("tab");
    if (tabFromUrl && tabs.includes(tabFromUrl)) {
      setActiveTab(tabFromUrl);
    }
  }, [location.search]);


  // --- SUBSIDIARIES DATA PROCESSING ---
  const companies = [
    "Knovea Pharmaceutical Private Limited",
    "Symbiotec Zenfold Private Limited",
    "Navisci Pte. Ltd.",
  ];

  const processSubsidiaryData = () => {
    const matrix = {};
    const allYearsSet = new Set();

    // Filter for subsidiaries
    const subDocs = secretarialDocs.filter(doc => doc.category === "Subsidiaries");

    subDocs.forEach(doc => {
      let year = doc.financial_year;
      if (!year) {
        const yearMatch = doc.title.match(/\d{4}-\d{2}/) || doc.title.match(/\d{4}/);
        year = yearMatch ? yearMatch[0] : "Other";
      }

      let company = null;
      const lowerTitle = doc.title.toLowerCase();

      // ✅ Logic updated to recognize Navisci
      if (lowerTitle.includes("knovea")) {
        company = companies[0];
      } else if (lowerTitle.includes("zenfold") || lowerTitle.includes("szpl")) {
        company = companies[1];
      } else if (lowerTitle.includes("navisci")) {
        company = companies[2]; // Maps to Navisci row
      }

      if (company && year) {
        allYearsSet.add(year);
        if (!matrix[year]) matrix[year] = {};
        matrix[year][company] = doc.pdf_path;
      }
    });

    const sortedYears = Array.from(allYearsSet).sort().reverse();
    return { matrix, sortedYears };
  };

  const { matrix, sortedYears } = processSubsidiaryData();
  const visibleYears = sortedYears.slice(subsidiaryStart, subsidiaryStart + 3);


  return (
    <div className="governance-container">
      {/* Styles */}
      <style>{`
        .governance-container { padding: 20px; font-family: 'Inter', system-ui, sans-serif; max-width: 1400px; margin: 0 auto; }
        .governance-tabs { display: flex; gap: 30px; border-bottom: 1px solid #e5e7eb; margin-bottom: 30px; overflow-x: auto; scrollbar-width: none; }
        .governance-tabs::-webkit-scrollbar { display: none; }
        .gov-tab { background: none; border: none; font-size: 15px; color: #6b7280; padding: 12px 0; cursor: pointer; white-space: nowrap; border-bottom: 2px solid transparent; transition: all 0.2s; font-weight: 500; }
        .gov-tab:hover { color: #2563eb; }
        .gov-tab.active { color: #2563eb; border-bottom: 2px solid #2563eb; font-weight: 600; }
        
        .doc-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 24px; }
        .doc-card { display: flex; flex-direction: column; justify-content: space-between; height: 180px; padding: 24px; background-color: #fff; border: 1px solid #e5e7eb; border-radius: 12px; text-decoration: none; transition: all 0.3s ease; }
        .doc-card:hover { border-color: #93c5fd; box-shadow: 0 10px 25px rgba(37, 99, 235, 0.1); transform: translateY(-4px); }
        .doc-icon-wrapper { width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; border-radius: 10px; background-color: #f3f4f6; color: #6b7280; transition: all 0.3s ease; }
        .doc-card:hover .doc-icon-wrapper { background-color: #eff6ff; color: #2563eb; }
        .board-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; padding-top: 10px; }
        .board-member-card { display: flex; width:90%; flex-direction: column; background-color: #fff; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden; transition: all 0.3s ease; text-decoration: none; }
        .board-member-card:hover { transform: translateY(-8px); box-shadow: 0 12px 24px rgba(0,0,0,0.1); border-color: #bfdbfe; }
        .board-img { width: 100%; height:300px; aspect-ratio: 3/4; object-fit: cover; object-position: top center; background-color: #f3f4f6; border-bottom: 1px solid #f0f0f0; }
        .board-info-box { padding: 20px 15px; text-align: center; }
        .board-name { margin: 0 0 8px 0; font-size: 19px; font-weight: 700; color: #111827; transition: color 0.3s ease; }
        .board-member-card:hover .board-name { color: #2563eb; }
        .board-role { margin: 0; font-size: 15px; color: #6b7280; font-weight: 500; line-height: 1.4; }
        .empty-state { padding: 60px; text-align: center; color: #9ca3af; background: #f9fafb; border-radius: 12px; border: 1px dashed #e5e7eb; }
        
        .annual-tabs button { padding: 8px 16px; border: 1px solid #e5e7eb; background: #fff; cursor: pointer; margin-right: 10px; border-radius: 30px; transition: all 0.2s; }
        .annual-tabs button.active { background: #f3f3f3; color: #111827; font-weight: 600; border-color: #d1d5db; }

        .disclosures-wrapper { margin-top: 20px; }
        .disclosures-heading { font-size: 20px; font-weight: 600; color: #1f2937; margin-bottom: 20px; }
        .disclosures-table { border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; }
        .disclosures-row { display: flex; padding: 20px 20px; border-bottom: 1px solid #e5e7eb; align-items: center; }
        .disclosures-header { background-color: #f9fafb; font-weight: 600; color: #4b5563; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; }
        .col-index { width: 50px; text-align: center; color: #9ca3af; font-weight: 500; }
        .col-name { flex: 1; font-weight: 500; color: #374151; padding-left: 20px; }
        .col-link { width: 60px; display: flex; justify-content: center; }
        .col-link a { transition: color 0.2s; color: #2563eb; }
        .col-link a:hover { color: #1d4ed8; }

        /* SUBSIDIARIES TABLE */
        .subsidiary-wrapper { width: 100%; font-family: Inter, sans-serif; margin-top: 20px; }
        .year-nav { display: flex; align-items: center; justify-content: center; gap: 40px; margin-bottom: 18px; color: #374151; background: #f9fafb; padding: 10px; border-radius: 8px; }
        .year-btn { border: 1px solid #ddd; background: white; width: 30px; height: 30px; border-radius: 50%; font-size: 18px; cursor: pointer; color: #9ca3af; display: flex; align-items: center; justify-content: center; transition: 0.2s; }
        .year-btn:hover:not(:disabled) { border-color: #2563eb; color: #2563eb; }
        .year-btn:disabled { opacity: 0.3; cursor: default; }
        .year-list { display: flex; gap: 80px; font-size: 15px; font-weight: 600; color: #374151; }
        .sub-table { width: 100%; border-collapse: collapse; }
        .sub-table thead th { font-size: 14px; font-weight: 600; color: #6b7280; padding: 14px 10px; text-align: center; background: #f9fafb; border-bottom: 1px solid #e5e7eb; }
        .sub-table thead th:first-child { padding-left: 20px; }
        .sub-table tbody tr { border-bottom: 1px solid #e5e7eb; }
        .sub-table tbody td { padding: 22px 10px; font-size: 14px; color: #374151; text-align: center; }
.sub-table td.company {
  text-align: left;
  padding-left: 20px;
  font-weight: 500;
  color: #111827;
  width: 35%; /* Reduced slightly from 40% to fit 3 companies better */
}        .sub-table .report a { color: #19191aff; text-decoration: none; border-bottom: 1px dotted #9ca3af; font-weight: 500; transition: 0.2s; }
        .sub-table .report a:hover { color: #111827; border-color: #111827; }

        .year-group-container {
  margin-bottom: 40px;
}

.year-group-title {
  font-size: 24px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 2px solid #f3f4f6; /* Subtle line under the year */
}

.company-annual-returns {
  margin-top: 20px;
}

.committee-block {
  margin-bottom: 40px;
}

.committee-title {
  font-size: 18px;
  font-weight: 700;
  color: #374151;
  margin-bottom: 10px;
}



.committee-wrapper { margin-top: 10px; } .committee-section { margin-bottom: 50px; border-bottom: 1px solid #f0f0f0; padding-bottom: 20px; } .committee-heading { font-size: 18px; font-weight: 700; color: #374151; margin-bottom: 25px; } .committee-grid { display: flex; flex-wrap: wrap; gap: 40px 80px; } .committee-member { min-width: 200px; } .member-name { font-size: 16px; font-weight: 700; color: #111827; margin: 0 0 4px 0; } .member-designation { font-size: 14px; color: #6b7280; margin: 0; font-weight: 400; } .member-role { font-size: 13px; color: #9ca3af; margin: 2px 0 0 0; }
        
      `}</style>

      {/* TABS MENU */}
      <div className="governance-tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`gov-tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* CONTENT AREA */}
      <div className="tab-content-area">

        {/* 1. BOARD TAB */}
        {activeTab === "Board" ? (
          <div className="board-grid">
            {boardMembers.length > 0 ? (
              boardMembers.map((member) => (
                <Link to={`/board/${member.slug}`} key={member.id} className="board-member-card">
                  <img
                    src={member.image_path ? `${baseUrl}/uploads/${member.image_path}` : "https://via.placeholder.com/300x400?text=No+Image"}
                    alt={member.name}
                    className="board-img"
                    referrerPolicy="no-referrer"
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/300x400?text=No+Image'; }}
                  />
                  <div className="board-info-box">
                    <h3 className="board-name">{member.name}</h3>
                    <p className="board-role">{member.designation}</p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="empty-state">Loading Board Members...</div>
            )}
          </div>
        ) : activeTab === "Policies" ? (
          <div className="doc-grid">
            {policies.map((doc) => (
              <a key={doc.id} href={`${baseUrl}/uploads/${doc.pdf_path}`} target="_blank" rel="noopener noreferrer" className="doc-card">
                <div className="doc-icon-wrapper"><DocumentIcon /></div>
                <div className="doc-info"><p className="doc-title">{doc.title}</p></div>
              </a>
            ))}
          </div>
        ) : activeTab === "Offer Documents" ? (
          <div className="doc-grid">

         
            {/* <a
              href="/documents/drhp.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="doc-card"
            >
              <div className="doc-icon-wrapper">
                <DocumentIcon />
              </div>
              <div className="doc-info">
                <p className="doc-title">Draft Red Herring Prospectus (DRHP)</p>
              </div>
            </a>


               <a
              href="https://www.youtube.com/watch?v=beUCj3b8cWU"
              target="_blank"
              rel="noopener noreferrer"
              className="doc-card"
            >
              <div className="doc-icon-wrapper"><VideoIcon /></div>
              <div className="doc-info">
                <p className="doc-title">
Symbiotec Audio Visual DRHP-English</p>
              </div>
            </a>

            <a
              href="https://www.youtube.com/watch?v=PgtNXfkO2yY"
              target="_blank"
              rel="noopener noreferrer"
              className="doc-card"
            >
              <div className="doc-icon-wrapper"><VideoIcon /></div>
              <div className="doc-info">
                <p className="doc-title">Symbiotec Audio Visual DRHP-Hindi</p>
              </div>
            </a> */}


            {/* --- DYNAMIC CONTENT FROM BACKEND --- */}
            {offerDocuments.map((doc) => {
              const isExternal =
                doc.link && (doc.link.startsWith("http") || doc.link.startsWith("www"));
              const isFile = doc.pdf_path && !isExternal;

              let Icon = DocumentIcon;

              if (isFile) {
                const ext = doc.pdf_path.split(".").pop().toLowerCase();
                if (["mp4", "mov", "webm"].includes(ext)) Icon = VideoIcon;
              } else if (isExternal) {
                if (
                  doc.link.includes("youtube") ||
                  doc.link.includes("youtu.be") ||
                  doc.link.includes("vimeo")
                ) {
                  Icon = VideoIcon;
                } else {
                  Icon = LinkIcon;
                }
              }

              return (
                <a
                  key={doc.id}
                  href={
                    isFile
                      ? `${baseUrl}/uploads/${doc.pdf_path}`
                      : doc.link
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="doc-card"
                >
                  <div className="doc-icon-wrapper"><Icon /></div>
                  <div className="doc-info">
                    <p className="doc-title">{doc.title}</p>
                  </div>
                </a>
              );
            })}
          </div>
        ) : activeTab === "Shareholding Pattern" ? (

          <div className="doc-grid">
            {shareholdingPatterns.map((doc) => (
              <a key={doc.id} href={`${baseUrl}/uploads/${doc.pdf_path}`} target="_blank" rel="noopener noreferrer" className="doc-card">
                <div className="doc-icon-wrapper"><DocumentIcon /></div>
                <div className="doc-info"><p className="doc-title">{doc.title}</p></div>
              </a>
            ))}
          </div>
        ) : activeTab === "Secretarial & Regulatory Compliance" ? (
          <div className="annual-wrapper">
            <h3 className="committee-title">Annual Returns</h3>
            <div className="annual-tabs">
              <button className={annualTab === "Company" ? "active" : ""} onClick={() => setAnnualTab("Company")}>Company</button>
              <button className={annualTab === "Subsidiaries" ? "active" : ""} onClick={() => setAnnualTab("Subsidiaries")}>Subsidiaries</button>
            </div><br></br>

            {annualTab === "Company" ? (
              <div className="company-annual-returns">
                {renderCompanySection()}
              </div>
            ) : (
              <div className="subsidiary-wrapper">
                {sortedYears.length > 0 ? (
                  <>
                    <div className="year-nav">
                      <button className="year-btn" disabled={subsidiaryStart === 0} onClick={() => setSubsidiaryStart(s => s - 1)}>‹</button>
                      <div className="year-list">{visibleYears.map(y => <span key={y}>{y}</span>)}</div>
                      <button className="year-btn" disabled={subsidiaryStart + 3 >= sortedYears.length} onClick={() => setSubsidiaryStart(s => s + 1)}>›</button>
                    </div>

                    <table className="sub-table">
                      <thead>
                        <tr>
                          <th></th>
                          {visibleYears.map(y => <th key={y}>{y}</th>)}
                        </tr>
                      </thead>
                      <tbody>
                        {companies.map(company => (
                          <tr key={company}>
                            <td className="company">{company}</td>
                            {visibleYears.map(year => (
                              <td key={year} className="report">
                                {matrix[year]?.[company] ? (
                                  <a href={`${baseUrl}/uploads/${matrix[year][company]}`} target="_blank" rel="noopener noreferrer">Annual report</a>
                                ) : (<span className="dash">–</span>)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                ) : (
                  <div className="empty-state"><p>No subsidiary data found.</p></div>
                )}
              </div>
            )}
          </div>
        ) : activeTab === "Material Creditors" ? (
          <div className="doc-grid">
            {materialCreditors.map((doc) => (
              <a key={doc.id} href={`${baseUrl}/uploads/${doc.pdf_path}`} target="_blank" rel="noopener noreferrer" className="doc-card">
                <div className="doc-icon-wrapper"><DocumentIcon /></div>
                <div className="doc-info"><p className="doc-title">{doc.title}</p></div>
              </a>
            ))}
          </div>
        ) : activeTab === "Industry Report" ? (
          <div className="doc-grid">
            {industryReports.map((doc) => (
              <a key={doc.id} href={`${baseUrl}/uploads/${doc.pdf_path}`} target="_blank" rel="noopener noreferrer" className="doc-card">
                <div className="doc-icon-wrapper"><DocumentIcon /></div>
                <div className="doc-info"><p className="doc-title">{doc.title}</p></div>
              </a>
            ))}
          </div>
        ) : activeTab === "Disclosures" ? (
          <div className="disclosures-wrapper">
            <h3 className="disclosures-heading">Disclosures under Regulation 46 of SEBI (LODR) Regulations</h3>
            <div className="disclosures-table">
              <div className="disclosures-row disclosures-header">
                <div className="col-index">#</div><div className="col-name">Name</div><div className="col-link">Link</div>
              </div>
              {disclosures.map((item, index) => (
                <div key={item.id} className="disclosures-row">
                  <div className="col-index">{index + 1}</div>
                  <div className="col-name">{item.title}</div>
                  <div className="col-link">
                    <a href={item.is_pdf ? `${baseUrl}/uploads/${item.link}` : item.link} target="_blank" rel="noopener noreferrer">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3h7v7" /><path d="M10 14L21 3" /><path d="M21 14v7h-7" /><path d="M3 10v11h11" /></svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      {/* COMMITTEE COMPOSITION */}
      {activeTab === "Committee Composition" && (
        <div className="committee-wrapper">

          {[
            "Audit Committee",
            "Nomination and Remuneration Committee",
            "Stakeholder Relationship Committee",
            "Risk Management Committee",
            "Corporate Social Responsibility Committee"
          ].map((committeeName) => {
            const members = getMembersByCommittee(committeeName);

            if (!members.length) return null;

            return (
              <div key={committeeName} className="committee-section">
                <h3 className="committee-heading">{committeeName}</h3>

                <div className="committee-grid">
                  {members.map((member, index) => (
                    <div key={member.id || index} className="committee-member">
                      <p className="member-name">{member.member_name}</p>
                      <p className="member-designation">{member.designation}</p>
                      <p className="member-role">{member.role}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

        </div>
      )}

    </div>
  );
}