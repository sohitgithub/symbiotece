import React from "react";
import { useParams, Link } from "react-router-dom";

// --- Magic Image Function ---
const getImageUrl = (url) => {
  if (!url) return '';
  if (url.includes('drive.google.com')) {
    const idMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (idMatch && idMatch[1]) {
      return `https://lh3.googleusercontent.com/d/${idMatch[1]}`;
    }
  }
  return url;
};

export default function MemberPage() {
  const { slug } = useParams();

  // Data
  const members = {
    "anil-satwani": {
      name: "Mr Anil Satwani",
      role: "Chairman and Managing Director",
      img: "/images/boardimages/board-anil-satwani.png",
      bio: `Anil Satwani is the Chairman and Managing Director on the Board of our Company.
            He has been associated with our Company since its incorporation. He holds a bachelor’s
            degree in science from Holkar Science College, Devi Ahilya Vishwavidyalaya, Indore, a 
            master’s of arts degree in economics from Indore Christian College, Devi Ahilya Vishwavidyalaya, 
            Indore and a master’s degree in business administration from the Institute of Management Studies, Devi Ahilya Vishwavidyalaya, Indore. He has approximately 30 years of experience in the pharmaceutical sector. In our Company, he is responsible for the overall management related to quality, production and finance.`,
    },
    "hariharnath-buggana": {
      name: "Mr Hariharnath Buggana",
      role: "Nominee Director",
      img: "https://drive.google.com/file/d/1ZZz24_v2cOu326IDPJSdcazuUbR3rl8y/view?usp=drive_link",
      bio: `Hariharnath Buggana is a Nominee Director on the Board of our Company. 
            He holds a bachelor’s degree in engineering (chemical) from the Pravara 
            Education Society’s College of Engineering, Loni (Ahmednagar), University 
            of Poona, a master’s of science degree in chemical engineering from the College 
            of Engineering and Science, Illinois Institute of Technology and a master’s degree 
            in management from the J. L. Kellogg Graduate School of Management, Northwestern University.`,
    },
    "sunita-kishnani": {
      name: "Mrs Sunita Kishnani",
      role: "Independent Director",
      img: "/images/boardimages/board-Sunita-Kishnani.png",
      bio: `Sunita Kishnani is an Independent Director on the Board of our Company. 
            She holds a bachelor’s degree in commerce from Devi Ahilya Vishwavidyalaya, 
            Indore. She has approximately 30 years of experience in the marketing sector.`,
    },
    "pratik-patel": {
      name: "Mr Pratik Patel",
      role: "Independent Director",
      img: "/images/boardimages/board-pratik.png",
      bio: `Mr. Pratik Patel is the Managing Director of Jash Engineering Limited, a publicly listed company.
            He holds a Bachelor's degree in Production Engineering from Sardar Patel University and an MBA in Finance from Devi Ahilya Vishwavidyalaya, Indore.`,
    },
    "rohit-mantri": {
      name: "Mr Rohit Mantri",
      role: "Independent Director",
      img: "/images/boardimages/board-rohit.png",
      bio: `Rohit leads the life sciences and healthcare investments at Motilal Oswal Private Equity (MOPE). He has over 15 years of experience in the life sciences sector in private equity and investment banking. Before joining MOPE in 2015, Rohit worked as an Associate Director at KPMG in the investment banking business, responsible for origination and execution of M&A, private equity, financial restructuring and joint venture transactions. Rohit is also a member of the Institute of Chartered Accountants of India (all-India rank holder) and a qualified Company Secretary.`,
    },
    "richard-kenny": {
      name: "Mr Richard P F Kenny",
      role: "Independent Director",
      img: "/images/boardimages/board-richard-kenny.png",
      bio: `Richard Patrick Findlay Kenny is an Independent Director on the Board of our Company. 
            He is the Founder and Managing Partner of Hawkwood Biotech, the largest consulting practice dedicated to industrial biotechnology.`,
    },
  };

  const member = members[slug];
  if (!member) return <div style={{ padding: "50px", textAlign: "center" }}>Member not found</div>;

  return (
    <div className="page-container">
      {/* --- INLINE CSS FOR EXACT SCREENSHOT MATCH --- */}
      <style>{`
        .page-container {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          color: #333;
          max-width: 1200px;
          margin: 0 auto;
          padding: 160px 20px;
        }

        /* Top Layout: Text Left, Image Right */
        .profile-section {
          display: flex;
          justify-content: space-between;
          align-items: flex-start; /* Aligns items to top */
          gap: 60px;
          margin-bottom: 80px;
        }

        .text-content {
          flex: 1; /* Takes remaining space */
          padding-top: 10px;
        }

        /* Typography */
        .member-name {
          font-size: 42px;
          font-weight: 800; /* Extra Bold */
          color: #111827; /* Dark Black/Grey */
          margin: 0 0 10px 0;
          letter-spacing: -0.5px;
        }

        .member-role {
          font-size: 20px;
          color: #6b7280; /* Medium Grey */
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


        /* Image Styling */
        .image-wrapper {
          flex: 0 0 400px; /* Fixed width for image column */
          display: flex;
          justify-content: center;
        }

        .member-img {
          width: 80%;
          height:400px;
          border-radius: 8px;
          /* Optional: slight shadow if image is transparent */
          /* box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); */
        }

        /* Bottom Section: Certifications */
        .bottom-section {
          text-align: center;
          margin-top: 60px;
        }

        .cert-heading {
          font-size: 36px;
          font-weight: 900;
          color: #000;
        }

        /* Mobile Responsiveness */
        @media (max-width: 900px) {
          .profile-section {
            flex-direction: column-reverse; /* Image on top for mobile, or remove reverse for image bottom */
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
          <h2 className="member-role">{member.role}</h2>
          <p className="member-bio">{member.bio}</p>
        </div>

        {/* Right Side: Image */}
        <div className="image-wrapper">
          <img 
            src={getImageUrl(member.img)} 
            alt={member.name} 
            className="member-img"
            referrerPolicy="no-referrer"
          />
        </div>
      
      </div>

    </div>
  );
}