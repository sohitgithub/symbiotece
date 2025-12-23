import React, { useState } from "react";
// import "./HelpCentre.css"; // Agar CSS alag file me hai to uncomment karein
import { FiSearch, FiMail, FiPhone, FiChevronDown, FiMapPin, FiGlobe } from "react-icons/fi";

export default function HelpCentre() {
  const [openIndex, setOpenIndex] = useState(null);

  // --- DATA FROM SCREENSHOT ---
  const contactCards = [
    {
      type: "For grievances",
      name: "Salil Jain",
      role: "Company Secretary & Compliance Officer",
      address: "Symbiotec Pharmalab Limited 385/2, Pigdamber Rau, Mhow, Indore – 453 331 Madhya Pradesh, India",
      email: "symbiotecpharmalab.ipo@in.mpms.mufg.com",
      phone: "+91 731 6676 405"
    },
    {
      type: "For queries",
      name: "Shanti Gopalkrishnan",
      role: "Head - Investor Relations",
      address: "Symbiotec Pharmalab Limited 385/2, Pigdamber Rau, Mhow, Indore – 453 331 Madhya Pradesh, India",
      email: "secretarial@symbiotec.com",
      phone: "+91 731 6676 405"
    },
    {
      type: "Registrar & share transfer agent",
      name: "MUFG Intime India Private Limited",
      subName: "(Formerly Link Intime India Private Limited)",
      address: "C-101, Embassy 247,L.B.S. Marg, Vikhroli (West) Mumbai 400 083 Maharashtra, India",
      email: "symbiotecpharmalab.ipo@in.mpms.mufg.com",
      phone: "+91 810 811 4949",
      website: "www.in.mpms.mufg.com",
      regNo: "SEBI Registration No: INR000004058"
    }
  ];

  const faqs = [
    {
      q: "How can I contact Symbiotec support?",
      a: "You can reach us via email at secretarial@symbiotec.com or call our support line during business hours."
    },
    {
      q: "Where can I find product regulatory documents?",
      a: "Regulatory documents such as DMFs, CEPs, and compliance certificates are available in the Investor or Product section depending on category."
    },
    {
      q: "How does Symbiotec ensure API quality?",
      a: "Our facilities are USFDA, EU-GMP, and WHO-GMP compliant with advanced QC/QA processes and end-to-end traceability."
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="help-wrapper">
      {/* --- INLINE CSS FOR NEW DESIGN --- */}
      <style>{`
        .help-wrapper { font-family: 'Inter', sans-serif; max-width: 1200px; margin: 0 auto; padding: 140px 20px; color: #333; }
        
        /* HEADER */
        .help-header { text-align: center; margin-bottom: 60px; }
        .help-header h1 { font-size: 42px; font-weight: 800; color: #111827; margin-bottom: 10px; }
        .help-header p { color: #6b7280; font-size: 18px; margin-bottom: 30px; }
        .help-search-box { position: relative; max-width: 500px; margin: 0 auto; }
        .help-search-input { width: 100%; padding: 15px 20px 15px 50px; border-radius: 50px; border: 1px solid #e5e7eb; font-size: 16px; outline: none; transition: border 0.3s; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
        .help-search-input:focus { border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1); }
        .help-search-icon { position: absolute; left: 20px; top: 50%; transform: translateY(-50%); color: #9ca3af; font-size: 20px; }

        /* --- NEW CONTACT GRID --- */
        .contact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 30px;
          margin-bottom: 80px;
        }

        .contact-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          padding: 30px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .contact-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          border-color: #bfdbfe;
        }

        .card-type { font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #6b7280; margin-bottom: 15px; font-weight: 600; }
        .card-name { font-size: 22px; font-weight: 700; color: #111827; margin: 0 0 5px 0; }
        .card-role { font-size: 15px; color: #4b5563; font-weight: 500; margin-bottom: 20px; border-bottom: 1px solid #f3f4f6; padding-bottom: 15px; }
        
        .info-row { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 12px; font-size: 14px; color: #374151; line-height: 1.5; }
        .info-icon { flex-shrink: 0; margin-top: 3px; color: #2563eb; }
        
        .email-link { color: #2563eb; text-decoration: none; word-break: break-all; font-weight: 500; }
        .email-link:hover { text-decoration: underline; }
        
        .reg-no { margin-top: auto; padding-top: 15px; font-size: 12px; color: #9ca3af; font-style: italic; text-align: center; }

        /* FAQ SECTION */
        .help-faq-container { max-width: 800px; margin: 0 auto; }
        .faq-title { font-size: 28px; font-weight: 700; text-align: center; margin-bottom: 40px; color: #111827; }
        .faq-item { border-bottom: 1px solid #e5e7eb; padding: 20px 0; cursor: pointer; }
        .faq-question { display: flex; justify-content: space-between; align-items: center; font-size: 18px; font-weight: 500; color: #1f2937; }
        .faq-icon { transition: transform 0.3s; color: #6b7280; }
        .faq-icon.rotate { transform: rotate(180deg); color: #2563eb; }
        .faq-answer { margin-top: 15px; color: #4b5563; line-height: 1.6; font-size: 16px; padding-right: 20px; animation: fadeIn 0.3s ease; }

        @keyframes fadeIn { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }
        
        @media (max-width: 768px) {
          .help-header h1 { font-size: 32px; }
          .contact-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* --- HEADER --- */}
      <div className="help-header">
        <h1>Contact & Support</h1>
        <p>Get in touch with our compliance officers and registrar.</p>

        <div className="help-search-box">
          <FiSearch className="help-search-icon" />
          <input type="text" placeholder="Search for answers…" className="help-search-input" />
        </div>
      </div>

      {/* --- DETAILED CONTACT CARDS (NEW DESIGN) --- */}
      <div className="contact-grid">
        {contactCards.map((card, index) => (
          <div key={index} className="contact-card">
            <div className="card-type">{card.type}</div>
            <h3 className="card-name">{card.name}</h3>
            {card.subName && <span style={{fontSize: '13px', color: '#6b7280', marginBottom: '5px', display:'block'}}>{card.subName}</span>}
            {card.role && <p className="card-role">{card.role}</p>}
            {!card.role && <div style={{ marginBottom: '20px', borderBottom: '1px solid #f3f4f6' }}></div>}

            <div className="info-row">
              <FiMapPin className="info-icon" />
              <span>{card.address}</span>
            </div>

            <div className="info-row">
              <FiMail className="info-icon" />
              <a href={`mailto:${card.email}`} className="email-link">{card.email}</a>
            </div>

            <div className="info-row">
              <FiPhone className="info-icon" />
              <span>{card.phone}</span>
            </div>

            {card.website && (
              <div className="info-row">
                <FiGlobe className="info-icon" />
                <a href={`https://${card.website}`} target="_blank" rel="noopener noreferrer" className="email-link">{card.website}</a>
              </div>
            )}

            {card.regNo && <div className="reg-no">{card.regNo}</div>}
          </div>
        ))}
      </div>

      {/* --- FAQ SECTION --- */}
      <div className="help-faq-container">
        <h2 className="faq-title">Frequently Asked Questions</h2>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item ${openIndex === index ? "open" : ""}`}
              onClick={() => toggleFAQ(index)}
            >
              <div className="faq-question">
                {faq.q}
                <FiChevronDown className={`faq-icon ${openIndex === index ? "rotate" : ""}`} />
              </div>

              {openIndex === index && (
                <div className="faq-answer">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}