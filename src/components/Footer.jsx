import React from "react";
import "./Footer.css";
import { FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import CircularText from "./CircularText";

export default function Footer() {
  const certificates = [
    { img: "/images/flogo1.png", label: "FDA" },
    { img: "/images/flogo2.png", label: "EU GMP" },
    { img: "/images/flogo3.png", label: "ISO" },
    { img: "/images/flogo4.png", label: "GMP" },
  ];

  return (
    <>
      {/* CERTIFICATION SECTION OUTSIDE FOOTER */}
      <div className="cert-mini-wrapper">
        <h2 className="cert-mini-title">Certifications</h2>

        <div className="cert-mini-row">
          {certificates.map((item, index) => (
            <div className="cert-mini-box" key={index}>
              <img src={item.img} alt={item.label} className="cert-mini-icon" />
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER STARTS HERE */}
      <footer className="footer-wrapper">

        <div className="footer-container">

          <div className="footer-col">
            <img src="/images/symbiotec-logo.webp" className="footer-logo" />
            <p className="footer-desc"><span className="footer-text">Steroids – Hormones</span> Fermentation APIs & CDMO</p>

            <div className="footer-socials">
<a 
  href="https://www.linkedin.com/company/symbiotec-pharmalab-pvt-ltd-/" 
  target="_blank" 
  rel="noopener noreferrer"
  className="footer-social-link"
>
  <FaLinkedin className="footer-social-icon" />
</a>            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Company</h4>
            <ul>
              <li><a href="https://www.symbiotec.com/">About Us</a></li>
              <li><Link to="/">Investor Relations</Link></li>
              {/* <li><a href="https://www.symbiotec.com/products/">Products</a></li> */}
              <li><a href="https://www.symbiotec.com/career/">Careers</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Support</h4>
            <ul>
              <li><Link to="/help">Help Centre</Link></li>
              <li><a href="/">Contact</a></li>
              <li><a href="/help">FAQs</a></li>
              <li><Link to="/terms">Terms & Conditions</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Resources</h4>
            <ul>
              <li>Blog</li>
              <li>Press Releases</li>
              <li>
                <a
                  href="/policy"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </a>
              </li>

              {/* <li><Link to="/policy">Privacy Policy</Link></li> */}
            </ul>
          </div>

          {/* <div className="footer-col circular-text-col">
            <CircularText
              text="S Y M B I O T E C • P H A R M A L A B • L I M I T E D • "
              spinDuration={20}
            />
          </div> */}

        </div>

        <div className="footer-bottom">© 2025 Symbiotec. All rights reserved.</div>
      </footer>
    </>
  );
}
