import React, { useState } from "react";
import Dropdown from "../components/Dropdown.jsx";
import "./Announcements.css";

export default function Announcements() {
  const [category, setCategory] = useState("All Categories");
  const [year, setYear] = useState("All Years");

  const categoryOptions = [
    "All Categories",
    "Board Meetings",
    "Shareholders Meetings",
    "Postal Ballot",
    "Other Corporate Filings",
  ];

  const yearOptions = ["All Years", "2025", "2024", "2023", "2022"];

  // ✅ ANNOUNCEMENT DATA (YOU CONTROL PDFs HERE)
  const announcements = [
    {
      date: "22 Dec 2025",
      year: "2025",
      category: "Other Corporate Filings",
      title:
        "/Users/apple/Downloads/Newspaper Advertisement in relation to Filing of DRHP.pdf",
      pdf: "",
    },
    {
      date: "21 Dec 2025",
      year: "2025",
      category: "Other Corporate Filings",
      title:
        "Reply to the Clarification sought on increase in volume of shares of the Company (NSE)",
      pdf: "/pdfs/nse-clarification.pdf",
    },
    {
      date: "20 Dec 2025",
      year: "2025",
      category: "Postal Ballot",
      title:
        "Newspaper publication of Postal Ballot Notice and E-Voting intimation to Members",
      pdf: "/pdfs/postal-ballot-newspaper.pdf",
    },
    {
      date: "19 Dec 2025",
      year: "2025",
      category: "Postal Ballot",
      title: "Notice of Postal Ballot seeking shareholder approval",
      pdf: "/pdfs/postal-ballot-notice.pdf",
    },
    {
      date: "19 Dec 2025",
      year: "2025",
      category: "Postal Ballot",
      title: "Postal Ballot Notice",
      pdf: "/pdfs/postal-ballot.pdf",
    },
  ];

  // ✅ FILTER LOGIC
  const filteredAnnouncements = announcements.filter((item) => {
    const categoryMatch =
      category === "All Categories" || item.category === category;
    const yearMatch = year === "All Years" || item.year === year;
    return categoryMatch && yearMatch;
  });

  return (
    <div className="ann-page">
      <h1 className="ann-title">Announcements</h1>

      {/* FILTERS */}
      <div className="ann-filters">
        <Dropdown
          value={category}
          options={categoryOptions}
          onChange={setCategory}
        />
        <Dropdown value={year} options={yearOptions} onChange={setYear} />
      </div>

      {/* ANNOUNCEMENT LIST */}
      <div className="ann-list">
        {filteredAnnouncements.length === 0 ? (
          <p className="ann-empty">No announcements available</p>
        ) : (
          filteredAnnouncements.map((item, index) => (
            <div key={index} className="ann-item">
              <div className="ann-date">{item.date}</div>

              <a
                href={item.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="ann-text"
              >
                {item.title}
              </a>

              <div className="ann-divider"></div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
