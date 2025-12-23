import React from "react";
import "./InvestorConfidenceSection.css";
import { FiDownload, FiMail } from "react-icons/fi";
import { Globe } from "./Globe";

export default function InvestorConfidenceSection() {
  return (
    <section className="investor-section">

      {/* Gradient Glow Background */}
      <div className="investor-bg-glow" />

      <div className="investor-content">

        <h2 className="investor-title">
          Building Value. Inspiring Trust.
        </h2>

        <p className="investor-text">
          Symbiotec combines scientific expertise with sustainable growth strategies
          to deliver long-term value for stakeholders.
        </p>

        <div className="investor-buttons">
          <button className="investor-btn primary">
            <FiDownload className="icon" />
            Download Investor Kit
          </button>

          <button className="investor-btn secondary">
            <FiMail className="icon" />
            <a href="https://www.symbiotec.com/contact-us/">
            Contact Investor Relations
            </a>
          </button>
        </div>

      </div>

      {/* ⭐ GLOBE BELOW - CENTERED */}
  {/* <div className="investor-globe-container">
    <Globe />
  </div> */}
    </section>
  );
}
