import React, { useEffect, useState } from "react";
import Dropdown from "../components/Dropdown.jsx";
import "./Announcements.css";

const API_BASE = "https://symb.connectbizora.com";

export default function Announcements() {
  const [category, setCategory] = useState("All Categories");
  const [year, setYear] = useState("All Years");
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoryOptions = [
    "All Categories",
    "Board Meetings",
    "Shareholders Meetings",
    "Postal Ballot",
    "Other Corporate Filings",
  ];

  const yearOptions = ["All Years", "2025", "2024", "2023", "2022"];

  useEffect(() => {
    fetchAnnouncements();
  }, [category, year]);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams();
      if (category !== "All Categories") params.append("category", category);
      if (year !== "All Years") params.append("year", year);

      const res = await fetch(
        `${API_BASE}/api/announcements?${params.toString()}`
      );

      const data = await res.json();
      setAnnouncements(data);
    } catch (error) {
      console.error("Failed to load announcements", error);
    } finally {
      setLoading(false);
    }
  };

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

      {/* LIST */}
      <div className="ann-list">
        {loading ? (
          <p className="ann-empty">Loading announcements...</p>
        ) : announcements.length === 0 ? (
          <p className="ann-empty">No announcements available</p>
        ) : (
          announcements.map((item) => (
            <div key={item.id} className="ann-item">
              <div className="ann-date">
                {new Date(item.announcement_date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </div>

              <a
                href={`${API_BASE}${item.pdf_url}`}
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
