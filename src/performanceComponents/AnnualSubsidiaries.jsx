import React, { useState } from "react";

export default function AnnualSubsidiaries() {

  // 🔹 YOUR CONTENT (REAL PDFs)
  const data = {
  "2024-25": {
    "Knovea Pharmaceutical Private Limited": "https://drive.google.com/file/d/1mvvZEhx1DgCSTK4zRml-ePrNTasQ5ep8/view",
    "Symbiotec Zenfold Private Limited": "https://drive.google.com/file/d/1iKdzzOQlcG_5pktz0vyj4PbsQBMHFoMD/view",
  },
  "2023-24": {
    "Knovea Pharmaceutical Private Limited": "https://drive.google.com/file/d/1vvySq5yl4OoMzJTXjcjGFHYn9SbiRE45/view",
    "Symbiotec Zenfold Private Limited": "https://drive.google.com/file/d/1X14QQ8MTts_Y_qmcS9MuOT7YxLJhjxco/view",
  },
  "2022-23": {
    "Knovea Pharmaceutical Private Limited": "https://drive.google.com/file/d/13BWjGI_bNKBMbxUBny1JOt3PPF_f80WA/view",
  },
  "2021-22": {
    "Symbiotec Zenfold Private Limited": "https://drive.google.com/file/d/1zj6vDHrPB5GEYAtDr5jZloPUBl9CY6FL/view",
  },
};

  const companies = [
  "Knovea Pharmaceutical Private Limited",
  "Symbiotec Zenfold Private Limited",
];

  const allYears = Object.keys(data).sort((a, b) => b.localeCompare(a));

  // show 3 years at a time
  const [start, setStart] = useState(0);
  const visibleYears = allYears.slice(start, start + 3);

  return (
    <div className="subsidiary-wrapper">
      <style>{`
        .subsidiary-wrapper {
          width: 100%;
          font-family: Inter, sans-serif;
        }

        /* ===== YEAR NAV ===== */
        .year-nav {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 60px;
          margin-bottom: 18px;
          color: #374151;
        }

        .year-btn {
          border: none;
          background: none;
          font-size: 22px;
          cursor: pointer;
          color: #9ca3af;
        }

        .year-btn:disabled {
          opacity: 0.3;
          cursor: default;
        }

        .year-list {
          display: flex;
          gap: 120px;
          font-size: 16px;
          font-weight: 500;
          color: #374151;
        }

        /* ===== TABLE ===== */
        table {
          width: 100%;
          border-collapse: collapse;
        }

        thead th {
          font-size: 14px;
          font-weight: 500;
          color: #6b7280;
          padding: 14px 10px;
          text-align: center;
        }

        thead th:first-child {
          text-align: left;
        }

        tbody tr {
          border-top: 1px solid #e5e7eb;
        }

        tbody td {
          padding: 22px 10px;
          font-size: 14px;
          color: #374151;
        }

        .company {
          line-height: 1.6;
        }

        .report {
          text-align: center;
        }

        .report a {
          color: #374151;
          text-decoration: none;
          border-bottom: 1px dotted #9ca3af;
          font-weight: 500;
        }

        .report a:hover {
          color: #111827;
          border-color: #111827;
        }

        .dash {
          color: #cbd5e1;
          font-size: 16px;
        }
      `}</style>

      {/* ===== YEAR NAVIGATION ===== */}
      <div className="year-nav">
        <button
          className="year-btn"
          disabled={start === 0}
          onClick={() => setStart(s => s - 1)}
        >
          ‹
        </button>

        <div className="year-list">
          {visibleYears.map(y => (
            <span key={y}>{y}</span>
          ))}
        </div>

        <button
          className="year-btn"
          disabled={start + 3 >= allYears.length}
          onClick={() => setStart(s => s + 1)}
        >
          ›
        </button>
      </div>

      {/* ===== TABLE ===== */}
      <table>
        <thead>
          <tr>
            <th></th>
            {visibleYears.map(y => (
              <th key={y}>{y}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {companies.map(company => (
            <tr key={company}>
              <td className="company">{company}</td>

              {visibleYears.map(year => (
                <td key={year} className="report">
                  {data[year]?.[company] ? (
                    <a
                      href={data[year][company]}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Annual report
                    </a>
                  ) : (
                    <span className="dash">–</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
