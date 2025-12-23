import React from "react";
import { Link } from "react-router-dom";

// --- HELPER: Fixes Google Drive Links ---
const getImageUrl = (url) => {
  if (!url) return "";
  if (url.includes("drive.google.com")) {
    const idMatch = url.match(/\/d\/(.*?)\//);
    if (idMatch && idMatch[1]) {
      return `https://drive.google.com/uc?export=view&id=${idMatch[1]}`;
    }
  }
  return url;
};

export default function Board() {
  // --- STATIC DATA ONLY ---
  const members = [
    {
      img: "/images/boardimages/board-anil-satwani.png",
      name: "Mr Anil Satwani",
      role: "Chairman and Managing Director",
      slug: "anil-satwani",
    },
    {
      // Google Drive Link
      img: "/images/boardimages/board-anil-satwani.png",
      name: "Mr Hariharnath Buggana1111",
      role: "Nominee Director",
      slug: "hariharnath-buggana",
    },
    {
      img: "/images/boardimages/board-Sunita-Kishnani.png",
      name: "Mrs Sunita Kishnani",
      role: "Independent Director",
      slug: "sunita-kishnani",
    },
    {
      img: "/images/boardimages/board-pratik.png",
      name: "Mr Pratik Patel",
      role: "Managing Director",
      slug: "pratik-patel",
    },
    {
      img: "/images/boardimages/board-rohit.png",
      name: "Mr Rohit Mantri",
      role: "Nominee Director",
      slug: "rohit-mantri",
    },
    {
      img: "/images/boardimages/board-richard-kenny.png",
      name: "Mr Richard P F Kenny",
      role: "Independent Director",
      slug: "richard-kenny",
    },
  ];

  return (
    <div className="sb-section-wrapper">
      {/* --- EMBEDDED CSS --- */}
      <style>{`
        /* Container */
        .sb-section-wrapper {
          padding: 40px 20px;
          max-width: 1200px;
          margin: 0 auto;
          font-family: 'Inter', sans-serif;
        }

        /* Grid Layout */
        .sb-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 30px;
          justify-content: center;
        }

        /* Card Style */
        .sb-card {
          display: flex;
          flex-direction: column;
          background-color: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          overflow: hidden;
          text-decoration: none;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }

        .sb-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
          border-color: #bfdbfe; /* Light Blue Border on Hover */
        }

        /* Image Area */
        .sb-img-container {
          width: 100%;
          aspect-ratio: 3 / 4; /* Portrait Aspect Ratio */
          background-color: #f3f4f6;
          overflow: hidden;
          border-bottom: 1px solid #f0f0f0;
        }

        .sb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          transition: transform 0.5s ease;
        }

        .sb-card:hover .sb-img {
          transform: scale(1.03); /* Slight Zoom on Hover */
        }

        /* Text Area */
        .sb-card-inner {
          padding: 0; /* Wrapper inside card */
        }

        .sb-info {
          padding: 20px 15px;
          text-align: center;
        }

        .sb-name {
          margin: 0 0 8px 0;
          font-size: 1.15rem;
          font-weight: 700;
          color: #111827;
          transition: color 0.2s;
        }

        .sb-card:hover .sb-name {
          color: #2563eb; /* Blue Text on Hover */
        }

        .sb-role {
          margin: 0;
          font-size: 0.95rem;
          color: #6b7280;
          font-weight: 500;
          line-height: 1.4;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .sb-grid {
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
            gap: 20px;
          }
        }
      `}</style>

      {/* --- CONTENT --- */}
      <div className="sb-grid">
        {members.map((m) => (
          <Link to={`/board/${m.slug}`} className="sb-card" key={m.slug}>
            <div className="sb-img-container">
              <img
                src={getImageUrl(m.img)}
                className="sb-img"
                alt={m.name}
                referrerPolicy="no-referrer" /* Vital for Drive Images */
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/300x400?text=No+Image";
                }}
              />
            </div>
            <div className="sb-info">
              <h3 className="sb-name">{m.name}</h3>
              <p className="sb-role">{m.role}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}