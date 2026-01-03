import React from "react";
import "./Footer.css";
import { FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  const certificates = [
    { img: "/images/flogo1.png", label: "FDA" },
    { img: "/images/flogo2.png", label: "EU GMP" },
    { img: "/images/flogo3.png", label: "ISO" },
    { img: "/images/flogo4.png", label: "GMP" },
  ];

  return (
    <>
      {/* CERTIFICATIONS */}
      <div className="cert-mini-wrapper">
        <h2 className="cert-mini-title">Certifications</h2>

        <div className="cert-mini-row">
          {certificates.map((item, index) => (
            <div className="cert-mini-box" key={index}>
              <img
                src={item.img}
                alt={item.label}
                className="cert-mini-icon"
              />
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer-wrapper">
        <div className="footer-container">

          <div className="footer-col">
            <img
              src="/images/symbiotec-logo.webp"
              alt="Symbiotec Logo"
              className="footer-logo"
            />
            <p className="footer-desc">
              <span className="footer-text">Steroids – Hormones</span>{" "}
              Fermentation APIs & CDMO
            </p>

            <div className="footer-socials">
              <a
                href="https://www.linkedin.com/company/symbiotec-pharmalab-pvt-ltd-/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
              >
                <FaLinkedin className="footer-social-icon" />
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Company</h4>
            <ul>
              <li>
                <a href="https://www.symbiotec.com/" target="_blank" rel="noopener noreferrer">
                  About Us
                </a>
              </li>
              <li><Link to="/">Investor Relations</Link></li>
              <li>
                <a href="https://www.symbiotec.com/career/" target="_blank" rel="noopener noreferrer">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Support</h4>
            <ul>
              <li><Link to="/help">Help Centre</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/help">FAQs</Link></li>
              <li><Link to="/terms">Terms & Conditions</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Resources</h4>
            <ul>
              <li>Blog</li>
              <li>Press Releases</li>
              <li><Link to="/policy">Privacy Policy</Link></li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} Symbiotec. All rights reserved.
        </div>
      </footer>
    </>
  );
}
