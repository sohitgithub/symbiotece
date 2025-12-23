import React, { useEffect, useState, useRef } from "react";
import Lottie from "lottie-react";

import Bestseller from "../assets/lotties/Bestseller.json";
import BusinessInvestor from "../assets/lotties/business-investor-gaining-profit-from-investment.json";
import Business from "../assets/lotties/BusinessPartnership_Contract_Handshake.json";
import Global from "../assets/lotties/global.json";
import Chatbot from "../assets/lotties/Livechatbot.json";
import Pathology from "../assets/lotties/Pathology.json";
import Revenue from "../assets/lotties/Revenue.json";
import Sandy from "../assets/lotties/SandyLoading.json";
import Science from "../assets/lotties/Science.json";

import "./KeyHighlight.css";

export default function KeyHighlights() {
  const sectionRef = useRef(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setAnimate(true);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const strategic = [
    { icon: Global, title: "Global Reach", desc: "Trusted by partners in 40+ countries" },
    { icon: Sandy, title: "Strong Legacy", desc: "30 years of excellence with 1,300+ professionals" },
    { icon: Business, title: "CDMO Leadership", desc: "20+ years of fermentation expertise & cutting-edge R&D" },
    { icon: Science, title: "Future-Ready", desc: "Expanding into niche injectables like DCVs, Vials, PFS & Cartridges" },
    { icon: BusinessInvestor, title: "Investor Backing", desc: "Supported by marquee PE firms like Motilal Oswal & InvAscent" },
  ];

  const operational = [
    { icon: Pathology, title: "World-Class Quality", desc: "USFDA, EU-GMP & WHO-GMP certified facilities" },
    { icon: Revenue, title: "Regulatory Strength", desc: "42 US-DMFs & 25 CEPs with more in pipeline" },
    { icon: Sandy, title: "Innovation at Scale", desc: "Advanced fermentation & synthetic API expertise" },
    { icon: Chatbot, title: "Integrated Advantage", desc: "From soy-derived sterols to APIs via in-house fermentation" },
    { icon: Bestseller, title: "Quality Driven By Precision", desc: "Quality backed by advanced R&D & QC labs" },
  ];

  return (
    <>
      {/* HEADER */}
      <div className="kh-fullwidth">
        <h2 className="kh-main-heading">Strategic Highlights</h2>
        <p className="kh-subtitle">
          Metrics that demonstrate our Strategic Edge and Operational Edge
        </p>
      </div>

      {/* MAIN SECTION */}
      <section className="kh-section" ref={sectionRef}>
        
        {/* Strategic Section */}
        <h3 className="kh-block-title">Strategic Edge</h3>

        <div className="feature-row three">
          {strategic.slice(0, 3).map((item, i) => (
            <div className={`feature-card ${animate ? "kh-show" : ""}`} key={i}>
              <Lottie animationData={item.icon} className="feature-lottie" loop />
              <h4 className="feature-title">{item.title}</h4>
              <p className="feature-desc">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="feature-row two">
          {strategic.slice(3).map((item, i) => (
            <div className={`feature-card ${animate ? "kh-show" : ""}`} key={i}>
              <Lottie animationData={item.icon} className="feature-lottie" loop />
              <h4 className="feature-title">{item.title}</h4>
              <p className="feature-desc">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Operational Section */}
        <h3 className="kh-block-title">Operational Edge</h3>

        <div className="feature-row three">
          {operational.slice(0, 3).map((item, i) => (
            <div className={`feature-card ${animate ? "kh-show" : ""}`} key={i}>
              <Lottie animationData={item.icon} className="feature-lottie" loop />
              <h4 className="feature-title">{item.title}</h4>
              <p className="feature-desc">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="feature-row two">
          {operational.slice(3).map((item, i) => (
            <div className={`feature-card ${animate ? "kh-show" : ""}`} key={i}>
              <Lottie animationData={item.icon} className="feature-lottie" loop />
              <h4 className="feature-title">{item.title}</h4>
              <p className="feature-desc">{item.desc}</p>
            </div>
          ))}
        </div>

      </section>
    </>
  );
}
