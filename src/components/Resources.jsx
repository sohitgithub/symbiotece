import React from "react";
import "./Resources.css";
import { MdEmail, MdCall } from "react-icons/md";

const Resources = () => {
  return (
    <section className="resources-wrapper">
      <h2 className="resources-title">Resources</h2>

      <div className="resources-grid">

        {/* Column 1 */}
        <div className="resources-card">
          <p className="resources-subtitle">For grievances</p>
          <h4 className="resources-name">Salil Jain</h4>
          <p className="resources-role">
            Company Secretary & Compliance Officer
          </p>

          <div className="resources-contact">
            <MdEmail />
            <a href="mailto:secretarial@symbiotec.com">
            secretarial@symbiotec.com
            </a>
          </div>
          <div className="resources-contact">
            <MdCall />
            <span> +91 731 6676 405</span>
          </div>
        </div>

        {/* Column 2 */}
        <div className="resources-card">
          <p className="resources-subtitle">For queries</p>
          <h4 className="resources-name">Salil Jain</h4>
          <p className="resources-role">Company Secretary & Compliance Officer</p>
            
          <div className="resources-contact">
            <MdEmail />
            <a href="mailto:secretarial@symbiotec.com">
               secretarial@symbiotec.com
            </a>
          </div>

          <div className="resources-contact">
            <MdCall />
            <span>+91 731 6676 405</span>
          </div>

          {/* <p className="resources-role-sebi">SEBI Registration No: INR000004058</p>
          <p className="resources-role-sebi"><a href="https://www.in.mpms.mufg.com">www.in.mpms.mufg.com</a></p> */}
          
        </div>

        {/* Column 3 */}
        <div className="resources-card">
          <p className="resources-subtitle">
            Registrar & share transfer agent
          </p>
          <h4 className="resources-name">
MUFG Intime India Private Limited (Formerly Link Intime India Private Limited)          </h4>

          <p className="resources-role">
C-101, Embassy 247, LBS Marg, Vikhroli (West), 400 083, Maharashtra, India
          </p>

          <div className="resources-contact">
            <MdCall />
            <span>+ 1800 1020 878</span>
          </div>
        </div>

      </div>

  <section className="extrainfo">
        <div class="info-wrapper">
    <div class="company-name">
Symbiotec Pharmalab Limited    </div>

    <div class="former-name">
     (Formerly known as Symbiotec Pharmalab Private Limited)
    </div>

    <div class="cin">
      CIN: U24232MP2002PLC015293
    </div>

    <div class="address">
     385/2, Pigdamber, Rau, Mhow, Indore – 453 331, Madhya Pradesh, India
    </div>

    <div class="sebi-title">
      SEBI Scores Portal
    </div>

    <a href="https://scores.sebi.gov.in/" class="sebi-link">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M14 3h7v7"></path>
        <path d="M10 14L21 3"></path>
        <path d="M21 14v7h-7"></path>
        <path d="M3 10V3h7"></path>
      </svg>
      Link to SEBI SCORES PORTAL
    </a>
  </div>
  </section>

    </section>
    
  );
};

export default Resources;
