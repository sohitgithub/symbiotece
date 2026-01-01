import React, { useState, useEffect } from "react";

export default function AnnualSubsidiaries() {
  const [data, setData] = useState({});
  const [allYears, setAllYears] = useState([]);
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  // ✅ UPDATED: Companies List (Added Navisci)
  const companies = [
    "Knovea Pharmaceutical Private Limited",
    "Symbiotec Zenfold Private Limited",
    "Navisci Pte. Ltd."
  ];

  useEffect(() => {
    fetch(`${baseUrl}/api/annual-subsidiaries/public`)
      .then((res) => res.json())
      .then((apiData) => {
        const transformed = {};
        const yearsSet = new Set();

        apiData.forEach((item) => {
          yearsSet.add(item.financial_year);
          if (!transformed[item.financial_year]) transformed[item.financial_year] = {};
          
          transformed[item.financial_year][item.document_type] = item.pdf_path 
            ? `${baseUrl}/uploads/${item.pdf_path}` 
            : null;
        });

        setData(transformed);
        setAllYears(Array.from(yearsSet).sort((a, b) => b.localeCompare(a)));
      })
      .catch((err) => console.error(err));
  }, [baseUrl]);

  const [start, setStart] = useState(0);
  const visibleYears = allYears.slice(start, start + 3);

  return (
    <div className="subsidiary-wrapper">
      <style>{`
        .subsidiary-wrapper { width: 100%; font-family: Inter, sans-serif; }
        .year-nav { display: flex; align-items: center; justify-content: center; gap: 60px; margin-bottom: 18px; color: #374151; }
        .year-btn { border: none; background: none; font-size: 22px; cursor: pointer; color: #9ca3af; }
        .year-btn:disabled { opacity: 0.3; cursor: default; }
        .year-list { display: flex; gap: 120px; font-size: 16px; font-weight: 500; color: #374151; }
        table { width: 100%; border-collapse: collapse; }
        thead th { font-size: 14px; font-weight: 500; color: #6b7280; padding: 14px 10px; text-align: center; }
        thead th:first-child { text-align: left; }
        tbody tr { border-top: 1px solid #e5e7eb; }
        tbody td { padding: 22px 10px; font-size: 14px; color: #374151; }
        .company { line-height: 1.6; }
        .report { text-align: center; }
        .report a { color: #374151; text-decoration: none; border-bottom: 1px dotted #9ca3af; font-weight: 500; }
        .dash { color: #cbd5e1; font-size: 16px; }
      `}</style>

      <div className="year-nav">
        <button className="year-btn" disabled={start === 0} onClick={() => setStart(s => s - 1)}>‹</button>
        <div className="year-list">
          {visibleYears.map(y => <span key={y}>{y}</span>)}
        </div>
        <button className="year-btn" disabled={start + 3 >= allYears.length} onClick={() => setStart(s => s + 1)}>›</button>
      </div>

      <table>
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
                  {data[year]?.[company] ? (
                    <a href={data[year][company]} target="_blank" rel="noopener noreferrer">Annual report</a>
                  ) : (<span className="dash">–</span>)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}