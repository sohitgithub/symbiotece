import React from "react";
import "./InvestorRelations.css";
import { FiDownload, FiFileText, FiMail, FiTrendingUp } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function InvestorRelations() {
  return (
    <section className="ir-wrapper">

      {/* HERO SECTION */}
      <div className="ir-hero">
        <h1>Investor Relations</h1>
        <p>
          Transparent, reliable, and growth-driven insights for our stakeholders.
        </p>
      </div>

      {/* DOWNLOAD CENTER */}
      <div className="ir-downloads">
        <h2>Downloads & Reports</h2>

        <div className="ir-download-grid">
          <div className="ir-download-card">
            <FiFileText className="ir-icon" />
            <h3>Annual Report</h3>
            <button className="ir-btn">
              <FiDownload /> Download
            </button>
          </div>

          <div className="ir-download-card">
            <FiTrendingUp className="ir-icon" />
            <h3>Financial Statements</h3>
            <button className="ir-btn">
              <FiDownload /> Download
            </button>
          </div>

          <div className="ir-download-card">
            <FiFileText className="ir-icon" />
            <h3>Corporate Presentation</h3>
            <button className="ir-btn">
              <FiDownload /> Download
            </button>
          </div>
        </div>
      </div>

      {/* FINANCIAL HIGHLIGHTS */}
      <div className="ir-highlights">
        <h2>Financial Highlights</h2>

        <div className="ir-highlight-grid">
          <div className="ir-highlight-card">
            <h3>₹1,200 Cr+</h3>
            <p>Annual Revenue</p>
          </div>

          <div className="ir-highlight-card">
            <h3>30+ Years</h3>
            <p>Industry Leadership</p>
          </div>

          <div className="ir-highlight-card">
            <h3>42+</h3>
            <p>US-DMF Filings</p>
          </div>

          <div className="ir-highlight-card">
            <h3>25+</h3>
            <p>CEPs Issued</p>
          </div>
        </div>
      </div>

      {/* INVESTOR QUICK LINKS */}
      <div className="ir-links">
        <h2>Quick Links</h2>

        <div className="ir-links-grid">
          <Link to="/announcements" className="ir-link-card">
            <h3>Announcements</h3>
            <p>Corporate updates and shareholder notices.</p>
          </Link>

          <Link to="/governance" className="ir-link-card">
            <h3>Corporate Governance</h3>
            <p>Board, committees, and policy information.</p>
          </Link>

          <Link to="/stock" className="ir-link-card">
            <h3>Stock Information</h3>
            <p>Live stock dashboards and performance charts.</p>
          </Link>
        </div>
      </div>

      {/* CONTACT IR */}
      <div className="ir-contact">
        <h2>Need Investor Support?</h2>
        <p>Write to our Investor Relations team for queries or assistance.</p>

        <a href="mailto:investorrelations@symbiotec.com" className="ir-contact-btn">
          <FiMail /> investorrelations@symbiotec.com
        </a>
      </div>

    </section>
  );
}
