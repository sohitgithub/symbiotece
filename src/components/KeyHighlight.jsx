import React, { useEffect, useState, useRef } from "react";
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

  /* STRATEGIC EDGE ITEMS */
  const strategic = [
    {
      iconBlack: "/images/icons/global-reach-black.webp",
      iconBlue: "/images/icons/global-reach-blue.webp",
      title: "Global Reach",
      desc: "Reliable Partner in Steroid and Hormone APIs Solutions"
    },
    {
      iconBlack: "/images/icons/strong-legacy-black.webp",
      iconBlue: "/images/icons/strong-legacy-blue.webp",
      title: "Strong Legacy",
      desc: "Driven by a Passionate Team"
    },
    {
      iconBlack: "/images/icons/cdmo-black.webp",
      iconBlue: "/images/icons/cdmo-blue.webp",
      title: "CDMO Services",
      desc: "Transforming Possibilities"
    },
    {
      iconBlack: "/images/icons/future-black.webp",
      iconBlue: "/images/icons/future-blue.webp",
      title: "Future-Ready",
      desc: "Expanding into niche injectables like DCVs, Vials, PFS & Cartridges"
    },
    {
      iconBlack: "/images/icons/investor-black.webp",
      iconBlue: "/images/icons/investor-blue.webp",
      title: "Investor Backing",
      desc: "Supported by marquee PE firms like Motilal Oswal & InvAscent"
    },
  ];

  /* OPERATIONAL EDGE ITEMS */
  const operational = [
    {
      iconBlack: "/images/icons/world-class-quality-black.webp",
      iconBlue: "/images/icons/world-class-quality-blue.webp",
      title: "World-Class Quality",
      desc: "USFDA, EU-GMP & WHO-GMP certified facilities"
    },
    {
      iconBlack: "/images/icons/regulatory-black.webp",
      iconBlue: "/images/icons/regulatory-blue.webp",
      title: "Regulatory Strength",
      desc: "42 US-DMFs & 25 CEPs with more in pipeline"
    },
    {
      iconBlack: "/images/icons/innovation-black.webp",
      iconBlue: "/images/icons/innovation-blue.webp",
      title: "Innovation at Scale",
      desc: "Advanced fermentation & synthetic API expertise"
    },
    {
      iconBlack: "/images/icons/advantage-black.webp",
      iconBlue: "/images/icons/advantage-blue.webp",
      title: "Integrated Advantage",
      desc: "From soy-derived sterols to APIs via in-house fermentation"
    },
    {
      iconBlack: "/images/icons/QD-black.webp",
      iconBlue: "/images/icons/QD-blue.webp",
      title: "Quality Driven By Precision",
      desc: "Quality backed by advanced R&D & QC labs"
    },
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

        {/* Strategic Edge */}
        <h3 className="kh-block-title">Strategic Edge</h3>

        <div className="feature-row three">
          {strategic.slice(0, 3).map((item, i) => (
            <div className={`feature-card ${animate ? "kh-show" : ""}`} key={i}>
              <div className="kh-icon-wrapper">
                <img src={item.iconBlack} className="feature-img black-img" />
                <img src={item.iconBlue} className="feature-img blue-img" />
              </div>

              <h4 className="feature-title">{item.title}</h4>
              <p className="feature-desc">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="feature-row two">
          {strategic.slice(3).map((item, i) => (
            <div className={`feature-card ${animate ? "kh-show" : ""}`} key={i}>
              <div className="kh-icon-wrapper">
                <img src={item.iconBlack} className="feature-img black-img" />
                <img src={item.iconBlue} className="feature-img blue-img" />
              </div>

              <h4 className="feature-title">{item.title}</h4>
              <p className="feature-desc">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Operational Edge */}
        <h3 className="kh-block-title">Operational Edge</h3>

        <div className="feature-row three">
          {operational.slice(0, 3).map((item, i) => (
            <div className={`feature-card ${animate ? "kh-show" : ""}`} key={i}>
              <div className="kh-icon-wrapper">
                <img src={item.iconBlack} className="feature-img black-img" />
                <img src={item.iconBlue} className="feature-img blue-img" />
              </div>

              <h4 className="feature-title">{item.title}</h4>
              <p className="feature-desc">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="feature-row two">
          {operational.slice(3).map((item, i) => (
            <div className={`feature-card ${animate ? "kh-show" : ""}`} key={i}>
              <div className="kh-icon-wrapper">
                <img src={item.iconBlack} className="feature-img black-img" />
                <img src={item.iconBlue} className="feature-img blue-img" />
              </div>

              <h4 className="feature-title">{item.title}</h4>
              <p className="feature-desc">{item.desc}</p>
            </div>
          ))}
        </div>

      </section>
    </>
  );
}
