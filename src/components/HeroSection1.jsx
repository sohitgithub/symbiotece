import React from "react";
import "./HeroSection1.css";

const HeroSection1 = () => {
  return (
    <section className="hero1-container">

       {/* Video Box */}
      <div className="hero1-video-box">
        <video 
          src="/videos/sym-header-f.webm" 
          className="hero1-video"
          autoPlay
          loop
          muted
          playsInline
        />

        <button className="hero-button">
          <a href="/performance">Read More</a>
        </button>
      </div>

      {/* Heading */}
      <h1 className="hero1-title">
        Building Values & Inspiring Trust
      </h1>

      {/* Sub Text */}
      <p className="hero1-subtext">
        More than Two Decades of Legacy 'Fully Integrated', Driving Innovation in Synthetic and
        Biotech (Fermentation) APIs with 'Forward Integration' into Advanced Injectable Formulations
      </p>

    </section>
  );
};

export default HeroSection1;
