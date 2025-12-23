import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function MemberPage() {
  const { slug } = useParams();
  
  // State
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  // --- Fetch Data on Mount ---
  useEffect(() => {
    const fetchMember = async () => {
      try {
        setLoading(true);
        // Backend call matching the new route
        const res = await fetch(`${baseUrl}/api/board-members/public/${slug}`);
        
        if (!res.ok) {
            throw new Error("Member not found");
        }
        
        const data = await res.json();
        setMember(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching member:", err);
        setError(true);
        setLoading(false);
      }
    };

    if (slug) {
        fetchMember();
    }
  }, [slug, baseUrl]);

  // --- Image Helper ---
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://via.placeholder.com/400x500?text=No+Image";
    // Check if it's a full URL (like Google Drive) or a local upload
    if (imagePath.startsWith('http')) return imagePath;
    return `${baseUrl}/uploads/${imagePath}`;
  };

  // --- Loading / Error States ---
  if (loading) return <div style={{ padding: "100px", textAlign: "center", fontSize: "20px" }}>Loading Profile...</div>;
  if (error || !member) return <div style={{ padding: "100px", textAlign: "center", fontSize: "20px", color: "red" }}>Member not found in database.</div>;

  return (
    <div className="page-container">
      {/* --- INLINE CSS --- */}
      <style>{`
        .page-container {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          color: #333;
          max-width: 1200px;
          margin: 0 auto;
          padding: 160px 20px;
        }

        .profile-section {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 60px;
          margin-bottom: 80px;
        }

        .text-content {
          flex: 1;
          padding-top: 10px;
        }

        .member-name {
          font-size: 42px;
          font-weight: 800;
          color: #111827;
          margin: 0 0 10px 0;
          letter-spacing: -0.5px;
        }

        .member-role {
          font-size: 20px;
          color: #6b7280;
          margin: 0 0 30px 0;
          font-weight: 400;
        }

        .member-bio {
          font-size: 16px;
          line-height: 1.8;
          color: #4b5563;
          white-space: pre-line;     
          text-align: justify;      
          text-justify: inter-word;  
        }

        .image-wrapper {
          flex: 0 0 400px;
          display: flex;
          justify-content: center;
        }

        .member-img {
          width: 80%;
          height: 400px;
          border-radius: 8px;
          object-fit: cover;
          object-position: top center;
          background-color: #f3f4f6;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        @media (max-width: 900px) {
          .profile-section {
            flex-direction: column-reverse;
            align-items: center;
            gap: 40px;
          }
          .text-content { text-align: center; }
          .member-bio { text-align: left; }
          .image-wrapper { flex: auto; width: 100%; max-width: 350px; }
        }
      `}</style>

      {/* --- CONTENT --- */}
      <div className="profile-section">
        
        {/* Left Side: Text */}
        <div className="text-content">
          <h1 className="member-name">{member.name}</h1>
          <h2 className="member-role">{member.designation}</h2>
          {/* Default text if bio is missing */}
          <p className="member-bio">
            {member.bio || "Biography details not available yet."}
          </p>
        </div>

        {/* Right Side: Image */}
        <div className="image-wrapper">
          <img 
            src={getImageUrl(member.image_path)} 
            alt={member.name} 
            className="member-img"
            referrerPolicy="no-referrer"
            onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/400x500?text=No+Image";
            }}
          />
        </div>
      
      </div>

    </div>
  );
}