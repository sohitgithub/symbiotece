import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../governanceComponents/CommitteeComposition.css"


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

const DocumentIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6C5.47 2 4.96 2.21 4.59 2.59C4.21 2.96 4 3.47 4 4V20C4 20.53 4.21 21.04 4.59 21.41C4.96 21.79 5.47 22 6 22H18C18.53 22 19.04 21.79 19.41 21.41C19.79 21.04 20 20.53 20 20V8L14 2Z" />
    <path d="M14 2V8H20" />
    <path d="M16 13H8" />
    <path d="M16 17H8" />
    <path d="M10 9H8" />
  </svg>
);

export default function GovernancePage() {
const [activeTab, setActiveTab] = useState("Board");
const [annualTab, setAnnualTab] = useState("company");

  const location = useLocation();
const navigate = useNavigate();


  const tabs = [
    "Board", "Committee Composition", "Policies", "Offer Documents",
    "Shareholding Pattern", "Secretarial & Regulatory Compliance",
    "Material Creditors", "Industry Report", "Disclosures"
  ];


  const disclosuresData = [
  { id: 1, title: "Details of Business", link: "https://symbiotec.com/" },
  { id: 2, title: "Terms & Conditions of Appointment of Independent Director", link: "/public/documents/tcappointment.pdf" },
  {
    id: 3,
    title: "Composition of Committees of Board of Directors",
    tab: "Committee Composition"
  }
];


  const boardMembers = [
    {
      img: "/images/boardimages/board-anil-satwani.png",
      name: "Mr Anil Satwani",
      role: "Chairman and Managing Director",
      slug: "anil-satwani"
    },
    {
      img: "https://drive.google.com/file/d/1ZZz24_v2cOu326IDPJSdcazuUbR3rl8y/view?usp=drive_link",
      name: "Mr Hariharnath Buggana",
      role: "Nominee Director",
      slug: "hariharnath-buggana"
    },
    {
      img: "/images/boardimages/board-Sunita-Kishnani.png",
      name: "Mrs Sunita Kishnani",
      role: "Independent Director",
      slug: "sunita-kishnani"
    },
    {
      img: "/images/boardimages/board-pratik.png",
      name: "Mr Pratik Patel",
      role: "Independent Director",
      slug: "pratik-patel"
    },
    {
      img: "/images/boardimages/board-rohit.png",
      name: "Mr Rohit Mantri",
      role: "Independent Director", 
      slug: "rohit-mantri"
    },
    {
      img: "/images/boardimages/board-richard-kenny.png",
      name: "Mr Richard P F Kenny",
      role: "Independent Director",
      slug: "richard-kenny"
    },
  ];

  // --- DOCUMENTS DATA ---
  const documentData = {

    "Offer Documents": [
      { id: 105, title: "Draft Red Herring Prospectus (DRHP)", link: "https://drive.google.com/file/d/1Ev8HhnTPmGOPhOU52dbiun6jSFr7Bt3B/view?usp=sharing" },
       { id: 106, title: "Symbiotec Audio Visual DRHP-Hindi", link: "https://drive.google.com/file/d/1Ev8HhnTPmGOPhOU52dbiun6jSFr7Bt3B/view?usp=sharing" },
        { id: 107, title: "Symbiotec Audio Visual DRHP-English", link: "https://drive.google.com/file/d/1Ev8HhnTPmGOPhOU52dbiun6jSFr7Bt3B/view?usp=sharing" },

    ],

      "Material Creditors": [
      { id: 108, title: "docit for material creditors", link: "https://drive.google.com/file/d/1AEawXdhFjThS8Xo1197nX9EaI2mujB32/view?usp=drive_link" }
    ],


    "Policies": [
      { id: 201, title: "Policy on Familiarization Programme for Independent Directors", link: "https://drive.google.com/file/d/1HSpEy18kfGn6nOI8iGa5VM7dU3HmewSx/view?usp=sharing" },
      { id: 202, title: "Policy for Determination of Materiality of Events or Information", link: "https://drive.google.com/file/d/1Hh4ZXQgcTYAh0AwuBXxZ5Yjbqg7C4pUa/view?usp=sharing" },
      { id: 203, title: "Code of Conduct for Board and Senior Management", link: "https://drive.google.com/file/d/1L0Omaf-AGWlSuSPHzUV2CvDA4vQy3cAn/view?usp=sharing" },
      { id: 204, title: "Archival Policy", link: "https://drive.google.com/file/d/1PP1AmgVNEtNgtx9zZGdFgaCuUPVe4CU6/view?usp=sharing" },
      { id: 205, title: "Policy on Vigil Mechanism", link: "https://drive.google.com/file/d/1QLgUwamnjDsL6oahfWPXqZHserbrlaQe/view?usp=sharing" },
      { id: 206, title: "Policy on Related Party Transactions", link: "https://drive.google.com/file/d/1QjwbLzfUWihRP0_J4oKLmibh0hPupVw9/view?usp=sharing" },
      { id: 207, title: "Policy for Inquiry in Case of Leak of UPSI", link: "https://drive.google.com/file/d/1WAjDgRy1GgWPP502UGgBOPa-tFz4KxPi/view?usp=sharing" },
      { id: 208, title: "Code of Conduct for All Members of the Board and Senior Management", link: "https://drive.google.com/file/d/1ZST05QWqfAFbAFEnsy737BdM4lBeFX82/view?usp=sharing" },
      { id: 209, title: "Policy for Determination of Materiality of Events or Information", link: "https://drive.google.com/file/d/1_59IEwzM89VpnyKGNI0KbJuukxeqvtY9/view?usp=sharing" },
      { id: 210, title: "Policy on Corporate Social Responsibility", link: "https://drive.google.com/file/d/1a-TIuNdGHm_cA82HcBOzecMI6WA5LleJ/view?usp=sharing" },
      { id: 211, title: "Policy for Preservation of Documents", link: "https://drive.google.com/file/d/1bEp2J2AlvJP7BiCtx-rhVcXRQZVcxrvy/view?usp=sharing" },
      { id: 212, title: "Policy for Determination of Material Subsidiary", link: "https://drive.google.com/file/d/1blfaLr5w_qBECjX4EUej-YLH-Oc4fBTx/view?usp=sharing" },
      { id: 213, title: "Code of Fair Disclosure Practice", link: "https://drive.google.com/file/d/1cRjEw5NelyXzZ58DPiNP5mSoHqtyfBlk/view?usp=sharing" },
      { id: 214, title: "Plan for Orderly Succession for Appointment of Directors and Senior Management", link: "https://drive.google.com/file/d/1cjeeKi-N7eSLvcF0F3PEDj5eKzrXNuq3/view?usp=sharing" },
      { id: 216, title: "Risk Assessment, Management and Minimisation Policy", link: "https://drive.google.com/file/d/1o9QfCc_r-vMEx6Tv1uH5X1_F_s0eRyOd/view?usp=sharing" },
      { id: 217, title: "Policy on Prevention of Sexual Harassment", link: "https://drive.google.com/file/d/1p6ICGEH4QXGU-LfkY27IqaZR-DD3AxIO/view?usp=sharing" },
      { id: 218, title: "Policy for Determining of Legitimate Purpose of Sharing UPSI", link: "https://drive.google.com/file/d/1fOY_czvWNqT4ODsdLceF7PJfT8e6iiE8/view?usp=sharing" },
      { id: 219, title: "Policy on Dividend Distribution", link: "https://drive.google.com/file/d/1rAKF4qiwtvYRjHGdGASgw_Jphk87Fs6J/view?usp=sharing" },
      { id: 220, title: "Policy for Evaluation of Performance of Board of Directors", link: "https://drive.google.com/file/d/1tD3SZJp5zLhd6QJs_a_5R8vNBe-weD3F/view?usp=sharing" },
      { id: 221, title: "Policy on Diversity of Board of Directors", link: "https://drive.google.com/file/d/1uUcOaIMi28WYPQeYo7Fnr5ttjb5de2ui/view?usp=sharing" },
    ],
    "Shareholding Pattern": [
      { id: 301, title: "Shareholding Pattern - Q1 2024", link: "/public/documents/Shareholding.pdf" },
      
    ],
    "Secretarial & Regulatory Compliance": [
      { id: 401, title: "Annual Returns - Knovea 2022", link: "https://drive.google.com/file/d/1EtQZmlJY2LTa59V6ql2NMABJneNOk4hj/view?usp=sharing" },
      { id: 402, title: "Annual Returns - Knovea 2023", link: "https://drive.google.com/file/d/1SrdG_DVHTNpLKhPAtk1hw29tYm0Rbs1j/view?usp=sharing" },
      { id: 403, title: "Annual Returns - Knovea 2024", link: "https://drive.google.com/file/d/1VFvdmJy0_6xtFEDMs6i3uknwn3x2JXI-/view?usp=sharing" },
      { id: 404, title: "Annual Returns - Symbiotec 2022", link: "https://drive.google.com/file/d/1XRJXh1zTqXHjjbDQvPGaXej9yeLEFKHk/view?usp=sharing" },
      { id: 405, title: "Annual Returns - Symbiotec 2023", link: "https://drive.google.com/file/d/1YTIxjIQTQ_y8EfgLJ6EG_LsAianDoTdL/view?usp=sharing" },
      { id: 406, title: "Annual Returns - Symbiotec 2024", link: "https://drive.google.com/file/d/1Zs2DqrgQRBCOELQ5VykwH-F-fYYhl8J7/view?usp=sharing" },
      { id: 407, title: "Annual Returns - SZPL 2022", link: "https://drive.google.com/file/d/1d6pk0JjVWFDGgMQXJJ8dMRYmFaRDUtUB/view?usp=sharing" },
      { id: 408, title: "Annual Returns - SZPL 2023", link: "https://drive.google.com/file/d/1fZoZ-wBQdGl6A4wO9aUIkY8UjqCGJjmb/view?usp=sharing" },
      { id: 409, title: "Annual Returns - SZPL 2024", link: "https://drive.google.com/file/d/1kZAz-VU4FiEI-Hx4VsGUbUsnGmWo9WIK/view?usp=sharing" },
    ]
  };

  const currentDocuments = documentData[activeTab] || [];


  useEffect(() => {
  const params = new URLSearchParams(location.search);
  const tabFromUrl = params.get("tab");

  if (tabFromUrl && tabs.includes(tabFromUrl)) {
    setActiveTab(tabFromUrl);
  }
}, [location.search]);


  return (
    <div className="governance-container">
      <style>{`
        /* --- CONTAINER --- */
        .governance-container { padding: 20px; font-family: 'Inter', system-ui, sans-serif; max-width: 1400px; margin: 0 auto; }

        /* --- TABS --- */
        .governance-tabs { display: flex; gap: 30px; border-bottom: 1px solid #e5e7eb; margin-bottom: 30px; overflow-x: auto; scrollbar-width: none; }
        .governance-tabs::-webkit-scrollbar { display: none; }
        .gov-tab { background: none; border: none; font-size: 15px; color: #6b7280; padding: 12px 0; cursor: pointer; white-space: nowrap; border-bottom: 2px solid transparent; transition: all 0.2s; font-weight: 500; }
        .gov-tab:hover { color: #2563eb; }
        .gov-tab.active { color: #2563eb; border-bottom: 2px solid #2563eb; font-weight: 600; }

        /* --- DOC GRID --- */
        .doc-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 24px; }
        .doc-card { display: flex; flex-direction: column; justify-content: space-between; height: 180px; padding: 24px; background-color: #fff; border: 1px solid #e5e7eb; border-radius: 12px; text-decoration: none; transition: all 0.3s ease; }
        .doc-card:hover { border-color: #93c5fd; box-shadow: 0 10px 25px rgba(37, 99, 235, 0.1); transform: translateY(-4px); }
        .doc-icon-wrapper { width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; border-radius: 10px; background-color: #f3f4f6; color: #6b7280; transition: all 0.3s ease; }
        .doc-card:hover .doc-icon-wrapper { background-color: #eff6ff; color: #2563eb; }
        

        /* --- BOARD GRID --- */
        .board-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; padding-top: 10px; }
        
        /* CARD LINK STYLING */
        .board-member-card { display: flex; width:90%; flex-direction: column; background-color: #fff; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden; transition: all 0.3s ease; text-decoration: none; }
        .board-member-card:hover { transform: translateY(-8px); box-shadow: 0 12px 24px rgba(0,0,0,0.1); border-color: #bfdbfe; }
        
        .board-img { width: 100%; height:300px; aspect-ratio: 3/4; object-fit: cover; object-position: top center; background-color: #f3f4f6; border-bottom: 1px solid #f0f0f0; }
        .board-info-box { padding: 20px 15px; text-align: center; }
        .board-name { margin: 0 0 8px 0; font-size: 19px; font-weight: 700; color: #111827; transition: color 0.3s ease; }
        .board-member-card:hover .board-name { color: #2563eb; }
        .board-role { margin: 0; font-size: 15px; color: #6b7280; font-weight: 500; line-height: 1.4; }
        
        .empty-state { padding: 60px; text-align: center; color: #9ca3af; background: #f9fafb; border-radius: 12px; border: 1px dashed #e5e7eb; }
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

        {activeTab === "Board" ? (
          <div className="board-grid">
            {boardMembers.map((member) => (
              // --- 🔥 CLICKABLE CARD WRAPPED IN LINK 🔥 ---
              <Link 
                to={`/board/${member.slug}`} 
                key={member.slug} 
                className="board-member-card"
              >
                <img
                  src={getImageUrl(member.img)}
                  alt={member.name}
                  className="board-img"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://ibb.co/F4QM7mxx';
                  }}
                />
                <div className="board-info-box">
                  <h3 className="board-name">{member.name}</h3>
                  <p className="board-role">{member.role}</p>
                </div>
              </Link>
            ))}
          </div>
     ) : (
activeTab !== "Committee Composition" &&
activeTab !== "Secretarial & Regulatory Compliance" &&
activeTab !== "Disclosures" &&
  currentDocuments.length > 0 ? (

            <div className="doc-grid">
              {currentDocuments.map((doc) => (
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
          ):""
        )}
      </div>



      {activeTab === "Disclosures" && (
  <div className="disclosures-wrapper">

    <h3 className="disclosures-heading">
  Disclosures under Regulation 46 of SEBI (LODR) Regulations   
    </h3>

    <div className="disclosures-table">

      <div className="disclosures-row disclosures-header">
        <div className="col-index"></div>
        <div className="col-name">Name</div>
        <div className="col-link">Link</div>
      </div>

      {disclosuresData.map((item) => (
        <div key={item.id} className="disclosures-row">
          <div className="col-index">{item.id}</div>
          <div className="col-name">{item.title}</div>
         <div className="col-link">
  {item.tab ? (
    <button
      onClick={() => {
        setActiveTab(item.tab);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className="disclosure-tab-link"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 3h7v7" />
        <path d="M10 14L21 3" />
        <path d="M21 14v7h-7" />
        <path d="M3 10v11h11" />
      </svg>
    </button>
  ) : (
    <a href={item.link} rel="noopener noreferrer">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 3h7v7" />
        <path d="M10 14L21 3" />
        <path d="M21 14v7h-7" />
        <path d="M3 10v11h11" />
      </svg>
    </a>
  )}
</div>

        </div>
      ))}
    </div>

  </div>
)}



      {activeTab === "Secretarial & Regulatory Compliance" && (
  <div className="annual-wrapper">

    <h3 className="committee-title">Annual Returns</h3>

    <div className="annual-tabs">
      <button
        className={annualTab === "company" ? "active" : ""}
        onClick={() => setAnnualTab("company")}
      >
        Company
      </button>

      <button
        className={annualTab === "subsidiaries" ? "active" : ""}
        onClick={() => setAnnualTab("subsidiaries")}
      >
        Subsidiaries
      </button>
    </div><br></br>

    {/* COMPANY TAB */}
    {annualTab === "company" && (
      <div className="doc-grid">
        {documentData["Secretarial & Regulatory Compliance"].map((doc) => (
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
    )}

    {/* SUBSIDIARIES TAB */}
    {annualTab === "subsidiaries" && (
      <div className="empty-state">
        <p>No subsidiary annual returns available.</p>
      </div>
    )}
  </div>
)}



      {activeTab === "Committee Composition" && (
  <div className="committee-wrapper">

    {/* Audit Committee */}
    <div className="committee-block">
      <h3 className="committee-title">Audit Committee</h3>

      <div className="committee-grid">
        <div className="committee-member">
          <p className="member-name">Mrs. Sunita Kishnani </p>
          <span className="member-role">Chairperson</span>
        </div>

        <div className="committee-member">
          <p className="member-name">Mr. Partik Patel </p>
           <span className="member-role">Member</span>
        </div>

        <div className="committee-member">
          <p className="member-name">Mr. Anil Satwani </p>
          <span className="member-role">Member</span>
        </div>
      </div>
    </div>

    {/* Nomination & Remuneration */}
    <div className="committee-block">
      <h3 className="committee-title">Nomination and Remuneration Committee</h3>

      <div className="committee-grid">
        <div className="committee-member">
          <p className="member-name">Mr. Pratik Patel </p>
          <span className="member-role">Chairperson</span>
        </div>

        <div className="committee-member">
          <p className="member-name">Mrs. Sunita Kishnani </p>
          <span className="member-role">Member</span>
        </div>

        <div className="committee-member">
          <p className="member-name">Mr. Hariharnath Buggana </p>
          <span className="member-role">Member</span>
        </div>
      </div>
    </div>


      <div className="committee-block">
      <h3 className="committee-title">Stakeholder Relationship Committee</h3>

      <div className="committee-grid">
        <div className="committee-member">
          <p className="member-name">Mr. Pratik Patel </p>
          <span className="member-role">Chairperson</span>
        </div>

        <div className="committee-member">
          <p className="member-name">Mrs. Sunita Kishnani </p>
          <span className="member-role">Member</span>
        </div>

        <div className="committee-member">
          <p className="member-name">Mr. Anil Satwani</p>
          <span className="member-role">Member</span>
        </div>
      </div>
    </div>

    {/* Risk Management */}
    <div className="committee-block">
      <h3 className="committee-title">Risk Management Committee</h3>

      <div className="committee-grid four-col">
        <div className="committee-member">
          <p className="member-name">Mr. Anil Satwani</p>
          <span className="member-role">Chairperson</span>
        </div>

        <div className="committee-member">
          <p className="member-name">Mrs. Sunita Kishnani</p>
          <span className="member-role">Member</span>
        </div>

        <div className="committee-member">
          <p className="member-name">Mr. Rohit Mantri</p>
          <span className="member-role">Member</span>
        </div>

        <div className="committee-member">
          <p className="member-name">Mr. Hariharnath Buggana</p>
          <span className="member-role">Member</span>
        </div>

          <div className="committee-member">
          <p className="member-name">Mr. Raghavender
Ramachandran</p>
<span className="member-role">Member</span>
        </div>

          <div className="committee-member">
          <p className="member-name">Mr. Salil Jain</p>
          <span className="member-role">Member</span>
        </div>
      </div>
    </div>

    {/* CSR */}
    <div className="committee-block">
      <h3 className="committee-title">Corporate Social Responsibility Committee</h3>

      <div className="committee-grid four-col">
        <div className="committee-member">
          <p className="member-name">Mr. Anil Satwani </p>
              <span className="member-role">Chairperson</span>
        </div>

        <div className="committee-member">
          <p className="member-name">Mr. Pratik Patel </p>
          <span className="member-role">Member</span>
        </div>

        <div className="committee-member">
          <p className="member-name">Mr. Hariharnath Buggana</p>
          <span className="member-role">Member</span>
        </div>

        <div className="committee-member">
          <p className="member-name">Mr. Rohit Mantr</p>
          <span className="member-role">Member</span>
        </div>
      </div>
    </div>

  </div>
)}


    </div>
  );
}